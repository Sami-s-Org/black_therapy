import { useEffect, useState } from 'react'
import styles from './contactus.module.css'
import HeaderBar from '../../Components/Headbar'
import { motion } from 'framer-motion'
import { db } from '../../Share/FireBase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { notifyError, notifySuccess } from '../../Components/Toast'

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'contact'), {
        ...formData,
        submittedAt: Timestamp.now(),
      })

      notifySuccess('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      notifyError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <>
      <HeaderBar heading="Contact Us" />
      <div className={styles.wrapper}>
        <div className={styles.container22}>
          <h1 className={styles.heroTitle}>We're Here for You</h1>
          <p className={styles.intro}>
            At <strong style={{ color: 'black', fontFamily: 'inherit' }}>Therapy for Black Men</strong>, our mission
            goes beyond providing resources we’re dedicated to creating a community where you feel truly seen,
            supported, and empowered. Whether you’re reaching out with a question, seeking assistance, or exploring a
            partnership, we want you to know:{' '}
            <strong style={{ color: 'black', fontFamily: 'inherit' }}>you matter to us</strong>.
          </p>
        </div>

        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.leftPanel}>
            <h2 className={styles.title}>Let’s Connect</h2>
            <p className={styles.text}>
              We'd love to hear from you. Whether it's a question, feedback, or partnership opportunity just reach out!
            </p>

            <div className={styles.contactItem}>
              <h4>📧 General Inquiries</h4>
              <p className={styles.intro}>
                Have a question that’s not addressed on our site?
                <br />
                Looking for us to tackle a specific topic on our Instagram page?
                <br />
                We’d love to hear your thoughts, ideas, and feedback!
              </p>
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>
            </div>

            <div className={styles.contactItem}>
              <h4>🛠️ Tech Support</h4>
              <p className={styles.intro}>
                Have a question that’s not addressed on our site?
                <br />
                Looking for us to tackle a specific topic on our Instagram page?
                <br />
                We’d love to hear your thoughts, ideas, and feedback!
              </p>
              <a href="mailto:support@therapyforblackmen.org">support@therapyforblackmen.org</a>
            </div>

            <div className={styles.contactItem}>
              <p className={styles.intro}>
                Have a question that’s not addressed on our site?
                <br />
                Looking for us to tackle a specific topic on our Instagram page?
                <br />
                We’d love to hear your thoughts, ideas, and feedback!
              </p>
              <h4>🎤 Speaker Booking</h4>
              <a href="mailto:info@therapyforblackmen.org">info@therapyforblackmen.org</a>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              required
            ></textarea>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </>
  )
}
