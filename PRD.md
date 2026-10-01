# Product Requirements Document: Shop Website

**Version:** 1.0
**Status:** Draft for implementation
**Product Type:** Responsive e-commerce shop website

---

## 1. Product Summary

### Product Name

**[PRODUCT NAME PLACEHOLDER]**

### Product Concept

A responsive web shop where users can browse available products, add products to a cart, proceed to checkout, submit an order, and receive an order confirmation email.

Users authenticate using Google OAuth. Product, cart, customer, and order information is persisted in a PostgreSQL database using either Supabase or Neon.

### Product Type

Responsive web-based shop / e-commerce application.

### Target Users

Users who want to browse products and place orders through a simple online shopping experience.

### Core Value Proposition

Provide a straightforward shopping flow from product discovery through checkout and order confirmation, while securely persisting customer and order information.

### Primary User Workflow

1. User visits the shop.
2. User browses available products.
3. User views product information.
4. User adds one or more products to the cart.
5. User reviews the cart.
6. User proceeds to checkout.
7. User authenticates with Google if required.
8. User provides the required checkout information.
9. User submits the order.
10. The system persists the order.
11. The system sends an order confirmation email through Mailgun.
12. The user sees an order confirmation state.

### MVP Scope

The MVP includes:

* Product browsing
* Product details
* Shopping cart
* Cart quantity management
* Checkout page
* Google authentication
* Customer information persistence
* Order persistence
* Order confirmation
* Confirmation emails through Mailgun
* PostgreSQL database persistence
* Responsive behavior
* Basic accessibility
* Secure user and order data handling

### Platform Scope

* Responsive web
* Mobile
* Tablet
* Desktop

### Key Capabilities

* Browse products
* View product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Authenticate using Google
* Complete checkout
* Persist orders
* Send confirmation emails
* Display order confirmation

---

## 2. Problem Statement

### User Problem

Users need a simple way to browse products and complete a purchase through a web-based shop without losing their cart or order information during the shopping process.

### Existing Workflow Problems

Without a centralized shopping flow:

* Product selection may not persist reliably.
* Cart contents can be difficult to manage.
* Customer information may need to be repeatedly entered.
* Orders may not be reliably recorded.
* Users may have no immediate confirmation that an order was successfully submitted.

### Why the Shop and Checkout Need to Work Together

The shop allows users to discover and select products, while checkout converts those selections into a persistent order.

The product therefore needs a continuous flow:

**Product discovery → Cart → Checkout → Order creation → Confirmation**

### Problem Reminders / Confirmation Solve

The confirmation email provides an additional record that an order was successfully submitted.

It reduces uncertainty after checkout by communicating the submitted order details to the customer.

### Consequences of Not Solving the Problem

Potential consequences include:

* Lost or inconsistent cart information.
* Orders not being persisted correctly.
* Customers being unsure whether checkout succeeded.
* Duplicate order submissions.
* Poor visibility into completed orders.
* Inability to reliably associate an order with its customer.

### Research Status

No user research was supplied with the task.

The problem framing is therefore based on the product requirements and represents a product hypothesis rather than validated research findings.

---

## 3. Goals and Non-Goals

### MVP Goals

1. Allow users to browse available products.
2. Allow users to add products to a cart.
3. Allow users to modify and remove cart items.
4. Provide a functional checkout page.
5. Authenticate users using Google.
6. Persist relevant application data in PostgreSQL.
7. Persist completed orders reliably.
8. Send confirmation emails through Mailgun after successful order creation.
9. Prevent users from accessing another user's private order information.
10. Provide a responsive experience across mobile, tablet, and desktop.
11. Provide accessible core shopping and checkout interactions.

### Future Goals

* Product search and advanced filtering.
* Customer order history.
* Inventory management.
* Product reviews.
* Multiple payment providers.
* Discount and promotional systems.
* Customer accounts with expanded profile functionality.
* Administrative product management.
* Order management workflows.
* Additional authentication providers.

These are future opportunities unless explicitly moved into MVP scope.

### Explicit Non-Goals

The MVP does not include:

* Payment processing unless a payment provider is separately approved.
* Subscription products.
* Product reviews.
* Social features.
* Customer-to-customer interaction.
* Product recommendations.
* AI functionality.
* Complex inventory management.
* Discount codes.
* Loyalty programs.
* Multiple currencies unless separately specified.
* Admin dashboard unless separately specified.

---

## 4. User Personas

### Persona 1: Shopper

**Role or context:**
A user visiting the shop to purchase one or more available products.

**Needs:**

* Understand available products.
* Review product information.
* Select desired products.
* Review the cart.
* Complete checkout.
* Receive confirmation.

**Goals:**

* Complete an order without unnecessary steps.
* Know what products were ordered.
* Know that the order was successfully submitted.

**Behaviors:**

* Browses products.
* Adds and removes products from the cart.
* Adjusts quantities.
* Reviews checkout information before submission.

**Pain Points:**

* Unclear product information.
* Unexpected cart changes.
* Losing selected products.
* Unclear checkout state.
* No confirmation after submitting an order.

**Relevant Use Cases:**

* Browse products.
* View product details.
* Add product to cart.
* Update quantity.
* Remove product.
* Authenticate.
* Complete checkout.
* Receive order confirmation.

