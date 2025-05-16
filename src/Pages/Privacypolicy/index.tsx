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
        <section>
          <h2>What Information We Collect</h2>
          <ul>
            <li>Personal details: Name, email, phone number, location.</li>
            <li>Therapy preferences (topics, therapist type).</li>
            <li>Usage data for site improvement.</li>
            <li>Application and voluntary submissions.</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To match you with therapists or coaches.</li>
            <li>To process free therapy applications.</li>
            <li>To improve your browsing experience.</li>
            <li>To respond to inquiries and send updates.</li>
          </ul>
        </section>

        <section>
          <h2>Confidentiality & Data Sharing</h2>
          <p>
            We do not sell or share your data. Trusted providers may access minimal information strictly to support you.
          </p>
        </section>

        <section>
          <h2>Data Protection & Security</h2>
          <p>
            We use SSL encryption, secure data storage, and strict access control. While no system is 100% secure, we
            follow best practices to protect your privacy.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You may request, update, or delete your data anytime by emailing us at{' '}
            <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>.
          </p>
        </section>

        <section>
          <h2>Cookies & Tracking</h2>
          <p>Our site may use cookies to enhance your experience. You can control this via your browser settings.</p>
        </section>

        <section>
          <h2>Third-Party Links</h2>
          <p>We are not responsible for the privacy practices of third-party links.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>Email: info@therapyforblackmen.org</p>
          <p>Phone: (646) 246-3064</p>
        </section>

        <section>
          <h2>Final Words</h2>
          <p>Your trust is sacred. Your healing journey deserves privacy, protection, and respect.</p>
        </section>
      </div>
    </>
  )
}

export default PrivacyPolicy
