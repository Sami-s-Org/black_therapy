import { useNavigate } from 'react-router-dom'
import styles from '../common.module.css'

import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
const Footer = () => {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.w50}>
            <p className={styles.Newsletter}>Newsletter</p>
            <p className={styles.Get}>Get Newsletter</p>
          </div>
          <div className={styles.w50} style={{ display: 'flex', alignItems: 'center' }}>
            <input className={styles.footerInput} placeholder="Enter Your Email Address" />
            <button className={styles.Subscribe}>Subscribe Now</button>
          </div>
        </div>
      </div>
      <div className={styles.ContactBg}>
        <p className={styles.Get}>Lets Celebrate Your Love</p>
        <button className={styles.ContactBtn} onClick={() => handleNavigation('/contactUs')}>
          Contact Us Now
        </button>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.column}>
            <img src={logo} className={styles.logofooter} />
            <p className={styles.FooterDescripation}>
              Black Therapy offers holistic healing and personalized coaching to empower your mental and emotional
              well-being
            </p>
          </div>
          <div className={styles.column}>
            <h2>Quick Links</h2>
            <ul>
              <li onClick={() => handleNavigation('/')}>Find a Therapist</li>
              <li onClick={() => handleNavigation('/findCoach')}>Find a Coach</li>
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
