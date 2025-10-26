import React, { useEffect, useState } from 'react'
import styles from './subscriptionStatus.module.css'
import { FiCheck, FiCreditCard, FiAlertCircle } from 'react-icons/fi'
import { getSubscriptionStatus, redirectToCustomerPortal } from '../../services/stripeService'
import { notifyError } from '../Toast'

interface SubscriptionData {
  hasSubscription: boolean
  status: string
  currentPeriodEnd?: number
  cancelAtPeriodEnd?: boolean
  planType?: string
  subscription?: {
    id: string
    status: string
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelAtPeriodEnd: boolean
  }
}

interface SubscriptionStatusProps {
  onSubscribeClick?: () => void
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ onSubscribeClick }) => {
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [managingSubscription, setManagingSubscription] = useState(false)

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [])

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true)
      const data = await getSubscriptionStatus()
      setSubscription(data)
    } catch (error) {
      console.error('Error fetching subscription:', error)
      notifyError('Failed to load subscription status')
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setManagingSubscription(true)
      await redirectToCustomerPortal()
    } catch (error) {
      console.error('Error opening customer portal:', error)
      notifyError('Failed to open subscription management')
      setManagingSubscription(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading subscription status...</p>
      </div>
    )
  }

  if (!subscription?.hasSubscription) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <FiAlertCircle className={styles.headerIcon} />
              <div>
                <h2 className={styles.title}>No Active Subscription</h2>
                <span className={`${styles.statusBadge} ${styles.statusInactive}`}>Inactive</span>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue}>Not subscribed</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Profile Visibility</span>
              <span className={styles.detailValue}>Hidden from patients</span>
            </div>
          </div>

          <div className={styles.benefits}>
            <h3 className={styles.benefitsTitle}>Subscribe to Unlock</h3>
            <ul className={styles.benefitsList}>
              <li>
                <FiCheck className={styles.checkIcon} />
                <span>Make your profile visible to patients</span>
              </li>
              <li>
                <FiCheck className={styles.checkIcon} />
                <span>Unlimited appointments</span>
              </li>
              <li>
                <FiCheck className={styles.checkIcon} />
                <span>Priority support</span>
              </li>
              <li>
                <FiCheck className={styles.checkIcon} />
                <span>Analytics dashboard</span>
              </li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button className={styles.manageButton} onClick={onSubscribeClick}>
              Get Subscription
            </button>
            <p className={styles.manageNote}>
              Subscribe to make your profile visible to patients and unlock premium features
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive
      case 'trialing':
        return styles.statusTrialing
      case 'past_due':
        return styles.statusPastDue
      case 'canceled':
      case 'cancelled':
        return styles.statusCanceled
      default:
        return styles.statusDefault
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <FiCreditCard className={styles.headerIcon} />
            <div>
              <h2 className={styles.title}>Subscription Status</h2>
              <span className={`${styles.statusBadge} ${getStatusColor(subscription.status)}`}>
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Plan Type</span>
            <span className={styles.detailValue}>{subscription.planType === 'monthly' ? 'Monthly' : 'Annual'}</span>
          </div>

          {subscription.currentPeriodEnd && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                {subscription.cancelAtPeriodEnd ? 'Subscription ends on' : 'Next billing date'}
              </span>
              <span className={styles.detailValue}>{formatDate(subscription.currentPeriodEnd)}</span>
            </div>
          )}

          {subscription.cancelAtPeriodEnd && (
            <div className={styles.warningBox}>
              <FiAlertCircle />
              <span>Your subscription will be cancelled at the end of the current period.</span>
            </div>
          )}
        </div>

        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>Active Benefits</h3>
          <ul className={styles.benefitsList}>
            <li>
              <FiCheck className={styles.checkIcon} />
              <span>Full platform access</span>
            </li>
            <li>
              <FiCheck className={styles.checkIcon} />
              <span>Unlimited appointments</span>
            </li>
            <li>
              <FiCheck className={styles.checkIcon} />
              <span>Priority support</span>
            </li>
            <li>
              <FiCheck className={styles.checkIcon} />
              <span>Analytics dashboard</span>
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button className={styles.manageButton} onClick={handleManageSubscription} disabled={managingSubscription}>
            {managingSubscription ? 'Opening Portal...' : 'Manage Subscription'}
          </button>
          <p className={styles.manageNote}>Update payment method, view invoices, or cancel your subscription</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionStatus
