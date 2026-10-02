import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const API_KEY = process.env.MAILGUN_API_KEY || '';
const DOMAIN = process.env.MAILGUN_DOMAIN || '';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: API_KEY || 'dummy_key_to_prevent_build_crash' });

export async function sendOrderConfirmationEmail(
  toEmail: string,
  customerName: string | null,
  orderId: string,
  totalAmount: number,
  items: { name: string; quantity: number; price: number }[]
) {
  if (!API_KEY || !DOMAIN) {
    console.warn("Mailgun configuration missing. Simulating email send:", { toEmail, orderId });
    return;
  }

  const itemsList = items
    .map(item => `- ${item.name} x ${item.quantity} (₦${item.price.toFixed(2)})`)
    .join('\n');

  // Email to the Buyer
  const customerTextBody = `
Hello ${customerName || 'there'},

Thank you for your intentional purchase from Karty.

Your payment for order (${orderId}) has been successfully processed! 
Your items are now securely packed and ready to be shipped.

You can track your order status anytime here:
https://karty.store/account/track/${orderId}

ORDER SUMMARY:
${itemsList}

Total Paid: ₦${totalAmount.toFixed(2)}

We will notify you once your order has been dispatched.

Warm regards,
The Karty Team
  `.trim();

  // Email to the Website Owner
  const ownerEmail = process.env.STORE_OWNER_EMAIL || 'admin@karty.store';
  const ownerTextBody = `
Hello Admin,

A new order (${orderId}) has just been paid and is ready to be shipped!

CUSTOMER DETAILS:
Name: ${customerName || 'N/A'}
Email: ${toEmail}

ORDER SUMMARY:
${itemsList}

Total Paid: ₦${totalAmount.toFixed(2)}

Please prepare the items for dispatch.
  `.trim();

  try {
    // Send to Customer
    await mg.messages.create(DOMAIN, {
      from: `Karty Studio <postmaster@${DOMAIN}>`,
      to: [toEmail],
      subject: `Order Confirmation: ${orderId}`,
      text: customerTextBody,
    });
    console.log(`Order confirmation email sent to ${toEmail} for order ${orderId}`);

    // Send to Website Owner
    await mg.messages.create(DOMAIN, {
      from: `Karty Studio <postmaster@${DOMAIN}>`,
      to: [ownerEmail],
      subject: `New Order Received: ${orderId}`,
      text: ownerTextBody,
    });
    console.log(`New order notification sent to owner (${ownerEmail}) for order ${orderId}`);
  } catch (error) {
    console.error("Failed to send order emails:", error);
    throw error;
  }
}
