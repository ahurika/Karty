# Testing and Verification Skill

## Purpose
Use this skill before declaring implementation complete.

## Verification Layers
Run verification in this order:
1. Type checking
2. Linting
3. Unit tests
4. Integration tests
5. End-to-end tests
6. Production build

## Functional Verification
Verify:
### Product
- Products load.
- Product details work.
- Invalid products fail safely.

### Cart
- Add works.
- Quantity changes work.
- Remove works.
- Totals are correct.

### Authentication
- Google login works.
- User identity is persisted correctly.
- Unauthorized access is blocked.

### Checkout
- Invalid input is rejected.
- Empty cart is rejected.
- Product availability is revalidated.
- Server calculates totals.

### Payment
- Paystack initializes.
- Payment is verified.
- Amount is verified.
- Reference is verified.
- Duplicate events are safe.
- Invalid webhooks are rejected.

### Order
- Order persists.
- Order items persist.
- Historical price persists.
- Duplicate submissions are prevented.

### Email
- Confirmation email is triggered correctly.
- Email failure does not corrupt the order.

## Security Verification
Check for:
- Secret exposure
- Client-side secret imports
- Missing authorization
- User data leakage
- Unvalidated mutation endpoints
- Payment trust issues

## Build Verification

The final production build must complete successfully. Do not declare success if the build contains unresolved errors.

## Final Report
Report:
### Implemented
List completed requirements.
### Tests
List commands/tests executed and their results.
### Build State
State whether the production build passed.
### Known Issues
List unresolved issues.
### Scope
State whether any functionality was intentionally not implemented because it is outside MVP.