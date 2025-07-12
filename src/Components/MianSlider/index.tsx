import { Link } from 'react-router-dom'
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
          <h1 className={styles.mainHeadline}>You don't have to carry it alone anymore</h1>
          <p className={styles.subtext}> Therapy for Black Men</p>
          <Link to="/findTherapist" className={styles.ctaButton}>
            Start Your Journey Home Toward Wholeness
          </Link>
        </div>
      </div>

      <div className={styles.additionalMessaging}>
        <div className={styles.message}>
          Healing isn’t a fix. It’s a return. A return to the you before the silence. Before the shame.
        </div>
      </div>

      {/* <div className={styles.logoContainer}>
        <img className={styles.logo} src="" />
      </div> */}
    </section>
  )
}

export default MianSlider
