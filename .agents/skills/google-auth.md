# Google Authentication Skill

## Purpose
Use this skill when implementing Google OAuth authentication.

## Provider
Google OAuth configured through Google Cloud Console.

## Flow
User → Google Authorization → OAuth Callback → Validate Identity → Find/Create Application User → Establish Session → Redirect to Application

## Configuration
Required configuration must be supplied through environment variables. Never hardcode:
- Client ID
- Client secret
- Session secret

## User Creation
On successful authentication:
1. Validate the Google identity.
2. Identify the authenticated Google account.
3. Find the corresponding application user.
4. Create the application user only when one does not exist.
5. Establish the application session.

Do not create duplicate users for the same Google identity.

## Authorization
Authentication establishes identity. It does not automatically authorize access to every record. Always enforce resource ownership separately.

## Failure Handling
Handle:
- User cancellation
- Invalid callback
- OAuth failure
- Missing identity
- Session failure
- Database failure

Do not expose provider secrets or internal OAuth errors.

## Testing
Test:
- Successful login
- First-time user
- Returning user
- Cancelled login
- Invalid callback
- Missing session
- Unauthorized resource access
- Logout/session invalidation where implemented 