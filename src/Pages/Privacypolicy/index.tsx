import { useEffect } from 'react'
import styles from './privacypolicy.module.css'
import HeaderBar from '../../Components/Headbar'

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <HeaderBar heading="Privacy Policy" />
      <div className={styles.privacyContainer}>
        <div className={styles.contentWrapper}>
          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>What Information We Collect</h2>
            <ul className={styles.privacyList}>
              <li className={styles.privacyListItem}>Personal details: Name, email, phone number, location.</li>
              <li className={styles.privacyListItem}>Therapy preferences (topics, therapist type).</li>
              <li className={styles.privacyListItem}>Usage data for site improvement.</li>
              <li className={styles.privacyListItem}>Application and voluntary submissions.</li>
            </ul>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>How We Use Your Information</h2>
            <ul className={styles.privacyList}>
              <li className={styles.privacyListItem}>To match you with therapists or coaches.</li>
              <li className={styles.privacyListItem}>To process free therapy applications.</li>
              <li className={styles.privacyListItem}>To improve your browsing experience.</li>
              <li className={styles.privacyListItem}>To respond to inquiries and send updates.</li>
            </ul>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Confidentiality & Data Sharing</h2>
            <p className={styles.privacyParagraph}>
              We do not sell or share your data. Trusted providers may access minimal information strictly to support
              you.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Data Protection & Security</h2>
            <p className={styles.privacyParagraph}>
              We use SSL encryption, secure data storage, and strict access control. While no system is 100% secure, we
              follow best practices to protect your privacy.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Your Rights</h2>
            <p className={styles.privacyParagraph}>
              You may request, update, or delete your data anytime by emailing us at{' '}
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Cookies & Tracking</h2>
            <p className={styles.privacyParagraph}>
              Our site may use cookies to enhance your experience. You can control this via your browser settings.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Third-Party Links</h2>
            <p className={styles.privacyParagraph}>
              We are not responsible for the privacy practices of third-party links.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Contact Us</h2>
            <p className={styles.privacyParagraph}>Email: info@therapyforblackmen.org</p>
            <p className={styles.privacyParagraph}>Phone: (646) 246-3064</p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.privacyHeading}>Final Words</h2>
            <p className={styles.privacyParagraph}>
              Your trust is sacred. Your healing journey deserves privacy, protection, and respect.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