### Persona 2: Returning Shopper

**Role or context:**
A user who has previously used the shop and returns to place another order.

**Needs:**

* Quickly authenticate.
* Access their shopping flow.
* Complete checkout without unnecessary account creation.

**Goals:**

* Reduce repeated authentication friction.
* Complete another purchase efficiently.

**Behaviors:**

* Uses Google authentication.
* Browses products.
* Places additional orders.

**Pain Points:**

* Re-entering unnecessary account information.
* Unclear authentication state.
* Failed checkout or authentication.

---

## 5. Functional Requirements

### 5.1 Product Catalog

#### FR-001 — Display Products

**Requirement:**
The system shall display available products in the shop.

**User behavior:**
The user opens the shop and sees available products.

**System behavior:**
The system retrieves available product records and renders them.

**Acceptance criteria:**

* Products returned by the database are displayed.
* Each product displays its required product information.
* Products that are not available for purchase are not presented as purchasable.

**Edge cases:**

* No products exist.
* Database retrieval fails.
* A product becomes unavailable after the page loads.

---

#### FR-002 — Product Information

**Requirement:**
Each product shall provide enough information for the user to identify what they are purchasing.

**User behavior:**
The user selects a product.

**System behavior:**
The system displays the product's stored information.

**Acceptance criteria:**

* Product name is displayed.
* Product price is displayed.
* Product description is displayed where available.
* Product image is displayed where available.

**Edge cases:**

* Product image is unavailable.
* Product description is empty.
* Product no longer exists.

---

#### FR-003 — Product Detail View

**Requirement:**
The system shall provide a product detail view.

**User behavior:**
The user opens a product.

**System behavior:**
The system retrieves the product using its unique identifier.

**Acceptance criteria:**

* The correct product is displayed.
* The displayed price matches the persisted product price.
* The user can add the product to the cart.

**Edge cases:**

* Invalid product ID.
* Product has been removed.
* Product becomes unavailable.

---

### 5.2 Shopping Cart

#### FR-004 — Add Product to Cart

**Requirement:**
Users shall be able to add an available product to their cart.

**User behavior:**
The user selects "Add to cart."

**System behavior:**
The system adds the product and requested quantity to the current cart.

**Acceptance criteria:**

* The selected product appears in the cart.
* The quantity is at least one.
* Adding the same product again increases or updates its quantity rather than creating an invalid duplicate cart state.

**Edge cases:**

* Product is unavailable.
* Product no longer exists.
* Database operation fails.

---

#### FR-005 — Update Cart Quantity

**Requirement:**
Users shall be able to increase or decrease the quantity of a cart item.

**Acceptance criteria:**

* Quantity can be increased.
* Quantity can be decreased.
* Quantity cannot become less than one through quantity controls.
* Cart totals update after a quantity change.

**Edge cases:**

* Quantity is submitted as zero.
* Quantity is negative.
* Quantity is not a valid integer.
* Product becomes unavailable.

---

#### FR-006 — Remove Cart Item

**Requirement:**
Users shall be able to remove an item from the cart.

**Acceptance criteria:**

* The item is removed.
* Cart totals are recalculated.
* Other cart items remain unchanged.

**Edge cases:**

* Item no longer exists.
* Removal request is duplicated.
* Database operation fails.

---

#### FR-007 — Cart Total

**Requirement:**
The system shall calculate the cart subtotal from persisted product prices and selected quantities.

**Acceptance criteria:**

* Subtotal equals the sum of each item's current applicable price multiplied by quantity.
* Client-provided totals are not trusted as the authoritative order amount.
* The server recalculates totals before order creation.

**Edge cases:**

* Product price changed after being added to cart.
* Product was removed.
* Invalid quantity.

---

### 5.3 Authentication

#### FR-008 — Google Authentication

**Requirement:**
Users shall be able to authenticate using Google OAuth.

**User behavior:**
The user selects the Google sign-in option.

**System behavior:**
The application redirects the user through the configured Google OAuth flow.

**Acceptance criteria:**

* The user can initiate Google authentication.
* Successful authentication creates or retrieves the corresponding application user.
* The user's authenticated session is established.
* Failed authentication does not create an invalid user session.

**Edge cases:**

* User cancels authentication.
* Google authentication fails.
* OAuth callback contains invalid data.
* Existing account matches the authenticated Google identity.

---

#### FR-009 — Authenticated User Identity

**Requirement:**
The system shall associate authenticated application activity with the correct user account.

**Acceptance criteria:**

* Every authenticated user has a unique application user record.
* Google identity information is stored according to the authentication architecture.
* Users cannot be associated with another user's account through client-controlled identifiers.

---

### 5.4 Checkout

#### FR-010 — Checkout Page

**Requirement:**
The application shall provide a checkout page.

**User behavior:**
The user proceeds from the cart to checkout.

**System behavior:**
The system displays the selected products, quantities, applicable totals, and required customer information.

**Acceptance criteria:**

* Checkout displays the current cart contents.
* Checkout displays the calculated order total.
* Required checkout information is clearly identified.
* The user can submit the order when validation succeeds.

**Edge cases:**

* Cart is empty.
* Cart contains an unavailable product.
* User session expires during checkout.
* Cart data has changed since checkout was opened.

