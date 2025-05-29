import { FC, useState, useEffect, useRef } from 'react'
import styles from '../common.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../../Share/FireBase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { notifyError, notifySuccess } from '../Toast'

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
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '' })
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      notifySuccess('Login successful!')
      setLoginOpen(false)
      setLoginForm({ email: '', password: '' })
    } catch (error: any) {
      console.error('Login error:', error)

      switch (error.code) {
        case 'auth/invalid-email':
          notifyError('The email address is not valid.')
          break
        case 'auth/user-not-found':
          notifyError('No user found with this email.')
          break
        case 'auth/wrong-password':
          notifyError('Invalid password. Please try again.')
          break
        case 'auth/too-many-requests':
          notifyError('Too many failed attempts. Please try again later.')
          break
        default:
          notifyError('Login failed. Please check your credentials.')
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        role: 'user',
        createdAt: new Date(),
      })

      notifySuccess('Registration successful! You are now logged in.')
      setRegisterOpen(false)
      setRegisterForm({ name: '', email: '', phone: '', password: '' })
    } catch (error: any) {
      console.error('Registration error:', error)

      if (error.code === 'auth/email-already-in-use') {
        notifyError('This email is already registered. Please use a different email.')
      } else if (error.code === 'auth/invalid-email') {
        notifyError('The email address is not valid.')
      } else if (error.code === 'auth/weak-password') {
        notifyError('Password is too weak. Please choose a stronger password.')
      } else {
        notifyError('Registration failed. Please try again.')
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      notifySuccess('Logged out successfully')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      notifyError('Logout failed. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <header className={styles.header} ref={dropdownRef}>
      {/* Login Modal */}
      <AnimatePresence>
        {loginOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaTimes className={styles.closeModal} onClick={() => setLoginOpen(false)} />
              <h2 className={styles.modelheading}>Login</h2>
              <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" name="email" value={loginForm.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Login
                </button>
              </form>
              <p className={styles.switchFormText}>
                Don't have an account?{' '}
                <span
                  onClick={() => {
                    setLoginOpen(false)
                    setRegisterOpen(true)
                  }}
                >
                  Register
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {registerOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRegisterOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FaTimes className={styles.closeModal} onClick={() => setRegisterOpen(false)} />
              <h2 className={styles.modelheading}>Register</h2>
              <form onSubmit={handleRegister}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input type="text" name="name" value={registerForm.name} onChange={handleRegisterChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={registerForm.phone} onChange={handleRegisterChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Register
                </button>
              </form>
              <p className={styles.switchFormText}>
                Already have an account?{' '}
                <span
                  onClick={() => {
                    setRegisterOpen(false)
                    setLoginOpen(true)
                  }}
                >
                  Login
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
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
          <button className={styles.loginButton} onClick={() => setLoginOpen(true)}>
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
