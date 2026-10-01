---
trigger: always_on
---

Purpose

Define the baseline engineering behavior for every implementation task.

Rules
CORE-001 — Follow the PRD

The PRD is the source of truth for product scope and requirements.

Before implementing a feature, identify the relevant PRD requirement.

Do not implement functionality merely because it appears useful.

CORE-002 — Respect MVP Scope

Build the MVP only.

Do not implement:

Product reviews
Loyalty systems
AI features
Advanced recommendations
Multi-vendor functionality
Additional authentication providers
Additional payment providers
Unrequested admin functionality
Unrequested inventory functionality
Unrequested discount functionality

Unless a new requirement is explicitly introduced.

CORE-003 — Preserve the Locked Stack

Use:

Next.js
TypeScript
PostgreSQL
Prisma
Google OAuth
Google Cloud Console
Paystack
Mailgun

Do not replace a locked technology because implementation is inconvenient.

CORE-004 — Do Not Hide Scope Changes

If implementation requires a decision that changes:

Product behavior
Data model
Payment behavior
Authentication behavior
Security behavior
User permissions
External service behavior

stop and identify the decision rather than silently changing scope.

CORE-005 — Preserve Existing Working Behavior

Before modifying an existing implementation:

Understand what it currently does.
Identify dependencies.
Identify existing tests.
Make the smallest change required.
Verify affected behavior.

Do not rewrite unrelated code.

CORE-006 — Keep Responsibilities Separate

Do not mix:

UI rendering
database access
payment provider calls
email provider calls
authentication logic
validation
business rules

inside one component or function.

CORE-007 — Prefer Small Modules

Functions should have one clear responsibility.

Avoid giant files that combine unrelated concerns.

CORE-008 — Do Not Create Premature Abstractions

Do not create generic frameworks, factories, service layers, or utility systems unless they solve an actual repeated problem.

CORE-009 — Server Is Authoritative

The browser is not a trusted environment.

The server must determine:

User identity
Authorization
Product price
Product availability
Order total
Payment status
Order state
CORE-010 — Do Not Declare Completion Prematurely

A feature is not complete because:

The page renders.
The button works locally.
The happy path works once.

Verify the relevant acceptance criteria and tests.