---

#### FR-011 — Checkout Validation

**Requirement:**
The system shall validate checkout information before creating an order.

**Acceptance criteria:**

* Required fields cannot be submitted empty.
* Invalid values are rejected.
* Server-side validation is performed independently of client-side validation.
* Validation errors are associated with the relevant fields where practical.

---

#### FR-012 — Order Submission

**Requirement:**
The system shall create an order only after the checkout request has passed validation.

**Acceptance criteria:**

* A unique order is created.
* The order is associated with the authenticated user.
* Ordered products and quantities are persisted.
* The order total is calculated server-side.
* The user receives an order confirmation state after successful creation.

**Edge cases:**

* User double-clicks submit.
* Network request is retried.
* Database transaction fails.
* Product becomes unavailable before order creation.

---

#### FR-013 — Duplicate Order Protection

**Requirement:**
The system shall reduce the possibility of duplicate orders caused by repeated checkout submissions.

**Acceptance criteria:**

* Repeated submission of the same checkout action does not unintentionally create multiple identical orders.
* The implementation uses an appropriate idempotency or equivalent server-side protection mechanism.

**Edge cases:**

* Browser retries the request.
* User refreshes during submission.
* Network timeout occurs after the server creates the order.

---

### 5.5 Order Persistence

#### FR-014 — Persist Orders

**Requirement:**
Successfully submitted orders shall be persisted in the PostgreSQL database.

**Acceptance criteria:**

* Each order has a unique identifier.
* Each order is associated with a user.
* Each order contains its order items.
* Quantity and purchase price are persisted.
* Order creation timestamp is persisted.

---

#### FR-015 — Preserve Order Pricing

**Requirement:**
An order shall preserve the price applicable at the time the order is created.

**Acceptance criteria:**

* Changing the product's current price does not retroactively change an existing order's stored item price.
* Order totals can be reconstructed from persisted order items.

---

### 5.6 Confirmation Email

#### FR-016 — Send Confirmation Email

**Requirement:**
The system shall send an order confirmation email through Mailgun after a successful order is created.

**User behavior:**
The user receives confirmation at the email address associated with the authenticated account.

**System behavior:**

1. Order creation succeeds.
2. The system prepares confirmation data.
3. The system sends the email through Mailgun.
4. The system records the email delivery attempt/result as required by the implementation.

**Acceptance criteria:**

* Confirmation is only attempted for successfully created orders.
* The email contains the order identifier.
* The email contains relevant ordered items.
* The email contains the order total.
* Mailgun API credentials are never exposed to the browser.

**Edge cases:**

* Mailgun request fails.
* Mailgun times out.
* Email address is unavailable.
* Order succeeds but email delivery fails.

---

#### FR-017 — Email Failure Isolation

**Requirement:**
A Mailgun delivery failure shall not incorrectly report a successfully persisted order as failed.

**Acceptance criteria:**

* The order remains persisted if email delivery fails after order creation.
* The application distinguishes order creation status from email delivery status.
* The user receives an appropriate confirmation state without falsely claiming successful email delivery if delivery cannot be confirmed.

---

### 5.7 Notifications

#### FR-018 — Order Confirmation State

**Requirement:**
The application shall display an order confirmation state after successful order creation.

**Acceptance criteria:**

* The state confirms that the order was created.
* The order identifier is displayed.
* The user is not instructed to retry if the order was already successfully created.

---

### 5.8 Responsive Behavior

#### FR-019 — Responsive Layout

**Requirement:**
The shop shall work across mobile, tablet, and desktop screen sizes.

**Acceptance criteria:**

* Product content remains accessible on small screens.
* Cart controls remain usable on touch devices.
* Checkout fields remain usable on small screens.
* No required content is inaccessible because of viewport width.
* Horizontal scrolling is not required for normal application usage.

---

### 5.9 Accessibility

#### FR-020 — Accessible Shopping Flow

**Requirement:**
Core shopping and checkout functionality shall follow WCAG 2.2 AA requirements where applicable.

**Acceptance criteria:**

* Interactive controls are keyboard accessible.
* Form fields have accessible labels.
* Validation errors are communicated accessibly.
* Focus states are visible.
* Images have appropriate alternative text where meaningful.
* Color is not the only mechanism used to communicate important information.

---

### 5.10 Error Handling

#### FR-021 — User-Facing Errors

**Requirement:**
The application shall communicate actionable errors when product, cart, authentication, checkout, database, or email operations fail.

**Acceptance criteria:**

* Users are not shown raw database errors.
* Users are not shown secret credentials.
* Failed operations provide an understandable next step where appropriate.
* Server logs contain sufficient technical context for investigation without exposing sensitive information.

---

## 6. AI Processing Pipeline

### MVP AI Requirement

**No AI processing is required for the MVP.**

The requested product capabilities can be implemented using conventional application logic, database operations, OAuth authentication, and transactional email.

Introducing AI would add:

* Additional infrastructure.
* Additional operational cost.
* Additional privacy considerations.
* Additional failure modes.

None of these are necessary to satisfy the current shop requirements.

### Future AI Opportunities

AI could potentially be considered in a later phase for capabilities such as:

* Product discovery assistance.
* Natural-language product search.
* Product description generation for administrators.
* Customer support assistance.

