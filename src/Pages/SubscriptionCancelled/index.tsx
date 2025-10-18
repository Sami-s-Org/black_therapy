import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiArrowLeft } from 'react-icons/fi'
import styles from './subscriptionCancelled.module.css'

const SubscriptionCancelled: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <MdClose className={styles.cancelIcon} />
        </div>

        <h1 className={styles.title}>Subscription Cancelled</h1>
        <p className={styles.subtitle}>
          You have cancelled the subscription process. No charges have been made to your account.
        </p>

        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>Why subscribe?</h3>
          <ul className={styles.benefitsList}>
            <li>✓ Full platform access</li>
            <li>✓ Unlimited appointments</li>
            <li>✓ Priority support</li>
            <li>✓ Analytics dashboard</li>
            <li>✓ Early access to new features</li>
            <li>✓ Cancel anytime - no commitment</li>
          </ul>
        </div>

        <div className={styles.offerBox}>
          <p className={styles.offerText}>
            🎉 Don't forget! Use code <strong>FIRST2FREE</strong> to get your first 2 months free!
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={() => navigate(-1)}>
            <FiArrowLeft /> Try Again
          </button>
          <button className={styles.secondaryButton} onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>

        <p className={styles.note}>Need help? Contact our support team at support@blacktherapy.com</p>
      </div>
    </div>
  )
}

export default SubscriptionCancelled
