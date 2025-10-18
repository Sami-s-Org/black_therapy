const express = require('express')
const router = express.Router()
const stripe = require('../config/stripe')
const { verifyAuth } = require('../middleware/auth')
const { getFirestore } = require('../config/firebase')

/**
 * Create Stripe Checkout Session
 */
router.post('/create-checkout-session', verifyAuth, async (req, res) => {
  try {
    const { priceId, planType, userRole } = req.body
    const userId = req.user.uid
    const userEmail = req.user.email

    if (!priceId || !planType) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'priceId and planType are required',
      })
    }

    // Get or create Stripe customer
    const db = getFirestore()
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()

    let customerId

    if (userDoc.exists && userDoc.data().stripeCustomerId) {
      customerId = userDoc.data().stripeCustomerId
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          firebaseUID: userId,
          userRole: userRole || 'user',
        },
      })
      customerId = customer.id

      // Save customer ID to Firestore
      await userRef.set(
        {
          stripeCustomerId: customerId,
        },
        { merge: true }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      success_url: `${process.env.FRONTEND_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription-cancelled`,
      metadata: {
        userId: userId,
        planType: planType,
        userRole: userRole || 'user',
      },
      subscription_data: {
        metadata: {
          userId: userId,
          planType: planType,
          userRole: userRole || 'user',
        },
      },
    })

    res.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * Create Customer Portal Session
 */
router.post('/create-portal-session', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid

    const db = getFirestore()
    const userDoc = await db.collection('users').doc(userId).get()

    if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
      return res.status(404).json({
        error: 'Customer not found',
        message: 'No Stripe customer found for this user',
      })
    }

    const customerId = userDoc.data().stripeCustomerId

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/my-profile`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * Get Subscription Status
 */
router.get('/subscription-status', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid

    const db = getFirestore()
    const userDoc = await db.collection('users').doc(userId).get()

    if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
      return res.json({
        hasSubscription: false,
        status: 'none',
      })
    }

    const customerId = userDoc.data().stripeCustomerId

    // Get customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      return res.json({
        hasSubscription: false,
        status: 'none',
      })
    }

    const subscription = subscriptions.data[0]

    res.json({
      hasSubscription: subscription.status === 'active' || subscription.status === 'trialing',
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      planType: subscription.metadata?.planType || 'unknown',
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    })
  }
})

/**
 * Get Stripe Config (publishable key and price IDs)
 */
router.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    prices: {
      monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
      annual: process.env.STRIPE_ANNUAL_PRICE_ID,
    },
  })
})

module.exports = router