These are **future opportunities only** and are not MVP requirements.

No AI model, prompt, API, structured output, retry strategy, or AI processing pipeline is required for the MVP.

---

## 7. Technical Requirements

### 7.1 Locked / Required Technologies

The implementation shall use:

* Next.js
* TypeScript
* PostgreSQL
* Prisma
* Google OAuth
* Google Cloud Console for OAuth configuration
* Mailgun for transactional email

The database hosting option is currently either:

* Supabase PostgreSQL
* Neon PostgreSQL

The final database provider remains an open implementation decision.

### 7.2 Next.js

**Required technical behavior:**

* Use Next.js as the application framework.
* Server-side operations must protect secrets and privileged database operations.
* API/server actions must validate user authorization before modifying protected resources.

**Recommended implementation approach:**

* Keep database and Mailgun operations server-side.
* Avoid exposing privileged credentials to client-side code.

### 7.3 TypeScript

**Required technical behavior:**

* Use TypeScript throughout the application.
* Define explicit types for product, cart, order, user, and email-related application data.
* Avoid unsafe type assumptions around external API responses.

### 7.4 PostgreSQL

PostgreSQL shall be the persistent database.

The database shall store, at minimum:

* Users
* Products
* Orders
* Order items

Additional entities may be required depending on the selected authentication/session implementation.

### 7.5 Prisma

Prisma shall be used as the ORM.

Required behavior:

* Database access must use Prisma.
* Product, cart/order, and user-related operations must map to the defined data model.
* Transactions must be used where multiple related records must succeed or fail together.

### 7.6 Authentication

Google OAuth shall be configured using Google Cloud Console.

Required behavior:

* OAuth client credentials must be stored as environment variables.
* Client secrets must never be committed to source control.
* OAuth callback URLs must be explicitly configured for each deployment environment.
* Authentication must establish a secure application session.
* Authentication state must be validated server-side for protected operations.

### 7.7 Authorization

Authentication alone is not sufficient for authorization.

The system must verify that:

* A user can only access their own protected customer information.
* A user can only access or modify resources belonging to their account.
* Order creation associates the order with the authenticated server-side user identity.
* Client-provided user IDs cannot be trusted for authorization.

### 7.8 API Architecture

Server endpoints or server-side actions should be organized around application resources and operations such as:

* Products
* Cart
* Checkout
* Orders
* Authentication
* Email

The exact routing structure is an implementation decision.

### 7.9 Server-Side Validation

All client-provided data must be validated on the server.

Validation must cover:

* Product identifiers.
* Quantities.
* User/customer information.
* Order submission data.
* Authentication callback data.
* Any identifiers supplied by the client.

### 7.10 Client-Side Validation

Client-side validation should provide immediate feedback but must not replace server-side validation.

### 7.11 Database Transactions

Order creation must use an appropriate database transaction when creating:

* Order
* Order items
* Any other records that must remain consistent with the order

If one required operation fails, the transaction should not leave a partially created order.

### 7.12 Security

The application must:

* Keep secrets server-side.
* Validate all external input.
* Protect authenticated routes and operations.
* Prevent unauthorized order access.
* Avoid exposing database credentials.
* Avoid exposing Mailgun credentials.
* Avoid exposing Google OAuth client secrets.
* Apply appropriate rate limiting to authentication and sensitive endpoints.

### 7.13 Rate Limiting

Rate limiting should protect:

* Authentication initiation/callback-related endpoints where applicable.
* Checkout submission.
* Order creation.
* Other mutation endpoints exposed publicly.

Specific thresholds are an implementation decision and should be documented before production deployment.

### 7.14 Data Privacy

User information and order information must be treated as private.

The system must:

* Associate orders with authenticated users.
* Prevent cross-user data access.
* Avoid logging unnecessary personal information.
* Avoid exposing sensitive data in client-side payloads.

### 7.15 Mailgun Integration

Mailgun shall be used for transactional order confirmation emails.

Required behavior:

* Mailgun credentials are stored in environment variables.
* Mailgun API calls occur server-side.
* Email content is generated from trusted order data.
* Email failures are logged appropriately.
* Email failure does not automatically invalidate a successfully persisted order.

### 7.16 Email Processing

**Recommended implementation approach:**

For the MVP, confirmation email delivery may occur after successful order persistence.

If delivery reliability becomes a requirement, a durable background job/outbox mechanism can be introduced in a future phase.

### 7.17 Order Consistency

The server must not trust the following values from the browser as authoritative:

* Product price.
* Order subtotal.
* Order total.
* User identity.
* Product ownership or availability.

The server must retrieve authoritative product data and calculate the order amount before persistence.

### 7.18 Performance

The application should:

* Avoid unnecessary database queries.
* Retrieve only required product/order fields.
* Use database indexes for frequently queried identifiers and relationships.
* Avoid blocking the user interface unnecessarily during non-critical operations.

No arbitrary performance benchmark is defined by the task.

### 7.19 Logging

The system should log sufficient information to investigate:

* Authentication failures.
* Checkout failures.
* Order creation failures.
* Database failures.
* Mailgun failures.

Logs must not expose:

* Passwords.
* OAuth client secrets.
* Database credentials.
* Mailgun API keys.
* Authentication tokens.

