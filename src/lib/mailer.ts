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

  const textBody = `
Hello ${customerName || 'there'},

Thank you for your intentional purchase from Karty.

Your order (${orderId}) has been confirmed and is now being processed.

ORDER SUMMARY:
${itemsList}

Total: ₦${totalAmount.toFixed(2)}

We will notify you once your order has been dispatched.

Warm regards,
The Karty Team
  `.trim();

  try {
    await mg.messages.create(DOMAIN, {
      from: `Karty Studio <postmaster@${DOMAIN}>`,
      to: [toEmail],
      subject: `Order Confirmation: ${orderId}`,
      text: textBody,
    });
    console.log(`Order confirmation email sent to ${toEmail} for order ${orderId}`);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    throw error;
  }
}
