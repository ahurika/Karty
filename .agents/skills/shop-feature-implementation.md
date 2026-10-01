# Shop Feature Implementation Skill

## Purpose

Use this skill when implementing product browsing, product details, cart, or general shop functionality.

## Before Implementation

Read:

1. AGENTS.md
2. Relevant PRD requirements
3. Relevant active rules
4. Existing implementation
5. Existing tests

Identify the requirement IDs being implemented.

## Product Flow

Preserve:

Product Catalog
→ Product Detail
→ Add to Cart
→ Cart Review
→ Checkout

## Product Data

Treat database product data as authoritative.

Never trust client-provided:

- Price
- Availability
- Product ownership
- Product existence

## Cart

The cart must support:

- Add product
- Change quantity
- Remove item
- Calculate subtotal

Cart calculations must be consistent with server-side authoritative pricing.

## Product Availability

Before order creation, revalidate product availability.

Do not assume a product remains available merely because it was available when added to the cart.

## Implementation

Keep:

- Product UI in components/products
- Cart UI in components/cart
- Product data access server-side
- Business calculations outside presentation components

## Testing

Verify:

- Product renders.
- Product detail resolves.
- Product can be added.
- Quantity updates correctly.
- Removal works.
- Empty cart works.
- Invalid product IDs fail safely.
- Unavailable products cannot be purchased.
- Price manipulation is rejected by server-side logic.