### 7.20 Monitoring

Production monitoring should be capable of identifying:

* Application errors.
* Failed order creation.
* Failed email delivery.
* Database connectivity issues.
* Authentication failures.

Specific monitoring provider is not locked.

### 7.21 Testing

Testing should cover at minimum:

* Product retrieval.
* Cart calculations.
* Quantity validation.
* Authentication behavior.
* Authorization.
* Checkout validation.
* Order creation.
* Order total calculation.
* Duplicate checkout protection.
* Email failure handling.
* Responsive core flows.
* Accessibility-critical interactions.

### 7.22 Deployment

The hosting provider is not locked.

Deployment must provide:

* Environment variable configuration.
* HTTPS.
* PostgreSQL connectivity.
* Google OAuth callback configuration.
* Mailgun configuration.
* Production database migrations.

### 7.23 Environment Variables

Secrets and environment-specific configuration must be stored through environment variables.

Expected categories include:

* Database connection
* Authentication configuration
* Google OAuth credentials
* Mailgun credentials
* Application base URL

Actual secret values must never be committed to source control.

---

## 8. Business Model

### MVP Business Model

The MVP is free to use.

No payment or subscription functionality is required by the current product brief.

### Why the MVP Is Free

The current task focuses on validating the core shopping flow:

**Browse → Cart → Checkout → Order persistence → Email confirmation**

Adding payment processing would introduce another external dependency and additional product requirements that are not specified.

### Potential Future Monetization

Future monetization could include:

* Transaction fees.
* Premium shop functionality.
* Merchant subscriptions.
* Advanced analytics.
* Premium product management.
* Promotional tools.

These are hypotheses and require separate business validation.

### Features That Could Become Paid

Potentially monetizable future capabilities include:

* Advanced inventory management.
* Analytics.
* Marketing automation.
* Advanced customer management.
* Promotional campaigns.
* Multiple storefronts.

### Core Functionality That Should Remain Free

If the product is later monetized, basic browsing and core access to the shop should only be restricted if a deliberate business decision supports that model.

No monetization mechanism is part of the MVP.

---

## 9. Risks

| ID      | Risk                                                       | Impact | Likelihood | Mitigation                                                            | Detection Method                         |
| ------- | ---------------------------------------------------------- | ------ | ---------- | --------------------------------------------------------------------- | ---------------------------------------- |
| RSK-001 | Google OAuth configuration is incorrect                    | High   | Medium     | Validate OAuth credentials and redirect URIs in each environment      | Authentication integration testing       |
| RSK-002 | Unauthorized user accesses another user's order            | High   | Medium     | Enforce server-side authorization using authenticated identity        | Authorization tests and security testing |
| RSK-003 | Client manipulates product price before checkout           | High   | Medium     | Retrieve product prices server-side and calculate totals server-side  | Checkout integration tests               |
| RSK-004 | Duplicate checkout request creates duplicate orders        | High   | Medium     | Use idempotency/equivalent duplicate protection                       | Repeated submission tests                |
| RSK-005 | Mailgun delivery fails after order creation                | Medium | Medium     | Separate order persistence from email delivery status                 | Mailgun failure testing and logs         |
| RSK-006 | Database failure during order creation                     | High   | Low/Medium | Use database transactions and error handling                          | Integration tests and monitoring         |
| RSK-007 | Product changes between cart and checkout                  | Medium | Medium     | Revalidate product availability and price at checkout                 | Checkout edge-case testing               |
| RSK-008 | Sensitive credentials are exposed                          | High   | Low        | Environment variables, server-side integrations, secret scanning      | Repository/security checks               |
| RSK-009 | Poor mobile checkout experience                            | Medium | Medium     | Mobile-first responsive implementation and device testing             | Responsive QA                            |
| RSK-010 | Email confirmation creates false expectation of delivery   | Medium | Medium     | Clearly distinguish email request/delivery status from order creation | Email failure testing                    |
| RSK-011 | Database provider configuration causes deployment failures | Medium | Medium     | Validate production connection and migrations before release          | Deployment testing                       |
| RSK-012 | Incomplete error handling leaves unclear checkout state    | Medium | Medium     | Define explicit success/failure states and retry behavior             | QA scenario testing                      |

---

## 10. Prisma Data Model

### 10.1 Entity Overview

The MVP requires at minimum:

1. User
2. Product
3. Order
4. OrderItem

A separate persistent Cart entity is not strictly required if cart state is managed client-side until checkout.

Whether cart persistence is required is an open question.

### 10.2 User

Represents an authenticated application user.

| Field     | Type        | Required | Constraints               |
| --------- | ----------- | -------: | ------------------------- |
| id        | UUID/String |      Yes | Primary key               |
| email     | String      |      Yes | Unique                    |
| name      | String      |       No | Nullable                  |
| image     | String      |       No | Nullable                  |
| createdAt | DateTime    |      Yes | Default current timestamp |
| updatedAt | DateTime    |      Yes | Automatically updated     |

**Reason:**
The User entity associates authenticated Google accounts with application-owned data.

### 10.3 Product

Represents a product available in the shop.

