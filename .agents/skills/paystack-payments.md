# Paystack Payments Skill

## Purpose
Use this skill whenever implementing or modifying Paystack integration.

## Locked Provider
Paystack is the only MVP payment provider. Do not introduce another payment service.

## Required Architecture
Client → Server Payment Initialization → Paystack → Server Verification / Webhook → Payment State Update → Order State Update

## Step 1 — Calculate Amount
Never accept the browser's total as authoritative. Retrieve product data from PostgreSQL and calculate the expected amount on the server.

## Step 2 — Create Payment Record
Create the application-side payment context required to associate the Paystack transaction with the correct order. Persist the unique reference.

## Step 3 — Initialize Paystack Call
Paystack from server-side code. Never expose the secret key. The amount sent to Paystack must come from the server-calculated amount.

## Step 4 — Customer Payment
The browser may interact with Paystack using the public/client-safe configuration required by Paystack. The secret key must never enter the browser.

## Step 5 — Verify
After payment, verify the transaction server-side. Verify:
- Reference
- Status
- Amount
- Currency where applicable
- Associated order/payment record

## Step 6 — Webhook
If a webhook is used:
1. Receive the event.
2. Verify authenticity/signature.
3. Validate event data.
4. Locate the payment using the trusted reference.
5. Check current payment state.
6. Apply the state transition only if appropriate.
7. Return the required response promptly.

## Idempotency
The same event may arrive more than once. Processing it twice must not:
- Create a second order.
- Create a second payment.
- Duplicate fulfillment.
- Send uncontrolled duplicate confirmation emails.

## Failure States
Handle:
- Initialization failure
- Customer cancellation
- Verification failure
- Incorrect amount
- Incorrect reference
- Expired/invalid transaction
- Webhook failure
- Database failure
- Provider timeout

## Security
Never:
- Trust frontend payment success.
- Trust frontend amount.
- Trust arbitrary payment reference.
- Expose secret keys.
- Skip webhook verification.
- Mark unpaid orders as paid.

## Testing Matrix
| Scenario | Expected Result |
|---|---|
| Valid payment | Payment confirmed |
| Failed payment | Order remains unpaid |
| Incorrect amount | Payment rejected/not confirmed |
| Incorrect reference | Payment rejected |
| Duplicate webhook | No duplicate state transition |
| Invalid webhook signature | Event rejected |
| Paystack unavailable | Safe failure |
| Browser callback without verified payment | Not marked paid |
