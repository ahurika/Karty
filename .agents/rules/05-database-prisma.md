---
trigger: glob
globs: prisma/** lib/db/** app/api/**/* lib/**/repository/**
---

Purpose

Protect the Prisma/PostgreSQL data model and database integrity.

Rules
DB-001 — PostgreSQL Is Locked

Use PostgreSQL.

DB-002 — Prisma Is Locked

Use Prisma as the ORM.

DB-003 — Preserve the Data Model

Do not remove required relationships simply to simplify implementation.

DB-004 — User Ownership

User-owned records must have an enforceable relationship to the correct User.

DB-005 — Historical Prices

OrderItem must store the purchase-time unit price.

Never calculate historical order totals using the current Product price.

DB-006 — Decimal Money Handling

Use the database/application representation appropriate for precise monetary values.

Never use JavaScript floating-point arithmetic as the authoritative source for monetary calculations.

DB-007 — Transactions

Use Prisma transactions when multiple writes must succeed together.

DB-008 — Foreign Keys

Preserve referential integrity.

Do not create orphaned OrderItems.

DB-009 — Indexes

Add indexes when required by actual query patterns and relationships.

Do not add arbitrary indexes without a reason.

DB-010 — Migrations

Schema changes must be represented through proper Prisma migrations.

Do not manually modify production database structure outside the project's migration strategy.

DB-011 — Seed Data

Seed data must be deterministic and safe to run according to the project's seed strategy.

Do not place real customer data in seed files.

DB-012 — Deletion

Do not physically delete records in a way that destroys required historical order/payment relationships.

Where deletion behavior is unclear, stop and identify the requirement.