| Field       | Type        | Required | Constraints               |
| ----------- | ----------- | -------: | ------------------------- |
| id          | UUID/String |      Yes | Primary key               |
| name        | String      |      Yes | Product name              |
| description | String      |       No | Nullable                  |
| price       | Decimal     |      Yes | Current product price     |
| imageUrl    | String      |       No | Nullable                  |
| isAvailable | Boolean     |      Yes | Default true              |
| createdAt   | DateTime    |      Yes | Default current timestamp |
| updatedAt   | DateTime    |      Yes | Automatically updated     |

**Reason:**
Products are required for the catalog, cart, and checkout flow.

### 10.4 Order

Represents a successfully submitted customer order.

| Field     | Type        | Required | Constraints               |
| --------- | ----------- | -------: | ------------------------- |
| id        | UUID/String |      Yes | Primary key               |
| userId    | UUID/String |      Yes | Foreign key to User       |
| total     | Decimal     |      Yes | Server-calculated         |
| status    | Enum        |      Yes | Defined below             |
| createdAt | DateTime    |      Yes | Default current timestamp |
| updatedAt | DateTime    |      Yes | Automatically updated     |

### Order Status

At minimum:

* `PENDING`
* `CONFIRMED`

The exact order lifecycle remains an open question because the task does not specify fulfillment or payment states.

**Reason:**
The order entity provides the durable record of a checkout submission.

### 10.5 OrderItem

Represents an individual product included in an order.

| Field     | Type        | Required | Constraints                      |
| --------- | ----------- | -------: | -------------------------------- |
| id        | UUID/String |      Yes | Primary key                      |
| orderId   | UUID/String |      Yes | Foreign key to Order             |
| productId | UUID/String |      Yes | Foreign key to Product           |
| quantity  | Integer     |      Yes | Must be greater than zero        |
| unitPrice | Decimal     |      Yes | Price captured at order creation |
| createdAt | DateTime    |      Yes | Default current timestamp        |

**Reason:**
The OrderItem stores the exact product, quantity, and price associated with an order.

Persisting `unitPrice` is necessary so historical orders are not changed when the current product price changes.

### 10.6 Relationships

```text
User
  │
  │ 1:N
  ▼
Order
  │
  │ 1:N
  ▼
OrderItem
  │
  │ N:1
  ▼
Product
```

### 10.7 Relationship Rules

* One User can have many Orders.
* One Order belongs to exactly one User.
* One Order contains one or more OrderItems.
* One OrderItem belongs to exactly one Order.
* One Product can appear in many OrderItems.
* One OrderItem references one Product.

### 10.8 Cascade Behavior

Recommended:

* Deleting a User should remove or anonymize associated personal order information according to the application's data-retention requirements.
* Deleting an Order should delete its OrderItems.
* Products should not be physically deleted if doing so would invalidate historical order references.

**[ADDED ASSUMPTION] AS-001:** Products may need soft deletion/deactivation rather than physical deletion so historical orders remain referentially valid.

### 10.9 Indexes

Recommended indexes include:

* `User.email`
* `Order.userId`
* `Order.createdAt`
* `OrderItem.orderId`
* `OrderItem.productId`

These support authentication lookup, user order retrieval, and relational queries.

### 10.10 Cart Data

A persistent Cart and CartItem model is **not mandatory based on the current task wording**.

**[ADDED ASSUMPTION] AS-002:** MVP cart state may be maintained client-side until checkout unless stakeholder requirements explicitly require carts to survive sessions or devices.

If persistent carts are required, dedicated `Cart` and `CartItem` entities should be introduced.

---

## 11. Success Metrics

The following metrics are measurement definitions rather than established benchmarks.

### MET-001 — Checkout Completion Rate

**Definition:**
Percentage of checkout initiations that result in successful order creation.

**Formula:**

`Successful Orders / Checkout Initiations × 100`

**Measurement method:**
Application analytics and order records.

**Target:**
No target established. A baseline should be collected after launch.

---

### MET-002 — Cart-to-Checkout Rate

**Definition:**
Percentage of shopping sessions with a cart that proceed to checkout.

**Formula:**

`Checkout Initiations / Cart-Created Sessions × 100`

**Measurement method:**
Application analytics.

**Target:**
Starting benchmark to be established after initial usage.

---

### MET-003 — Order Creation Reliability

**Definition:**
Percentage of valid order submissions that result in a persisted order.

**Formula:**

`Successfully Persisted Orders / Valid Order Submission Attempts × 100`

**Measurement method:**
Server logs and database records.

**Target:**
Production target should be defined before launch.

---

### MET-004 — Confirmation Email Success Rate

**Definition:**
Percentage of successfully created orders for which a confirmation email request is successfully accepted by Mailgun.

**Formula:**

`Successful Mailgun Requests / Successfully Created Orders × 100`

**Measurement method:**
Mailgun integration logs.

**Target:**
Starting benchmark to be established after launch.

---

### MET-005 — Authentication Success Rate

**Definition:**
Percentage of Google authentication attempts that result in a valid authenticated session.

**Measurement method:**
Authentication logs.

**Target:**
Baseline after launch.

---

### MET-006 — Task Scope Completion

**Definition:**
Percentage of required MVP functional requirements successfully implemented and verified.

**Formula:**

`Verified MVP Requirements / Total MVP Requirements × 100`

