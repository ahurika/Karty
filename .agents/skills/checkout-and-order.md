# Checkout and Order Skill
## Purpose

Use this skill when implementing:
- Checkout
- Order creation
- Order items
- Order confirmation
- Checkout validation

## Required Flow

```text
Cart
  ↓
Checkout Validation
  ↓
Server Order Calculation
  ↓
Order Creation
  ↓
Payment Initialization
  ↓
Payment Verification
  ↓
Order Confirmation
  ↓
Confirmation Email
```

Do not skip the server-side calculation stage.

## Before Implementation

Identify:
- Checkout requirements
- Required checkout fields
- Order data model
- Payment requirements
- Relevant acceptance criteria

Do not invent checkout fields when the requirements are unresolved.

## Order Calculation

The server must:
1. Retrieve authoritative product records.
2. Validate product availability.
3. Validate quantities.
4. Retrieve current authoritative prices.
5. Calculate the total.
6. Create the appropriate order/payment records.

Never accept a client-calculated total.

## Order Creation

Use a database transaction when multiple records must be created together.

Order creation must preserve:
- User identity
- Product identity
- Quantity
- Unit price
- Total
- Order reference
- Payment relationship

## Duplicate Submission

Protect against:
- Double click
- Browser retry
- Network retry
- Duplicate API request

Do not create duplicate orders.

## Payment Boundary

Do not consider an order successfully paid until Paystack verification confirms payment.

## Confirmation

After the appropriate successful state:
1. Persist the final order/payment state.
2. Display confirmation.
3. Trigger confirmation email.

Do not show a false success state.

## Testing

Test:
- Empty cart
- Invalid quantity
- Invalid product
- Unavailable product
- Price change
- Duplicate submission
- Database failure
- Successful checkout
- Failed payment
- Successful payment
- Email failure                 