# Black Therapy Backend Server

Node.js backend server with Stripe integration for the Black Therapy platform.

## Features

- **Stripe Integration**: Complete payment processing with Stripe
- **Subscription Management**: Handle monthly and annual subscriptions
- **Webhook Handling**: Process Stripe events automatically
- **Firebase Integration**: Sync subscription data with Firebase
- **Authentication**: Secure endpoints with Firebase Auth

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs
STRIPE_MONTHLY_PRICE_ID=price_monthly_id_here
STRIPE_ANNUAL_PRICE_ID=price_annual_id_here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

### 3. Get Stripe Credentials

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers > API keys
3. Create products and prices in Products section
4. Copy the price IDs for monthly and annual plans
5. Set up webhook endpoint in Developers > Webhooks

### 4. Set Up Stripe Webhooks

1. In Stripe Dashboard, go to Developers > Webhooks
2. Click "Add endpoint"
3. Set URL to: `https://your-domain.com/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to your `.env` file

### 5. Firebase Admin SDK Setup

Option 1: Using Service Account File (Recommended)

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file in `server/config/serviceAccountKey.json`
4. Update `config/firebase.js` to use the file (commented code example provided)

Option 2: Using Environment Variables

1. Add the credentials to your `.env` file as shown above

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Stripe Routes

#### POST `/api/stripe/create-checkout-session`

Create a new Stripe checkout session for subscription.

**Headers:**

- `Authorization: Bearer <firebase-token>`

**Body:**

```json
{
  "priceId": "price_xxx",
  "planType": "monthly" | "annual",
  "userRole": "coach" | "therapist" | "user"
}
```

**Response:**

```json
{
  "sessionId": "cs_xxx",
  "url": "https://checkout.stripe.com/xxx"
}
```

#### POST `/api/stripe/create-portal-session`

Create a customer portal session for managing subscriptions.

**Headers:**

- `Authorization: Bearer <firebase-token>`

**Response:**

```json
{
  "url": "https://billing.stripe.com/xxx"
}
```

#### GET `/api/stripe/subscription-status`

Get current subscription status for authenticated user.

**Headers:**

- `Authorization: Bearer <firebase-token>`

**Response:**

```json
{
  "hasSubscription": true,
  "status": "active",
  "currentPeriodEnd": 1234567890,
  "cancelAtPeriodEnd": false,
  "planType": "monthly",
  "subscription": {
    "id": "sub_xxx",
    "status": "active",
    "currentPeriodStart": 1234567890,
    "currentPeriodEnd": 1234567890,
    "cancelAtPeriodEnd": false
  }
}
```

#### GET `/api/stripe/config`

Get Stripe publishable key and price IDs.

**Response:**

```json
{
  "publishableKey": "pk_test_xxx",
  "prices": {
    "monthly": "price_xxx",
    "annual": "price_xxx"
  }
}
```

### Webhook Routes

#### POST `/webhooks/stripe`

Stripe webhook endpoint for processing subscription events.

**Note:** This endpoint expects raw body and Stripe signature header.

## Testing Webhooks Locally

Use Stripe CLI to forward webhooks to your local server:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks
stripe listen --forward-to localhost:5000/webhooks/stripe

# Copy the webhook signing secret to your .env file
```

## Deployment

### Environment Variables

Make sure to set all environment variables in your production environment.

### Security Considerations

1. Never commit `.env` file or credentials to version control
2. Use HTTPS in production
3. Validate webhook signatures
4. Implement rate limiting
5. Use Firebase Security Rules to protect user data

## Troubleshooting

### Webhook Signature Verification Failed

- Make sure you're using the correct webhook secret
- Ensure the webhook endpoint receives raw body (not parsed JSON)

### Firebase Authentication Failed

- Verify Firebase credentials are correct
- Check that Firebase Admin SDK is properly initialized
- Ensure the private key format is correct (replace `\n` with actual newlines)

### Stripe API Errors

- Check that you're using test keys in development
- Verify price IDs are correct
- Ensure customer ID exists before creating portal sessions

## Support

For issues and questions, please contact the development team.
