---
trigger: always_on
---

Purpose

Ensure every change is verifiable.

Rules
TEST-001 — Test Changed Behavior

Every meaningful feature change must include appropriate verification.

TEST-002 — Do Not Test Only the Happy Path

Where applicable test:

Success
Validation failure
Authorization failure
Database failure
External service failure
Duplicate requests
Empty states
Invalid input
TEST-003 — Payment Testing

Payment changes must cover:

Initialization
Successful verification
Failed verification
Incorrect amount
Incorrect reference
Duplicate webhook
Invalid webhook signature
Provider failure
TEST-004 — Authentication Testing

Authentication changes must cover:

Successful authentication
Cancelled authentication
Invalid callback
Session absence
Unauthorized resource access
TEST-005 — Build Verification

The project must build successfully before a task is declared complete.

TEST-006 — Type Safety

Do not suppress type errors merely to achieve a successful build.

TEST-007 — Regression Protection

Do not modify existing behavior without checking affected functionality.

TEST-008 — Completion Report

At the end of implementation, report:

What changed.
Which requirements were satisfied.
Tests executed.
Build result.
Known limitations.
Any unresolved questions.