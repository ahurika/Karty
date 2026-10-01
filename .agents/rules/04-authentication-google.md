---
trigger: glob
globs: app/**/auth/** app/api/auth/** lib/auth/** components/auth/** middleware.ts
---

Purpose

Define Google authentication behavior.

Rules
AUTH-001 — Google Is Locked

Use Google OAuth for MVP authentication.

AUTH-002 — Google Cloud Console

Google OAuth credentials and authorized redirect URIs must be configured through Google Cloud Console.

AUTH-003 — Protect Credentials

Never expose the Google OAuth client secret.

AUTH-004 — Validate OAuth Flow

Do not construct authenticated sessions from arbitrary client values.

AUTH-005 — Server Identity

Protected operations must derive the current user from the server-side authenticated session.

AUTH-006 — User Linking

Do not create duplicate application accounts for the same Google identity.

AUTH-007 — Authorization

Successful authentication does not automatically authorize access to every resource.

Authorization must still be checked per resource.

AUTH-008 — Logout

If logout functionality is implemented, invalidate the appropriate application session securely.

AUTH-009 — Authentication Errors

Authentication failures must not expose sensitive OAuth implementation details.