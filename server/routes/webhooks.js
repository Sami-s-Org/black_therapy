const express = require('express')
const router = express.Router()
const stripe = require('../config/stripe')
const { getFirestore } = require('../config/firebase')

/**
 * Stripe Webhook Handler
 * This endpoint receives events from Stripe
 */
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook event:', error)
    res.status(500).json({ error: 'Webhook handler failed' })
  }
})

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session) {
  console.log('Checkout session completed:', session.id)

  const userId = session.metadata?.userId
  const customerId = session.customer

  if (!userId) {
    console.error('No userId in session metadata')
    return
  }

  const db = getFirestore()
  const userRef = db.collection('users').doc(userId)

  await userRef.set(
    {
      stripeCustomerId: customerId,
      subscriptionStatus: 'active',
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  // Log the successful checkout
  await db.collection('subscription_events').add({
    type: 'checkout_completed',
    userId: userId,
    sessionId: session.id,
    customerId: customerId,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription) {
  console.log('Subscription created:', subscription.id)

  const customerId = subscription.customer
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  const db = getFirestore()
  const userRef = db.collection('users').doc(userId)

  await userRef.set(
    {
      subscription: {
        id: subscription.id,
        status: subscription.status,
        planType: subscription.metadata?.planType || 'unknown',
        currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        createdAt: new Date(subscription.created * 1000).toISOString(),
      },
      subscriptionStatus: subscription.status,
      isPremium: subscription.status === 'active' || subscription.status === 'trialing',
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  // Log the event
  await db.collection('subscription_events').add({
    type: 'subscription_created',
    userId: userId,
    subscriptionId: subscription.id,
    status: subscription.status,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription) {
  console.log('Subscription updated:', subscription.id)

  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  const db = getFirestore()
  const userRef = db.collection('users').doc(userId)

  await userRef.set(
    {
      subscription: {
        id: subscription.id,
        status: subscription.status,
        planType: subscription.metadata?.planType || 'unknown',
        currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      subscriptionStatus: subscription.status,
      isPremium: subscription.status === 'active' || subscription.status === 'trialing',
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  // Log the event
  await db.collection('subscription_events').add({
    type: 'subscription_updated',
    userId: userId,
    subscriptionId: subscription.id,
    status: subscription.status,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Handle subscription deleted/cancelled
 */
async function handleSubscriptionDeleted(subscription) {
  console.log('Subscription deleted:', subscription.id)

  const userId = subscription.metadata?.userId

  if (!userId) {
    console.error('No userId in subscription metadata')
    return
  }

  const db = getFirestore()
  const userRef = db.collection('users').doc(userId)

  await userRef.set(
    {
      subscription: {
        id: subscription.id,
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
      },
      subscriptionStatus: 'cancelled',
      isPremium: false,
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  )

  // Log the event
  await db.collection('subscription_events').add({
    type: 'subscription_deleted',
    userId: userId,
    subscriptionId: subscription.id,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Handle successful payment
 */
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Invoice payment succeeded:', invoice.id)

  const customerId = invoice.customer
  const subscriptionId = invoice.subscription

  // Log the payment
  const db = getFirestore()
  await db.collection('payments').add({
    type: 'payment_succeeded',
    invoiceId: invoice.id,
    customerId: customerId,
    subscriptionId: subscriptionId,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Handle failed payment
 */
async function handleInvoicePaymentFailed(invoice) {
  console.log('Invoice payment failed:', invoice.id)

  const customerId = invoice.customer
  const subscriptionId = invoice.subscription

  // Log the failed payment
  const db = getFirestore()
  await db.collection('payments').add({
    type: 'payment_failed',
    invoiceId: invoice.id,
    customerId: customerId,
    subscriptionId: subscriptionId,
    amount: invoice.amount_due,
    currency: invoice.currency,
    timestamp: new Date().toISOString(),
  })

  // You might want to send an email notification to the user here
  // or update their subscription status
}

module.exports = router
