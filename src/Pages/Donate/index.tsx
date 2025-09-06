import { useEffect } from 'react'
import HeaderBar from '../../Components/Headbar'
import styles from './donate.module.css'
import { FaHeart, FaStar, FaSync, FaBolt, FaLock, FaChartBar, FaEnvelope, FaGlobe } from 'react-icons/fa'

export default function Donate() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className={styles.donatePage}>
      <HeaderBar heading="Donate" />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.wrapper}>
            <h1 className={styles.heroTitle}>Support Our Mission: Change Lives Through Mental Health Access</h1>
            <p className={styles.heroSubtitle}>
              At Therapy for Black Men, we've witnessed the transformative power of mental health support when barriers
              are removed. Thanks to the incredible generosity of our donors, we've been able to provide over $150,000
              to fund free therapy sessions for Black men and boys across the nation.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>$150,000+</span>
                <span className={styles.statLabel}>Funded for Free Therapy</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Lives Changed</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10</span>
                <span className={styles.statLabel}>Free Sessions Per Person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Matters */}
      <section className={styles.impactSection}>
        <div className={styles.wrapper}>
          <h2 className={styles.sectionHeading}>Why Your Support Matters</h2>
          <p className={styles.sectionSubheading}>
            A core part of our mission is to make therapy not just accessible, but empowering, for Black men and boys.
          </p>

          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.cardIcon}>
                <FaHeart />
              </div>
              <h3>Breaking Financial Barriers</h3>
              <p>
                Many in our community face financial obstacles that prevent them from seeking the care they need. Your
                donation directly changes that.
              </p>
            </div>

            <div className={styles.impactCard}>
              <div className={styles.cardIcon}>
                <FaStar />
              </div>
              <h3>Empowering Healing</h3>
              <p>
                By contributing to Therapy for Black Men, you'll help sponsor ten free therapy sessions for a man or boy
                who deserves healing without the weight of financial burden.
              </p>
            </div>

            <div className={styles.impactCard}>
              <div className={styles.cardIcon}>
                <FaSync />
              </div>
              <h3>Creating Lasting Change</h3>
              <p>
                Your gift isn't just a contribution; it's a lifeline that offers hope, healing, and a chance for a
                brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className={styles.donationSection}>
        <div className={styles.wrapper}>
          <div className={styles.donationContent}>
            <div className={styles.donationInfo}>
              <h2 className={styles.sectionHeading}>Make an Immediate Impact</h2>
              <p className={styles.donationText}>
                With an online donation, your generosity begins working right away. Every dollar you give ensures that
                Black men and boys receive the professional mental health care they deserve. Together, we can continue
                to make therapy accessible, one session at a time.
              </p>

              <div className={styles.donationFeatures}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <FaBolt />
                  </span>
                  <span>Immediate Impact</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <FaLock />
                  </span>
                  <span>Secure Donations</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <FaChartBar />
                  </span>
                  <span>Transparent Tracking</span>
                </div>
              </div>
            </div>

            <div className={styles.donationForm}>
              <div className={styles.formHeader}>
                <h3>Support Our Mission</h3>
                <p>Your donation makes therapy accessible</p>
              </div>

              <div className={styles.donationOptions}>
                <button className={styles.donationOption}>$25</button>
                <button className={styles.donationOption}>$50</button>
                <button className={styles.donationOption}>$100</button>
                <button className={styles.donationOption}>$250</button>
                <button className={styles.donationOption}>$500</button>
                <button className={styles.donationOption}>Custom</button>
              </div>

              <div className={styles.formFields}>
                <input type="text" placeholder="Full Name" className={styles.formInput} />
                <input type="email" placeholder="Email Address" className={styles.formInput} />
                <textarea placeholder="Message (Optional)" className={styles.formTextarea} rows={3} />
              </div>

              <button className={styles.donateButton}>Donate Now</button>

              <p className={styles.donationNote}>Please note: Donations are not tax-deductible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.testimonialSection}>
        <div className={styles.wrapper}>
          <h2 className={styles.sectionHeading}>Stories of Impact</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "Thanks to the free therapy sessions, I was able to work through my anxiety and depression. This
                  program literally saved my life."
                </p>
                <div className={styles.testimonialAuthor}>
                  <strong>Marcus, 28</strong>
                  <span>Chicago, IL</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "The therapy helped me become a better father and husband. I'm grateful for the support when I needed
                  it most."
                </p>
                <div className={styles.testimonialAuthor}>
                  <strong>David, 35</strong>
                  <span>Atlanta, GA</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "I never thought I could afford therapy. This program gave me the tools to heal and grow stronger."
                </p>
                <div className={styles.testimonialAuthor}>
                  <strong>James, 42</strong>
                  <span>Detroit, MI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.wrapper}>
          <div className={styles.contactContent}>
            <h2 className={styles.sectionHeading}>Questions About Donating?</h2>
            <p className={styles.contactText}>
              Your support is more than a gift, it's a commitment to the well-being of our community. Thank you for
              standing with us.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <FaEnvelope />
                </span>
                <div>
                  <strong>Email</strong>
                  <p>info@therapyforblackmen.org</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <FaGlobe />
                </span>
                <div>
                  <strong>Donobox Organization</strong>
                  <p>Secure donation platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
