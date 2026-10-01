---
trigger: glob
globs: app/**/checkout/** app/**/payment/** app/**/payments/** app/api/checkout/** app/api/payments/** lib/payments/** lib/paystack/** components/checkout/** components/payment/** prisma/**
---

Purpose

Define mandatory Paystack payment behavior.

Rules
PAY-001 — Paystack Is Locked

Use Paystack for MVP payments.

Do not introduce another payment provider.

PAY-002 — Server-Side Initialization

Initialize Paystack transactions from trusted server-side code.

Never initialize the authoritative transaction amount from untrusted client input.

PAY-003 — Server Calculates Amount

The server must calculate the payable amount from authoritative database values.

Never trust:

clientTotal
clientPrice
clientSubtotal

as authoritative values.

PAY-004 — Protect Secret Key

The Paystack secret key must only exist in server-side execution.

Never expose it through:

Client components
Public environment variables
Browser requests
HTML
JavaScript bundles
API responses
PAY-005 — Unique Reference

Generate and persist a unique payment/order reference.

The same reference must not accidentally identify unrelated transactions.

PAY-006 — Verify Payment

Never consider a payment successful merely because:

The user returned from Paystack.
The browser displays success.
A query parameter says success.
The frontend received a callback.

The server must verify the transaction.

PAY-007 — Verify Amount

The verified Paystack amount must correspond to the authoritative amount expected for the order.

Do not mark an underpaid transaction as fully paid.

PAY-008 — Verify Currency

Where the application defines a currency, verify that the payment currency matches the expected order currency.

PAY-009 — Verify Reference

The verified payment reference must correspond to the expected order/payment record.

PAY-010 — Idempotency

Payment processing must be safe to repeat.

Processing the same successful payment twice must not:

Create two orders.
Create two payment records.
Send duplicate fulfillment.
Change the order into an invalid state.
PAY-011 — Webhook Security

Verify Paystack webhook authenticity before processing webhook events.

Do not trust arbitrary POST requests to the webhook endpoint.

PAY-012 — Webhook Processing

Webhook processing must be idempotent.

Repeated webhook delivery must produce the same final state.

PAY-013 — Do Not Fulfill Unverified Payments

Never move an order into a paid/confirmed state solely from client-side information.

PAY-014 — Payment and Order State

Keep payment state separate from order state.

Do not use one field to represent every possible state of both concepts.

PAY-015 — Payment Failure

A failed payment must not be represented as a successful paid order.

PAY-016 — Provider Failure

A Paystack API failure must produce a safe application error.

Do not expose provider credentials or raw provider internals to the user.

PAY-017 — Amount Source

The authoritative amount flow must be:

Database Products
      ↓
Server Order Calculation
      ↓
Server Order/Payment Intent
      ↓
Paystack Initialization
      ↓
Payment
      ↓
Server Verification
      ↓
Persist Payment State

Never:

Browser Total
      ↓
Paystack
      ↓
Trust Browser Success