**Measurement method:**
QA requirement traceability.

**Target:**
100% of confirmed MVP requirements before release.

---

### MET-007 — Accessibility Conformance

**Definition:**
Percentage of tested core user journeys meeting defined WCAG 2.2 AA acceptance criteria.

**Measurement method:**
Automated accessibility testing plus manual accessibility testing.

**Target:**
All critical checkout and authentication journeys should meet the defined accessibility acceptance criteria before release.

---

## 12. Assumptions

### Provided Assumptions

The following are directly derived from the task:

* The product is a shop website.
* A checkout page is required.
* Persistent database storage is required.
* PostgreSQL through Supabase or Neon is acceptable.
* Mailgun is required for confirmation emails.
* Google authentication is required.
* Google Cloud Console is used for Google authentication configuration.

### Added Assumptions

#### AS-001 — Product Catalog Exists

**Assumption:**
The MVP will contain a predefined product catalog that can be displayed to users.

**Why:**
A shop cannot provide a meaningful shopping flow without products.

**Product area:**
Catalog.

**Risk if incorrect:**
The product requirements may require an external product source or admin system.

**Validation:**
Confirm the source and management method for products with the stakeholder.

---

#### AS-002 — Cart Can Initially Be Client-Side

**Assumption:**
Cart persistence across sessions/devices is not required unless explicitly specified.

**Why:**
The task requires database persistence but does not explicitly require persistent cart state.

**Product area:**
Cart.

**Risk if incorrect:**
A persistent Cart/CartItem data model would be required.

**Validation:**
Confirm whether users must retain carts after closing or refreshing the browser.

---

#### AS-003 — Checkout Represents Order Submission

**Assumption:**
"Checkout" means collecting the required order information and creating an order; it does not automatically mean payment processing.

**Why:**
No payment provider or payment requirement was included in the task.

**Product area:**
Checkout.

**Risk if incorrect:**
A payment provider, payment state machine, webhook processing, and additional security requirements would be required.

**Validation:**
Confirm whether checkout must include payment.

---

#### AS-004 — Confirmation Email Is Order Confirmation

**Assumption:**
The Mailgun email confirms successful order creation rather than successful payment.

**Why:**
No payment system was specified.

**Product area:**
Email.

**Risk if incorrect:**
Email triggering must instead depend on successful payment confirmation.

**Validation:**
Confirm the exact event that should trigger the email.

---

#### AS-005 — Google Is the Only Required Authentication Provider

**Assumption:**
Google authentication is the only authentication method required for MVP.

**Why:**
Google authentication is explicitly specified, while email/password authentication is not.

**Product area:**
Authentication.

**Risk if incorrect:**
Additional authentication flows would need to be designed and implemented.

**Validation:**
Confirm whether email/password or other providers are also required.

---

#### AS-006 — Basic Product Information Is Sufficient

**Assumption:**
Products require at minimum a name, description, price, image, and availability state.

**Why:**
These fields are necessary to support a basic shop experience.

**Product area:**
Product catalog.

**Risk if incorrect:**
Variants, inventory, SKU, categories, sizes, colors, or other product attributes may need to be modeled.

**Validation:**
Confirm the required product attributes.

---

#### AS-007 — Single Currency

**Assumption:**
The MVP uses one currency.

**Why:**
The task does not specify multi-currency behavior.

**Product area:**
Pricing.

**Risk if incorrect:**
Currency conversion, formatting, storage, and checkout rules would need to be introduced.

**Validation:**
Confirm the currency and market requirements.

---

#### AS-008 — No Admin Interface in MVP

**Assumption:**
The task does not require an administrative product or order management interface.

**Why:**
No admin functionality was specified.

**Product area:**
Operations.

**Risk if incorrect:**
Product and order management requirements will need to be added.

**Validation:**
Confirm who manages products and orders.

---

## 13. Phased Roadmap

### Phase 1: MVP Foundation

**Features:**

* Next.js application foundation.
* TypeScript setup.
* PostgreSQL connection.
* Prisma configuration.
* User data model.
* Product data model.
* Google OAuth configuration.
* Basic responsive application structure.

**Dependencies:**

* Database provider selected.
* Google Cloud OAuth application configured.

**Expected outcome:**

A functioning application foundation with authentication and persistent database connectivity.

**Why this phase:**

Authentication and persistence are foundational dependencies for checkout and order creation.

---

### Phase 2: MVP Completion

**Features:**

* Product catalog.
* Product detail view.
* Cart.
* Cart quantity management.
* Checkout page.
* Server-side checkout validation.
* Order and OrderItem persistence.
* Duplicate submission protection.
* Mailgun confirmation email.
* Order confirmation state.
* Responsive behavior.
* Accessibility validation.
* Error handling.
* Core QA.

**Dependencies:**

* Phase 1 completed.
* Mailgun credentials and sending domain configured.
* Product data available.

**Expected outcome:**

A complete end-to-end shopping flow:

**Browse → Cart → Checkout → Order → Confirmation Email**

**Why this phase:**

These capabilities directly satisfy the defined MVP task.

---

### Phase 3: Post-MVP

Potential features:

* Persistent carts.
* Customer order history.
* Product search.
* Product filtering.
* Product categories.
* Administrative product management.
* Administrative order management.
* Inventory management.
* Additional authentication methods.

