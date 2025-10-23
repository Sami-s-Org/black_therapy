import { loadStripe, Stripe } from '@stripe/stripe-js'
import { auth } from '../Share/FireBase'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002'

let stripePromise: Promise<Stripe | null>
let stripeConfig: {
  publishableKey: string
  prices: {
    monthly: string
    annual: string
  }
} | null = null

/**
 * Get Stripe configuration from backend
 */
export const getStripeConfig = async () => {
  if (stripeConfig) {
    return stripeConfig
  }

  try {
    const response = await fetch(`${API_URL}/api/stripe/config`)
    if (!response.ok) {
      throw new Error('Failed to fetch Stripe configuration')
    }
    stripeConfig = await response.json()
    return stripeConfig
  } catch (error) {
    console.error('Error fetching Stripe config:', error)
    throw error
  }
}

/**
 * Initialize Stripe
 */
export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const config = await getStripeConfig()
    if (!config) {
      throw new Error('Failed to load Stripe configuration')
    }
    stripePromise = loadStripe(config.publishableKey)
  }
  return stripePromise
}

/**
 * Get Firebase ID token for authenticated requests
 */
const getAuthToken = async (): Promise<string> => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User not authenticated')
  }
  return await user.getIdToken()
}

/**
 * Create a Stripe checkout session
 */
export const createCheckoutSession = async (
  planType: 'monthly' | 'annual',
  userRole: 'coach' | 'therapist' | 'user'
): Promise<{ sessionId: string; url: string }> => {
  try {
    const config = await getStripeConfig()
    if (!config) {
      throw new Error('Failed to load Stripe configuration')
    }
    const priceId = planType === 'monthly' ? config.prices.monthly : config.prices.annual
    const token = await getAuthToken()

    const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        priceId,
        planType,
        userRole,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create checkout session')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

/**
 * Redirect to Stripe checkout
 */
export const redirectToCheckout = async (
  planType: 'monthly' | 'annual',
  userRole: 'coach' | 'therapist' | 'user'
): Promise<void> => {
  try {
    const { url } = await createCheckoutSession(planType, userRole)
    window.location.href = url
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

/**
 * Create a customer portal session
 */
export const createPortalSession = async (): Promise<{ url: string }> => {
  try {
    const token = await getAuthToken()

    const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create portal session')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

/**
 * Redirect to customer portal
 */
export const redirectToCustomerPortal = async (): Promise<void> => {
  try {
    const { url } = await createPortalSession()
    window.location.href = url
  } catch (error) {
    console.error('Error redirecting to customer portal:', error)
    throw error
  }
}

/**
 * Get subscription status
 */
export const getSubscriptionStatus = async () => {
  try {
    const token = await getAuthToken()

    const response = await fetch(`${API_URL}/api/stripe/subscription-status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch subscription status')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    throw error
  }
}

const stripeService = {
  getStripe,
  getStripeConfig,
  createCheckoutSession,
  redirectToCheckout,
  createPortalSession,
  redirectToCustomerPortal,
  getSubscriptionStatus,
}

export default stripeService
