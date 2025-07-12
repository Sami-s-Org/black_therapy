import { useEffect } from 'react'
import styles from './termused.module.css'
import HeaderBar from '../../Components/Headbar'

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <HeaderBar heading="Terms of Use" />
      <div className={styles.termsContainer}>
        <div className={styles.contentWrapper}>
          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Acceptance of Terms</h2>
            <p className={styles.termsParagraph}>
              By accessing or using Therapy for Black Men's website, services, or resources, you agree to these Terms of
              Use. If you do not agree, please do not use this website.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Mission & Use</h2>
            <p className={styles.termsParagraph}>
              Therapy for Black Men provides mental health resources, therapist and coach directories, and educational
              content to support the healing of Black men and boys. Use of our services should always align with this
              mission.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>User Responsibilities</h2>
            <ul className={styles.termsList}>
              <li className={styles.termsListItem}>
                You must be at least 18 years old or have guardian consent to use our services.
              </li>
              <li className={styles.termsListItem}>
                You agree to provide accurate information during any application or sign-up process.
              </li>
              <li className={styles.termsListItem}>
                You are responsible for maintaining the confidentiality of any login credentials.
              </li>
            </ul>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Content Disclaimer</h2>
            <p className={styles.termsParagraph}>
              The information provided on this website is not a substitute for professional medical advice, diagnosis,
              or treatment. Always seek help from a licensed healthcare provider for mental health concerns.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Therapist & Coach Listings</h2>
            <p className={styles.termsParagraph}>
              We carefully review therapist and coach profiles before approval. However, we do not guarantee any
              outcomes from therapy or coaching services accessed through our platform.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Intellectual Property</h2>
            <p className={styles.termsParagraph}>
              All content on this site including logos, text, images, and videos is the property of Therapy for Black
              Men unless otherwise noted. You may not copy, modify, or redistribute any materials without written
              permission.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Prohibited Conduct</h2>
            <ul className={styles.termsList}>
              <li className={styles.termsListItem}>
                No harassment, hate speech, or discriminatory behavior is tolerated.
              </li>
              <li className={styles.termsListItem}>No impersonation, false information, or spam submissions.</li>
              <li className={styles.termsListItem}>No interference with the site's infrastructure or security.</li>
            </ul>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Changes to Terms</h2>
            <p className={styles.termsParagraph}>
              We may revise these Terms at any time. Changes will be posted on this page with an updated date. Continued
              use of the site after changes implies acceptance.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Termination</h2>
            <p className={styles.termsParagraph}>
              We reserve the right to suspend or terminate access for users who violate these Terms.
            </p>
          </section>

          <section className={styles.sectionmargin}>
            <h2 className={styles.termsHeading}>Contact Us</h2>
            <p className={styles.termsParagraph}>
              If you have any questions or concerns about these Terms, please contact us at{' '}
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}

export default TermsOfUse
