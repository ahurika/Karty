# Prisma Database Skill

## Purpose
Use this skill for:
- Prisma schema changes
- Database migrations
- Queries
- Transactions
- Seed data
- Data model changes

## Locked Stack
Use:
- PostgreSQL
- Prisma

## Before Schema Changes
Read:
1. PRD data model
2. Relevant functional requirements
3. Existing Prisma schema
4. Existing migrations

Determine whether the requested change affects:
- User
- Product
- Order
- OrderItem
- Payment
- Relationships
- Constraints
- Indexes

## Schema Principles
Every entity must have a reason to exist. Every relationship must correspond to a product requirement or necessary technical behavior. Do not create speculative tables.

## Orders
Orders must retain:
- User
- Order reference
- Total
- Status
- Creation time

## Order Items
OrderItems must retain:
- Order
- Product
- Quantity
- Unit price

The unit price is historical data. Never calculate an old order's price from the current Product price.

## Payments
Payment records must be associated with the correct order/reference. Payment state must remain distinguishable from order state.

## Transactions
Use Prisma transactions when multiple related writes must remain atomic. Example: Order + OrderItems + Payment context must not leave inconsistent partial state.

## Migrations
Do not manually alter production schema outside the migration strategy. Review generated migrations before applying them.

## Queries
Prefer explicit queries. Do not retrieve entire records when only a few fields are required. Scope user-owned data appropriately.

## Testing
Test:
- Relationships
- Constraints
- Transactions
- User isolation
- Order creation
- Payment association
- Historical pricing