import { useEffect } from 'react'
import styles from './contactus.module.css'
import HeaderBar from '../../Components/Headbar'
import { motion } from 'framer-motion'

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <HeaderBar heading="Contact Us" />
      <div className={styles.wrapper}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.leftPanel}>
            <h2 className={styles.title}>Let’s Connect 👋</h2>
            <p className={styles.text}>
              We'd love to hear from you. Whether it's a question, feedback, or partnership opportunity — just reach
              out!
            </p>

            <div className={styles.contactItem}>
              <h4>📧 General Inquiries</h4>
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>
            </div>

            <div className={styles.contactItem}>
              <h4>🛠️ Tech Support</h4>
              <a href="mailto:support@therapyforblackmen.org">support@therapyforblackmen.org</a>
            </div>

            <div className={styles.contactItem}>
              <h4>🎤 Speaker Booking</h4>
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>
            </div>
          </div>
          <motion.form
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input type="text" placeholder="Your Name" className={styles.input} />
            <input type="email" placeholder="Your Email" className={styles.input} />
            <textarea placeholder="Your Message" className={styles.textarea}></textarea>
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </div>
    </>
  )
}
