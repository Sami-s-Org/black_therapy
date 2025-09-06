import { useNavigate } from 'react-router-dom'
import styles from '../common.module.css'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../Share/FireBase'
import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
import { useState } from 'react'
import AuthModal from '../AuthModels'
import { AnimatePresence } from 'framer-motion'
import { notifyError, notifySuccess } from '../Toast'
import classNames from 'classnames'
import LiveTicker from '../LiveTracker'
const Footer = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login')

  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }
  const openAuthModal = (type: 'login' | 'register') => {
    setAuthModalType(type)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
  }

  const switchAuthModal = () => {
    setAuthModalType(authModalType === 'login' ? 'register' : 'login')
  }
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      notifyError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        subscribedAt: Timestamp.now(),
      })
      notifySuccess('Successfully subscribed!')
      setEmail('')
    } catch (err) {
      console.error('Subscription failed:', err)
      notifyError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }
  return (
    <>
      <AnimatePresence>
        {authModalOpen && <AuthModal type={authModalType} onClose={closeAuthModal} onSwitch={switchAuthModal} />}
      </AnimatePresence>
      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.w50}>
            <p className={styles.Get}>Get Newsletter</p>
          </div>
          <div className={styles.w50} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className={styles.footerInput}
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.Subscribe} onClick={handleSubscribe} disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.ContactBg}>
        <p className={styles.Get}>Lets Celebrate Your Love</p>
        <LiveTicker />
        <button className={styles.ContactBtn} onClick={() => handleNavigation('/contactUs')}>
          Contact Us Now
        </button>
      </div>
      <footer className={classNames(styles.footer, styles.ml40)}>
        <div className={styles.footerTop}>
          <div className={styles.column}>
            <img alt="logo" src={logo} className={styles.logofooter} />
            <p className={styles.FooterDescripation}>
              Therapy for black men offers holistic healing and personalized coaching to empower your mental and
              emotional well-being
            </p>
          </div>
          <div className={styles.column}>
            <h2>Quick Links</h2>
            <ul>
              <li onClick={() => openAuthModal('login')}>Therapist Sign/Log In</li>
              <li onClick={() => openAuthModal('login')}>Coach Sign/Log In</li>
              <li onClick={() => handleNavigation('/blog')}>Blog</li>
              <li onClick={() => handleNavigation('/store')}>Store</li>
              <li onClick={() => handleNavigation('/donate')}>Donate</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>About</h2>
            <ul>
              <li onClick={() => handleNavigation('/')}>About Us</li>
              <li onClick={() => handleNavigation('/ourTeam')}>Meet Our Team</li>
              <li onClick={() => handleNavigation('/boardMembers')}>Board Members</li>
              <li onClick={() => handleNavigation('/joinAsACoach')}>Join As A Therapist</li>
              <li onClick={() => handleNavigation('/joinAsATherapist')}>Join As A Coaches</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Legal & Contact</h2>
            <ul>
              <li onClick={() => handleNavigation('/termsOfUse')}>Terms of Use</li>
              <li onClick={() => handleNavigation('/privacyPolicy')}>Privacy Policy</li>
              <li onClick={() => handleNavigation('/ContactUs')}>Contact Us</li>
            </ul>
          </div>
          {/* <div className={styles.column}>
          <h2>Stay Connected</h2>
          <input type="email" placeholder="Subscribe to Newsletter" />
          <div className={styles.social}>
            <div onClick={() => window.open("https://instagram.com", "_blank")}>
              <FaInstagram />
            </div>
          </div>
        </div> */}
        </div>
        <div className={styles.footerBottom}>
          © 2025 Therapy For Black Men - All Rights Reserved. Designed by Avenue Sol’s
        </div>
      </footer>
    </>
  )
}

export default Footer
