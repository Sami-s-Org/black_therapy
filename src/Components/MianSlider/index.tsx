import styles from './mianslider.module.css'

const MianSlider = () => {
  return (
    <section className={styles.heroSection}>
      <video className={styles.backgroundVideo} autoPlay loop muted>
        <source
          src="https://media.istockphoto.com/id/469267480/video/happy-healthy-athlete-appeciating-the-sun-while-on-a-run.mp4?s=mp4-640x640-is&k=20&c=UzM-ooJS19rJbSAvszJ5BTmZS2R80qaVzxyvw9jCwL0="
          type="video/mp4"
        />
      </video>

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.mainHeadline}>Supporting Black Men to Wholeness</h1>
          <p className={styles.subtext}>Connect with a Therapist Today</p>
          <button className={styles.ctaButton}>Get Support</button>
        </div>
      </div>

      <div className={styles.additionalMessaging}>
        <div className={styles.message}>Supporting Black Men to Wholeness</div>
        <div style={{ textTransform: 'uppercase' }} className={styles.message}>
          THERAPY FOR BLACK MEN
        </div>
        <div className={styles.message}>Connect with a Therapist Today</div>
      </div>

      {/* <div className={styles.logoContainer}>
        <img className={styles.logo} src="" />
      </div> */}
    </section>
  )
}

export default MianSlider
