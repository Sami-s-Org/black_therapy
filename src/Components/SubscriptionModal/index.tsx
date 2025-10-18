import React, { useState } from 'react'
import styles from './subscription.module.css'
import { FiCheck, FiCopy, FiCheckCircle } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { notifySuccess, notifyError } from '../Toast'
import { redirectToCheckout } from '../../services/stripeService'

type SubscriptionModalProps = {
  closeModal: () => void
  userRole: 'coach' | 'therapist' | 'user'
  userName?: string
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ closeModal, userRole }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null)
  const [couponCopied, setCouponCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const couponCode = 'FIRST2FREE'
  const monthlyPrice = 25
  const annualPrice = 300

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode)
    setCouponCopied(true)
    notifySuccess('Coupon code copied!')
    setTimeout(() => setCouponCopied(false), 3000)
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      notifyError('Please select a subscription plan')
      return
    }

    setIsProcessing(true)

    try {
      notifySuccess('Redirecting to secure checkout...')

      // Redirect to Stripe Checkout
      await redirectToCheckout(selectedPlan, userRole)
    } catch (error) {
      console.error('Error processing subscription:', error)
      notifyError('Failed to process subscription. Please try again.')
      setIsProcessing(false)
    }
  }

  const getRoleTitle = () => {
    if (userRole === 'coach') return 'Coach'
    if (userRole === 'therapist') return 'Therapist'
    return 'User'
  }

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
          <MdClose />
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>Choose Your Subscription</h1>
          <p className={styles.subtitle}>Unlock premium features as a {getRoleTitle()}</p>
        </div>

        {/* Coupon Banner */}
        <div className={styles.couponBanner}>
          <div className={styles.couponIcon}>
            <FiCheckCircle />
          </div>
          <div className={styles.couponContent}>
            <h3 className={styles.couponTitle}>🎉 Special Offer!</h3>
            <p className={styles.couponText}>Get your first 2 months FREE with code:</p>
            <div className={styles.couponCodeContainer}>
              <code className={styles.couponCode}>{couponCode}</code>
              <button className={styles.copyButton} onClick={handleCopyCoupon} aria-label="Copy coupon code">
                {couponCopied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className={styles.plansContainer}>
          {/* Monthly Plan */}
          <div
            className={`${styles.planCard} ${selectedPlan === 'monthly' ? styles.selected : ''}`}
            onClick={() => setSelectedPlan('monthly')}
          >
            {selectedPlan === 'monthly' && (
              <div className={styles.selectedBadge}>
                <FiCheck />
              </div>
            )}
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>Monthly</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{monthlyPrice}</span>
                <span className={styles.period}>/month</span>
              </div>
            </div>
            <div className={styles.planFeatures}>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Full platform access</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Unlimited appointments</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Priority support</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Analytics dashboard</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Annual Plan */}
          <div
            className={`${styles.planCard} ${styles.popularPlan} ${selectedPlan === 'annual' ? styles.selected : ''}`}
            onClick={() => setSelectedPlan('annual')}
          >
            <div className={styles.popularBadge}>Most Popular</div>
            {selectedPlan === 'annual' && (
              <div className={styles.selectedBadge}>
                <FiCheck />
              </div>
            )}
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>Annual</h3>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{annualPrice}</span>
                <span className={styles.period}>/year</span>
              </div>
              <p className={styles.savingsText}>Save $60/year</p>
            </div>
            <div className={styles.planFeatures}>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Everything in Monthly</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>2 months FREE</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Advanced analytics</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Premium support</span>
              </div>
              <div className={styles.feature}>
                <FiCheck className={styles.featureIcon} />
                <span>Early access to features</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.subscribeButton} onClick={handleSubscribe} disabled={!selectedPlan || isProcessing}>
            {isProcessing ? 'Processing...' : 'Continue to Checkout'}
          </button>
          <p className={styles.disclaimer}>Secure payment powered by Stripe. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionModal
