import { FC, useState, useEffect, useRef } from 'react'
import styles from '../common.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../../Share/FireBase'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { notifySuccess, notifyError } from '../Toast'
import AuthModal from '../AuthModels'

interface User {
  uid: string
  name: string
  email: string
  phone?: string
  role?: string
  createdAt?: Date
}

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string>('')
  const [activeLink, setActiveLink] = useState<string>('')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login')
  const [user, setUser] = useState<User | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false)
        setActiveDropdown('')
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data() as User
          setUser({
            uid: firebaseUser.uid,
            name: userData.name,
            email: firebaseUser.email || '',
            phone: userData.phone,
            role: userData.role,
          })
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid: firebaseUser.uid,
              name: userData.name,
              email: firebaseUser.email,
              role: userData.role,
            })
          )
        }
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [])

  const navigateTo = (path: string) => {
    setActiveLink(path)
    navigate(path)
    setMenuOpen(false)
    setActiveDropdown('')
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? '' : name)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      notifySuccess('Logged out successfully')
      navigate('/') // Navigates to home
    } catch (error) {
      console.error('Logout error:', error)
      notifyError('Logout failed. Please try again.')
    }
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

  return (
    <header className={styles.header} ref={dropdownRef}>
      <AnimatePresence>
        {authModalOpen && <AuthModal type={authModalType} onClose={closeAuthModal} onSwitch={switchAuthModal} />}
      </AnimatePresence>

      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="Black Therapy Logo" onClick={() => navigate('/')} />

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={`${styles.navLink} ${activeLink === '/' ? styles.active : ''}`}
                onClick={() => navigateTo('/')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/findTherapist"
                className={`${styles.navLink} ${activeLink === '/findTherapist' ? styles.active : ''}`}
                onClick={() => navigateTo('/findTherapist')}
              >
                Find a Therapist
              </Link>
            </li>
            <li>
              <Link
                to="/findCoach"
                className={`${styles.navLink} ${activeLink === '/findCoach' ? styles.active : ''}`}
                onClick={() => navigateTo('/findCoach')}
              >
                Find a Coach
              </Link>
            </li>

            <li className={styles.dropdown}>
              <span
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => toggleDropdown('about')}
                className={`${styles.navLink} ${activeDropdown === 'about' ? styles.active : ''}`}
              >
                <p>About</p> <FaAngleDown style={{ marginTop: '2px' }} />
              </span>
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.ul
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link to="/joinAsATherapist">Join As A Therapist</Link>
                    </li>
                    <li>
                      <Link to="/joinAsACoach">Join As A Coach</Link>
                    </li>
                    <li>
                      <Link to="/ourTeam">Meet Our Team</Link>
                    </li>
                    <li>
                      <Link to="/boardMembers">Board Members</Link>
                    </li>
                    <li>
                      <Link to="/termsOfUse">Terms of Use</Link>
                    </li>
                    <li>
                      <Link to="/privacyPolicy">Privacy Policy</Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className={styles.dropdown}>
              <span
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => toggleDropdown('resources')}
                className={`${styles.navLink} ${activeDropdown === 'resources' ? styles.active : ''}`}
              >
                <p> Resources</p> <FaAngleDown style={{ marginTop: '2px' }} />
              </span>
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.ul
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/contactUs">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                to="/store"
                className={`${styles.navLink} ${activeLink === '/store' ? styles.active : ''}`}
                onClick={() => navigateTo('/store')}
              >
                Store
              </Link>
            </li>
          </ul>
        </nav>

        {user ? (
          <div className={styles.userDropdown}>
            <button className={styles.userButton} onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <FaUser /> {user.name}
            </button>
            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  className={styles.userDropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.userInfo}>{user.email}</p>
                  <div className={styles.menuSection}>
                    <Link to="/appointmentlist" className={styles.userDropdownItem}>
                      Appointments
                    </Link>
                    <Link to="/myprofile" className={styles.userDropdownItem}>
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={styles.userDropdownItem}
                      style={{
                        display: 'flex',
                        border: 'none',
                        width: '100%',
                        gap: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button className={styles.loginButton} onClick={() => openAuthModal('login')}>
            Login
          </button>
        )}

        <Link to="/donate" className={styles.donate}>
          <p>❤️ Donate</p>
        </Link>

        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  )
}

export default Navbar
