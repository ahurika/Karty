---
trigger: always_on
---

Purpose

Protect users, credentials, payments, and persistent data.

Rules
SEC-001 — Never Trust Client Authorization

Never use a client-provided user ID as proof of ownership.

Determine identity from the authenticated server-side session.

SEC-002 — Enforce Authorization Server-Side

Every protected resource must verify that the authenticated user has permission to access it.

SEC-003 — Protect Secrets

Never expose:

Database credentials
Google OAuth client secrets
Paystack secret key
Mailgun API credentials
Session secrets
Private environment variables

to browser code.

SEC-004 — Validate Server Input

Every mutation must validate its input server-side.

Client-side validation is only a UX convenience.

SEC-005 — Protect Personal Data

Do not return private customer information unless required for the current operation.

SEC-006 — Avoid Sensitive Logging

Never log:

Passwords
OAuth tokens
API keys
Payment secrets
Session tokens
Full authentication credentials
SEC-007 — Prevent Cross-User Data Access

Every user-owned database query must be scoped to the authenticated user where applicable.

SEC-008 — Use Rate Limiting

Apply appropriate rate limiting to:

Authentication
Checkout
Order creation
Payment operations
Webhook endpoints where appropriate
Other sensitive mutations
SEC-009 — Safe Errors

Never expose raw:

SQL errors
Prisma errors
API credentials
Stack traces
Internal paths
Provider secrets

to users.

SEC-010 — Preserve Data Integrity

Use database transactions when several database operations must succeed together.