import { NextResponse } from 'next/server';
import { validateProductsForCheckout } from '@/lib/repositories/product';
import { createOrder } from '@/lib/repositories/order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, items } = body;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid checkout data' }, { status: 400 });
    }

    // 1. Validate products and prices server-side
    const dbProducts = await validateProductsForCheckout(items);

    // 2. Calculate authoritative total
    let total = 0;
    const orderItems: any[] = [];
    
    for (const item of items) {
      const dbProduct = dbProducts.find((p: any) => p.id === (item.productId || item.id));
      if (!dbProduct) continue; // Skip unavailable products
      
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(quantity) || quantity <= 0) continue;
      
      const unitPrice = Number(dbProduct.price);
      total += unitPrice * quantity;
      
      orderItems.push({
        productId: dbProduct.id,
        quantity,
        unitPrice,
      });
    }

    if (orderItems.length === 0) {
      return NextResponse.json({ error: 'All products in your cart are currently unavailable.' }, { status: 400 });
    }

    // 3. Create pending order
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id || null;
    
    let orderId = "mock-order-id";
    
    try {
      const order = await createOrder(userId, total, orderItems);
      orderId = order.id;
    } catch (e) {
      console.warn("DB not connected, using mock order ID", e);
    }

    // 4. Initialize Paystack Transaction
    if (!PAYSTACK_SECRET_KEY) {
      console.warn("PAYSTACK_SECRET_KEY is not set. Simulating success URL.");
      return NextResponse.json({
        authorizationUrl: `/checkout/success?reference=${orderId}`
      });
    }

    // amount is in kobo/cents for Paystack
    const amountInKobo = Math.round(total * 100);

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        reference: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?reference=${orderId}`,
        metadata: {
          name,
          orderId,
        }
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      console.error('Paystack Error:', paystackData);
      return NextResponse.json({ error: 'Payment gateway initialization failed' }, { status: 500 });
    }

    return NextResponse.json({
      authorizationUrl: paystackData.data.authorization_url,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

