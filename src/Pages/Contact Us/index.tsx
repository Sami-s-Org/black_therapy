import { useEffect, useState } from 'react'
import styles from './contactus.module.css'
import HeaderBar from '../../Components/Headbar'
import { motion } from 'framer-motion'
import { db } from '../../Share/FireBase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { notifyError, notifySuccess } from '../../Components/Toast'
import { FiMail } from 'react-icons/fi'
// import PrimaryButton from '../../Components/PrimaryButton'

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

  // Newsletter subscribe state
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribeLoading, setSubscribeLoading] = useState(false)

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

  const handleSubscribe = async () => {
    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      notifyError('Please enter a valid email address')
      return
    }
    setSubscribeLoading(true)
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: subscribeEmail,
        subscribedAt: Timestamp.now(),
      })
      notifySuccess('Successfully subscribed!')
      setSubscribeEmail('')
    } catch (err) {
      console.error('Subscription failed:', err)
      notifyError('Something went wrong. Please try again.')
    }
    setSubscribeLoading(false)
  }

  return (
    <>
      <HeaderBar heading="Contact Us" />
      <div className={styles.wrapper}>
        <div className={styles.container22}>
          <h1 className={styles.heroTitle}>We're Here for You</h1>
          <p className={styles.intro}>
            At <strong style={{ color: 'black', fontFamily: 'inherit' }}>Therapy for Black Men</strong>, our mission
            goes beyond providing resources, we’re dedicated to creating a community where you feel truly seen,
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
            {/* General Inquiries */}
            <div className={styles.contactItem}>
              <h4>General Inquiries</h4>
              <p className={styles.intro}>
                Have a question that’s not addressed on our site?
                <br />
                Looking for us to tackle a specific topic on our Instagram page?
                <br />
                We’d love to hear your thoughts, ideas, and feedback!
              </p>
              <a href="mailto:info@therapyforblackmen.org" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiMail style={{ marginRight: 4 }} /> info@therapyforblackmen.org
              </a>
            </div>
            {/* Tech Support */}
            <div className={styles.contactItem}>
              <h4>Tech Support</h4>
              <p className={styles.intro}>
                If you’re a therapist listed in our directory and need help managing your profile or resolving technical
                issues, our team is here to assist you.
              </p>
              <a href="mailto:support@therapyforblackmen.org" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiMail style={{ marginRight: 4 }} /> support@therapyforblackmen.org
              </a>
            </div>
            {/* Booking */}
            <div className={styles.contactItem}>
              <h4>Booking</h4>
              <p className={styles.intro}>
                Looking to invite one of our inspiring leaders to speak or participate in your event? Our incredible
                team is available for engagements that inspire, educate, and empower:
              </p>
              <ul
                style={{
                  textAlign: 'left',
                  margin: '0 0 1rem 1.5rem',
                  color: '#131313',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                }}
              >
                <li>Benjamin Calixte</li>
                <li>Vladimire Calixte</li>
                <li>Sacheen Sawney</li>
                <li>Sabrina Lamour</li>
                <li>Davian Chester</li>
                <li>
                  Georges Louis-Jeune <span style={{ color: '#a88757', fontWeight: 600 }}>(Board Member)</span>
                </li>
                <li>
                  Steven Pascal <span style={{ color: '#a88757', fontWeight: 600 }}>(Board Member)</span>
                </li>
              </ul>
              <p className={styles.intro}>
                Send your event details to the respective email address, and let us handle the rest.
              </p>
              <a href="mailto:info@therapyforblackmen.org" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiMail style={{ marginRight: 4 }} /> info@therapyforblackmen.org
              </a>
            </div>
          </div>
          {/* Contact Form */}
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
        {/* Your Voice Matters Section */}
        <div
          className={styles.container}
          style={{ marginTop: 32, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
        >
          <h2 className={styles.title} style={{ color: '#a88757', marginBottom: 12 }}>
            Your Voice Matters
          </h2>
          <p className={styles.intro} style={{ color: '#131313', fontSize: '1.1rem', marginBottom: 0 }}>
            Whether you’re reaching out with a simple question or the start of a transformative collaboration, we’re
            ready to listen. Together, we’re building a future where healing, connection, and empowerment thrive for
            Black men everywhere.
          </p>
        </div>
        {/* Subscribe Section */}
        <div
          className={styles.container}
          style={{ marginTop: 32, background: '#f5f5f5', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
        >
          <h2 className={styles.title} style={{ color: '#a88757', marginBottom: 12 }}>
            Subscribe to Our Emails
          </h2>
          <p className={styles.intro} style={{ color: '#131313', fontSize: '1.1rem', marginBottom: 24 }}>
            Don’t miss updates, resources, and inspiration, join our mailing list today!
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              className={styles.input}
              style={{ maxWidth: 400 }}
              required
            />
            <div style={{ width: '100%' }}>
              <button
                className={styles.button}
                style={{ width: '100%' }}
                onClick={handleSubscribe}
                disabled={subscribeLoading}
                type="button"
              >
                {subscribeLoading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        </div>
        {/* Closing Statement */}
        <div className={styles.container22} style={{ marginTop: 24, textAlign: 'center' }}>
          <p className={styles.intro} style={{ fontWeight: 600, fontSize: '1.2rem', color: '#a88757' }}>
            We’re here for you. Always.
          </p>
        </div>
      </div>
    </>
  )
}
