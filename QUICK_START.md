# Quick Start Guide - Black Therapy Stripe Integration

## ✅ What's Been Done

All code has been implemented and dependencies installed! You just need to configure your API keys.

## 🚀 Next Steps (5-10 minutes)

### 1. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 2. Create Stripe Products

1. Go to [Stripe Products](https://dashboard.stripe.com/test/products)
2. Click **+ Add product**

**Monthly Plan:**

- Name: "Monthly Subscription"
- Price: $25.00
- Billing: Monthly
- Copy the **Price ID** (starts with `price_`)

**Annual Plan:**

- Name: "Annual Subscription"
- Price: $300.00
- Billing: Yearly
- Copy the **Price ID**

### 3. Set Up Environment Variables

**Frontend (.env in root directory):**

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000
```

**Backend (server/.env):**

```env
PORT=5000
NODE_ENV=development

# From step 1
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# From step 2
STRIPE_MONTHLY_PRICE_ID=price_YOUR_MONTHLY_ID
STRIPE_ANNUAL_PRICE_ID=price_YOUR_ANNUAL_ID

FRONTEND_URL=http://localhost:3000

# Firebase Admin (from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### 4. Set Up Webhooks (Local Testing)

**Option A: Stripe CLI (Recommended)**

```bash
# Install: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:5000/webhooks/stripe
# Copy the webhook secret (whsec_xxx) to server/.env as STRIPE_WEBHOOK_SECRET
```

**Option B: Manual (for testing only)**
Use a temporary webhook secret for local testing:

```env
STRIPE_WEBHOOK_SECRET=whsec_test_secret
```

### 5. Start the Application

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

✅ Server running on http://localhost:5000

**Terminal 2 - Frontend:**

```bash
npm start
```

✅ App running on http://localhost:3000

## 🧪 Test the Integration

### Test Cards (from Stripe)

- **Success**: `4242 4242 4242 4242`
- **Requires 3D Secure**: `4000 0025 0000 3155`
- **Declined**: `4000 0000 0000 9995`

Use any future date, any CVC, any ZIP code.

### Test Flow

1. Sign in to your app
2. Navigate to subscription page
3. Select a plan (Monthly or Annual)
4. Click "Continue to Checkout"
5. Enter test card: `4242 4242 4242 4242`
6. Complete checkout
7. ✅ You should be redirected to success page
8. ✅ Check subscription status in your profile

## 📁 Project Structure

```
black_therapy/
├── server/                      # Node.js Backend
│   ├── config/                  # Configuration files
│   ├── middleware/              # Authentication middleware
│   ├── routes/                  # API routes
│   │   ├── stripe.js           # Stripe endpoints
│   │   └── webhooks.js         # Webhook handlers
│   ├── server.js               # Main server file
│   └── .env                    # Backend environment variables
│
├── src/
│   ├── Components/
│   │   ├── SubscriptionModal/  # Updated with Stripe
│   │   └── SubscriptionStatus/ # New: Show subscription status
│   ├── Pages/
│   │   ├── SubscriptionSuccess/    # New: Success page
│   │   └── SubscriptionCancelled/  # New: Cancelled page
│   └── services/
│       └── stripeService.ts    # Stripe integration service
│
└── .env                        # Frontend environment variables
```

## 🔧 Available API Endpoints

### Stripe Routes (require authentication)

- `POST /api/stripe/create-checkout-session` - Create checkout
- `POST /api/stripe/create-portal-session` - Manage subscription
- `GET /api/stripe/subscription-status` - Get status
- `GET /api/stripe/config` - Get public config

### Webhook

- `POST /webhooks/stripe` - Stripe events

## 📚 Documentation

- **[STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)** - Complete setup guide
- **[server/README.md](server/README.md)** - API documentation
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What was built

## ❓ Common Issues

**"Webhook signature verification failed"**
→ Make sure you're running `stripe listen` or have the correct webhook secret

**"User not authenticated"**  
→ Make sure you're logged in with Firebase Auth

**"Failed to create checkout session"**
→ Check that all environment variables are set correctly

**CORS errors**
→ Verify `FRONTEND_URL` in backend .env matches your frontend URL

## 💡 Tips

1. **Use test mode** - All test keys start with `_test_`
2. **Check logs** - Server console shows helpful error messages
3. **Stripe Dashboard** - Monitor payments and webhooks in real-time
4. **Firebase Console** - Verify subscription data is saved

## 🎉 You're Ready!

Once you've completed steps 1-5, your Stripe integration is live!

Need help? Check the full [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

**Happy coding! 🚀**
