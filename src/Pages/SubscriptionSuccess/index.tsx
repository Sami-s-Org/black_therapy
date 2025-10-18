import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import styles from './subscriptionSuccess.module.css'
import { getSubscriptionStatus } from '../../services/stripeService'

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [subscriptionData, setSubscriptionData] = useState<any>(null)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        // Wait a moment for webhook to process
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const status = await getSubscriptionStatus()
        setSubscriptionData(status)
        setIsVerifying(false)
      } catch (error) {
        console.error('Error verifying subscription:', error)
        setIsVerifying(false)
      }
    }

    verifySubscription()
  }, [sessionId])

  const handleContinue = () => {
    navigate('/my-profile')
  }

  if (isVerifying) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.spinner}></div>
          <h2 className={styles.title}>Verifying your subscription...</h2>
          <p className={styles.subtitle}>Please wait while we confirm your payment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <FiCheckCircle className={styles.successIcon} />
        </div>

        <h1 className={styles.title}>Subscription Successful! 🎉</h1>
        <p className={styles.subtitle}>
          Thank you for subscribing to Black Therapy. Your premium access is now active.
        </p>

        {subscriptionData && subscriptionData.hasSubscription && (
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Status:</span>
              <span className={styles.value}>{subscriptionData.status}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Plan:</span>
              <span className={styles.value}>{subscriptionData.planType === 'monthly' ? 'Monthly' : 'Annual'}</span>
            </div>
            {subscriptionData.currentPeriodEnd && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Next billing date:</span>
                <span className={styles.value}>
                  {new Date(subscriptionData.currentPeriodEnd * 1000).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>What's included:</h3>
          <ul className={styles.benefitsList}>
            <li>✓ Full platform access</li>
            <li>✓ Unlimited appointments</li>
            <li>✓ Priority support</li>
            <li>✓ Analytics dashboard</li>
            <li>✓ Early access to new features</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleContinue}>
            Go to My Profile
          </button>
          <button className={styles.secondaryButton} onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>

        <p className={styles.note}>A confirmation email has been sent to your registered email address.</p>
      </div>
    </div>
  )
}

export default SubscriptionSuccess