These should only be added after confirming the corresponding product requirements.

---

### Phase 4: Future Opportunities

Potential opportunities:

* Payment processing.
* Product reviews.
* Discount codes.
* Promotional campaigns.
* Loyalty functionality.
* Advanced analytics.
* AI-assisted product discovery.
* Multi-currency support.
* Advanced merchant functionality.

These are future opportunities, not MVP commitments.

---

## 14. Open Questions

### Blocking Questions

#### OQ-001 — Is Payment Required?

The task specifies a checkout page but does not specify payment processing.

**Decision required:**
Does checkout create an order without payment, or must the user pay before the order is confirmed?

---

#### OQ-002 — Which Database Provider Should Be Used?

Both Supabase and Neon are mentioned.

**Decision required:**
Which provider should be used for the implementation?

---

#### OQ-003 — What Product Data Must Be Supported?

The task does not specify whether products require:

* Categories
* SKUs
* Inventory
* Variants
* Sizes
* Colors
* Multiple images
* Discounts

**Decision required:**
Define the minimum product data required for MVP.

---

#### OQ-004 — How Are Products Managed?

No product administration workflow is specified.

**Decision required:**
Will products be seeded directly into the database, managed through an admin interface, or supplied through another system?

---

#### OQ-005 — What Information Is Required at Checkout?

The task does not specify the required checkout fields.

**Decision required:**
Define whether checkout requires information such as:

* Name
* Email
* Phone
* Address
* City
* State
* Postal code
* Delivery instructions

---

#### OQ-006 — What Triggers the Confirmation Email?

**Decision required:**
Should Mailgun send the confirmation immediately after order creation, or only after successful payment if payment is introduced?

---

#### OQ-007 — What Is the Order Lifecycle?

The task does not define order statuses.

**Decision required:**
Determine whether the MVP needs statuses beyond basic order creation, such as:

* Pending
* Confirmed
* Processing
* Shipped
* Delivered
* Cancelled

---

### Non-Blocking Questions

#### OQ-008 — Should Cart State Survive Browser Refresh?

The current requirements do not explicitly require persistent carts.

---

#### OQ-009 — Should Users See Previous Orders?

Order persistence does not necessarily imply an order-history UI.

---

#### OQ-010 — What Currency Should Be Displayed?

The currency must be confirmed before final UI and data-formatting implementation.

---

#### OQ-011 — Should Products Be Physically Deleted?

A soft-delete/deactivation approach may better preserve historical order relationships, but this requires stakeholder confirmation.

---

### Future Discovery Questions

#### OQ-012 — Should the Shop Support Multiple Vendors?

No multi-vendor behavior is currently specified.

---

#### OQ-013 — Should Inventory Be Tracked?

Inventory behavior is not currently defined.

---

#### OQ-014 — Should Customers Receive Additional Transactional Emails?

Potential future emails could include:

* Order status changes.
* Shipping notifications.
* Cancellation notifications.
* Refund notifications.

---

#### OQ-015 — Should Payment Be Added Later?

If payment becomes a future requirement, the product will need a separate payment architecture covering:

* Payment provider.
* Payment states.
* Webhooks.
* Failed payments.
* Refunds.
* Order/payment reconciliation.
* Payment security.

---

## Requirement Traceability Summary

The core MVP flow is represented across the requirements as follows:

| Product Capability    | Functional Requirements        | Technical Support                      |
| --------------------- | ------------------------------ | -------------------------------------- |
| Product browsing      | FR-001, FR-002, FR-003         | Product model, PostgreSQL, Prisma      |
| Add to cart           | FR-004                         | Client/application cart state          |
| Modify cart           | FR-005, FR-006, FR-007         | Server-side price validation           |
| Google authentication | FR-008, FR-009                 | Google OAuth, Google Cloud Console     |
| Checkout              | FR-010, FR-011                 | Next.js, server validation             |
| Order creation        | FR-012, FR-013, FR-014, FR-015 | Prisma transaction, PostgreSQL         |
| Confirmation email    | FR-016, FR-017                 | Mailgun server-side integration        |
| Confirmation UI       | FR-018                         | Next.js                                |
| Responsive shop       | FR-019                         | Mobile-first responsive implementation |
| Accessibility         | FR-020                         | WCAG 2.2 AA                            |
| Error handling        | FR-021                         | Application/server error handling      |

### MVP End-to-End Acceptance Flow

A release candidate satisfies the core product requirement when a user can:

1. Open the shop.
2. View available products.
3. Open a product.
4. Add the product to the cart.
5. Change the quantity.
6. Remove an item if needed.
7. Proceed to checkout.
8. Authenticate with Google.
9. Submit valid checkout information.
10. Have the server validate the request.
11. Have the server calculate the authoritative order total.
12. Have the order and order items persist successfully in PostgreSQL.
13. Receive an order confirmation state.
14. Trigger a confirmation email through Mailgun.
15. Remain unable to access another user's protected order information.
16. Complete the flow on mobile, tablet, and desktop.

This flow represents the core MVP scope. Payment processing, admin functionality, inventory management, AI, and other future capabilities must not be introduced into the MVP unless the open questions are explicitly resolved and the requirements are updated.
