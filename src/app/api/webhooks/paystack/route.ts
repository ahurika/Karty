import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { updateOrderStatus, getOrderById } from '@/lib/repositories/order';
import { sendOrderConfirmationEmail } from '@/lib/mailer';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!PAYSTACK_SECRET_KEY) {
      console.warn("PAYSTACK_SECRET_KEY not set, skipping webhook validation");
      return NextResponse.json({ received: true });
    }

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const orderId = event.data.reference;
      
      try {
        await updateOrderStatus(orderId, "CONFIRMED");
        
        // Fetch order details for email
        const order = await getOrderById(orderId);
        
        if (order) {
          const emailItems = order.items.map((item: any) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: Number(item.unitPrice)
          }));
          
          const customerEmail = event.data.customer?.email || order.user?.email;
          const customerName = event.data.metadata?.name || order.user?.name;
          
          if (customerEmail) {
            await sendOrderConfirmationEmail(
              customerEmail,
              customerName,
              order.id,
              Number(order.total),
              emailItems
            );
          }
        }
      } catch (err) {
        console.error("Failed to process successful charge event", err);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
