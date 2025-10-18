# Stripe Integration Setup Guide

This guide will walk you through setting up the complete Node.js backend with Stripe integration for the Black Therapy platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Stripe Configuration](#stripe-configuration)
4. [Frontend Setup](#frontend-setup)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, make sure you have:

- Node.js (v16 or higher) installed
- npm or yarn package manager
- A Stripe account (create one at [stripe.com](https://stripe.com))
- Firebase project with Firestore enabled
- Firebase Admin SDK credentials

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This will install:

- `express` - Web framework
- `stripe` - Stripe SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `body-parser` - Request body parsing
- `firebase-admin` - Firebase Admin SDK
- `nodemon` - Development auto-reload (dev dependency)

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following variables (replace with your actual values):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (create these in Stripe Dashboard)
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id
STRIPE_ANNUAL_PRICE_ID=price_your_annual_price_id

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

### 3. Firebase Admin SDK Setup

**Option 1: Using Service Account File (Recommended)**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Click "Generate new private key"
5. Save the JSON file as `server/config/serviceAccountKey.json`
6. Update `server/config/firebase.js` to use the service account file (code is already commented in the file)

**Option 2: Using Environment Variables**

Add the credentials from the service account JSON to your `.env` file:

- `FIREBASE_PROJECT_ID`: The project ID
- `FIREBASE_PRIVATE_KEY`: The private key (keep the `\n` characters)
- `FIREBASE_CLIENT_EMAIL`: The client email

### 4. Start the Backend Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Stripe Configuration

### 1. Get Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to Developers → API keys
3. Copy your **Publishable key** and **Secret key**
4. For testing, use the keys that start with `pk_test_` and `sk_test_`
5. Add these to your `.env` files (both backend and frontend)

### 2. Create Products and Prices

1. In Stripe Dashboard, go to **Products**
2. Click **+ Add product**
3. Create two products:

**Monthly Subscription:**

- Name: "Monthly Subscription"
- Description: "Monthly access to Black Therapy platform"
- Price: $25/month
- Billing period: Monthly
- Copy the **Price ID** (starts with `price_`) to your `.env` as `STRIPE_MONTHLY_PRICE_ID`

**Annual Subscription:**

- Name: "Annual Subscription"
- Description: "Annual access to Black Therapy platform"
- Price: $300/year
- Billing period: Yearly
- Copy the **Price ID** to your `.env` as `STRIPE_ANNUAL_PRICE_ID`

### 3. Create Coupon Code (Optional)

1. In Stripe Dashboard, go to **Products → Coupons**
2. Click **+ New**
3. Create a coupon:
   - Name: "FIRST2FREE"
   - Type: Duration
   - Duration: Repeating
   - Duration in months: 2
   - Discount: 100% off
4. Customers can apply this code at checkout

### 4. Set Up Webhooks

Webhooks allow Stripe to notify your server about important events.

**For Local Development (using Stripe CLI):**

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to Stripe:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:5000/webhooks/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_`) to your `.env` as `STRIPE_WEBHOOK_SECRET`

**For Production:**

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **+ Add endpoint**
3. Enter your endpoint URL: `https://your-domain.com/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret to your production `.env` file

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
# In the root directory
npm install
```

This will install the new dependencies:

- `@stripe/stripe-js` - Stripe.js library

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend API URL
REACT_APP_API_URL=http://localhost:5000

# Google Maps API Key (if you're using it)
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Start the Frontend

```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## Testing

### 1. Test Stripe Integration

**Test Card Numbers:**

Stripe provides test cards for different scenarios:

- **Success**: `4242 4242 4242 4242`
- **Requires authentication**: `4000 0025 0000 3155`
- **Card declined**: `4000 0000 0000 9995`

Use any future expiration date, any 3-digit CVC, and any ZIP code.

### 2. Test Subscription Flow

1. Sign in to your app
2. Navigate to the subscription modal
3. Select a plan (monthly or annual)
4. Click "Continue to Checkout"
5. Use test card: `4242 4242 4242 4242`
6. Complete the checkout
7. Verify you're redirected to the success page
8. Check that subscription is active in your profile

### 3. Test Webhooks

1. Make sure Stripe CLI is forwarding webhooks (see above)
2. Complete a test subscription
3. Check your server console for webhook events
4. Verify data is saved in Firestore:
   - Go to Firebase Console → Firestore
   - Check the `users` collection for subscription data
   - Check the `subscription_events` collection for event logs

### 4. Test Customer Portal

1. With an active subscription, go to your profile
2. Click "Manage Subscription"
3. Verify you can:
   - Update payment method
   - View invoices
   - Cancel subscription
   - Reactivate subscription

## Deployment

### Backend Deployment

You can deploy the Node.js backend to various platforms:

**Option 1: Heroku**

```bash
cd server
heroku create your-app-name
heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_xxx
# ... set all other environment variables
git push heroku main
```

**Option 2: Google Cloud Functions**

The backend can be adapted to run as Cloud Functions. You would need to:

1. Convert routes to individual functions
2. Deploy using `firebase deploy --only functions`

**Option 3: AWS, DigitalOcean, or any VPS**

1. Set up a Node.js environment
2. Clone your repository
3. Set environment variables
4. Use PM2 or similar to keep the server running
5. Set up nginx as a reverse proxy
6. Configure SSL certificate

### Frontend Deployment

Update your `.env` file with production values:

```env
REACT_APP_API_URL=https://your-backend-domain.com
```

Build the app:

```bash
npm run build
```

Deploy the `build` folder to:

- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront
- Or any static hosting service

### Important: Update Stripe Webhooks

After deployment, update your Stripe webhook endpoint URL in the Stripe Dashboard to point to your production backend:

```
https://your-backend-domain.com/webhooks/stripe
```

## Troubleshooting

### Common Issues

**1. "Webhook signature verification failed"**

- Make sure you're using the correct webhook secret
- Verify the webhook endpoint receives raw body (not parsed JSON)
- Check that the Stripe CLI is running for local development

**2. "User not authenticated" error**

- Ensure Firebase Auth is working correctly
- Verify the Firebase ID token is being sent in the Authorization header
- Check that Firebase Admin SDK is properly initialized

**3. "Failed to create checkout session"**

- Verify Stripe API keys are correct
- Check that price IDs exist in your Stripe account
- Ensure the backend is running and accessible

**4. Subscription not updating in Firestore**

- Check webhook events are being received (Stripe Dashboard → Webhooks)
- Verify webhook signing secret is correct
- Check server logs for errors in webhook handler
- Ensure metadata includes `userId` in checkout session

**5. CORS errors**

- Update CORS configuration in `server/server.js`
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Logs and Debugging

**Backend Logs:**

- Check server console for errors
- Enable verbose logging in development

**Stripe Logs:**

- Go to Stripe Dashboard → Developers → Logs
- View API requests and webhooks
- Check for failed requests

**Firebase Logs:**

- Go to Firebase Console → Firestore
- Verify data is being written correctly
- Check Firebase Rules if writes are failing

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use test keys** in development, live keys only in production
3. **Validate webhook signatures** (already implemented)
4. **Use HTTPS** in production
5. **Implement rate limiting** for API endpoints
6. **Keep dependencies updated** regularly
7. **Review Firebase Security Rules** for Firestore

## Support

For issues or questions:

- Stripe Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Firebase Documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Create an issue in your repository

## Next Steps

After setup is complete, you might want to:

1. Customize email templates in Stripe Dashboard
2. Set up custom branding in Stripe Checkout
3. Implement analytics tracking
4. Add more subscription tiers
5. Set up automated testing
6. Configure monitoring and alerts
7. Implement subscription analytics dashboard

---

**Congratulations! Your Stripe integration is now complete.** 🎉
