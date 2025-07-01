import styles from './liveTracker.module.css'

const LiveTicker = () => {
  return (
    <div className={styles.tickerContainer}>
      <p className={styles.tickerText}>
        Together, we’ve provided <strong style={{ color: '#fff', fontSize: '18px' }}> $150,000 </strong> in free therapy
        for Black men & boys in need. Thank you for making healing possible!
      </p>
    </div>
  )
}

export default LiveTicker
