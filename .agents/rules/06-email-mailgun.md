---
trigger: glob
globs: lib/email/** lib/mailgun/** app/api/email/** app/api/orders/** app/api/checkout/**
---

Purpose

Define Mailgun transactional email behavior.

Rules
EMAIL-001 — Mailgun Is Locked

Use Mailgun for transactional order confirmation emails.

EMAIL-002 — Server Only

Mailgun API calls must happen server-side.

EMAIL-003 — Protect Credentials

Never expose Mailgun API keys to the browser.

EMAIL-004 — Trusted Order Data

Build confirmation emails from server-authoritative order data.

Do not construct confirmation content from untrusted client totals.

EMAIL-005 — Correct Trigger

Only send an order confirmation after the required order/payment success state has been reached.

EMAIL-006 — Email Failure Isolation

An email failure must not corrupt an already persisted order.

EMAIL-007 — No False Delivery Claims

Do not tell the user an email was delivered when the system only knows that a request was accepted or queued.

EMAIL-008 — Avoid Duplicate Emails

Where retryable email processing exists, make the operation idempotent or otherwise prevent unintended duplicate confirmation emails.

EMAIL-009 — Safe Email Content

Do not place secrets or internal implementation details inside customer emails.

