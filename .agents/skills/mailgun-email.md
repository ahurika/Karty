# Mailgun Email Skill

## Purpose
Use this skill when implementing transactional email behavior.

## Provider
Mailgun is the locked email provider.

## Email Flow
Successful Order/Payment State → Build Email Data From Database → Mailgun Server Request → Record/Log Result → User Continues

## Source of Truth
Email content must come from server-authoritative order data. Do not construct confirmation emails using browser-provided totals.

## Required Content
The confirmation email should contain the information necessary to identify the order and understand what was submitted. At minimum, this includes:
- Order identifier
- Ordered products
- Quantities
- Applicable order total

Do not expose internal secrets or implementation details.

## Failure Handling
If Mailgun fails:
- Do not delete the order.
- Do not mark the payment as failed solely because email failed.
- Log the failure safely.
- Return a truthful application state.

## Duplicate Handling
Where retries exist, avoid uncontrolled duplicate confirmation emails.

## Security
Never expose the Mailgun API key. Never send sensitive internal data unnecessarily.

## Testing
Test:
- Successful email request
- Mailgun failure
- Mailgun timeout
- Invalid email configuration
- Duplicate retry
- Correct order data
- Correct total       