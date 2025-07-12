import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCalendarAlt, FaUserCircle } from 'react-icons/fa'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { auth, db } from '../../Share/FireBase'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { notifySuccess, notifyError } from '../Toast'
import AuthModal from '../AuthModels'
import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
import styles from './navbar.module.css'

interface User {
  uid: string
  name: string
  email: string
  phone?: string
  role?: string
  createdAt?: Date
}

interface NavItem {
  label: string
  path?: string
  children?: NavItem[]
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string>('')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login')
  const [user, setUser] = useState<User | null>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const navbarRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Navigation items configuration
  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Find a Therapist', path: '/findTherapist' },
    { label: 'Find a Coach', path: '/findCoach' },
    {
      label: 'Our Why',
      children: [
        { label: 'Join As A Therapist', path: '/joinAsATherapist' },
        { label: 'Join As A Coach', path: '/joinAsACoach' },
        { label: 'Meet Our Team', path: '/ourTeam' },
        { label: 'Board Members', path: '/boardMembers' },
        { label: 'Terms of Use', path: '/termsOfUse' },
        { label: 'Privacy Policy', path: '/privacyPolicy' },
      ],
    },
    {
      label: 'Healing Resources',
      children: [
        { label: 'Blog', path: '/blog' },
        { label: 'Contact Us', path: '/contactUs' },
        { label: 'Find a Therapist', path: '/findTherapist' },
        { label: 'Find a Coach', path: '/findCoach' },
        { label: "King's Table", path: '/kingTable' },
      ],
    },
    { label: 'Store', path: '/store' },
  ]

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown('')
        setUserDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Authentication state management
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data() as User
            const userInfo = {
              uid: firebaseUser.uid,
              name: userData.name,
              email: firebaseUser.email || '',
              phone: userData.phone,
              role: userData.role,
            }
            setUser(userInfo)
            localStorage.setItem('user', JSON.stringify(userInfo))
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown('')
    setUserDropdownOpen(false)
  }, [location.pathname])

  // Handle navigation
  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path)
      setActiveDropdown('')
      setUserDropdownOpen(false)
      setMobileMenuOpen(false)
    },
    [navigate]
  )

  // Handle dropdown toggle
  const handleDropdownToggle = useCallback((dropdownName: string) => {
    setActiveDropdown((prev) => (prev === dropdownName ? '' : dropdownName))
    setUserDropdownOpen(false)
  }, [])

  // Handle user dropdown toggle
  const handleUserDropdownToggle = useCallback(() => {
    setUserDropdownOpen((prev) => !prev)
    setActiveDropdown('')
  }, [])

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      notifySuccess('Logged out successfully')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      notifyError('Logout failed. Please try again.')
    }
  }, [navigate])

  // Handle auth modal
  const handleAuthModal = useCallback((type: 'login' | 'register') => {
    setAuthModalType(type)
    setAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false)
  }, [])

  const switchAuthModal = useCallback(() => {
    setAuthModalType((prev) => (prev === 'login' ? 'register' : 'login'))
  }, [])

  // Check if link is active
  const isLinkActive = useCallback(
    (path: string) => {
      return location.pathname === path
    },
    [location.pathname]
  )

  // Render desktop dropdown
  const renderDesktopDropdown = (item: NavItem, index: number) => {
    const isOpen = activeDropdown === item.label

    return (
      <li key={index} className={styles.dropdown}>
        <button
          className={`${styles.dropdownToggle} ${isOpen ? styles.active : ''}`}
          onClick={() => handleDropdownToggle(item.label)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {item.label}
          <FaAngleDown className={styles.dropdownIcon} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`${styles.dropdownMenu} ${styles.fadeIn}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {item.children?.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  to={child.path || '#'}
                  className={styles.dropdownItem}
                  onClick={() => handleNavigation(child.path || '#')}
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    )
  }

  // Render mobile dropdown
  const renderMobileDropdown = (item: NavItem, index: number) => {
    return (
      <li key={index} className={styles.mobileNavItem}>
        <div className={styles.mobileDropdown}>
          <div className={styles.mobileDropdownTitle}>{item.label}</div>
          <div className={styles.mobileDropdownList}>
            {item.children?.map((child, childIndex) => (
              <Link
                key={childIndex}
                to={child.path || '#'}
                className={styles.mobileDropdownItem}
                onClick={() => handleNavigation(child.path || '#')}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </li>
    )
  }

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} ref={navbarRef}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <img src={logo} alt="Black Therapy Logo" className={styles.logo} onClick={() => handleNavigation('/')} />

          {/* Desktop Navigation */}
          <ul className={styles.navMenu}>
            {navItems.map((item, index) =>
              item.children ? (
                renderDesktopDropdown(item, index)
              ) : (
                <li key={index} className={styles.navItem}>
                  <Link
                    to={item.path || '#'}
                    className={`${styles.navLink} ${isLinkActive(item.path || '') ? styles.active : ''}`}
                    onClick={() => handleNavigation(item.path || '#')}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop User Section */}
          <div className={styles.userSection}>
            {user ? (
              <div className={styles.userDropdown}>
                <button
                  className={styles.userButton}
                  onClick={handleUserDropdownToggle}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <FaUser />
                  {user.name}
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      className={`${styles.userDropdownMenu} ${styles.fadeIn}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.userInfo}>{user.email}</div>
                      <Link
                        to="/appointmentlist"
                        className={styles.userDropdownItem}
                        onClick={() => handleNavigation('/appointmentlist')}
                      >
                        <FaCalendarAlt />
                        Appointments
                      </Link>
                      <Link
                        to="/myprofile"
                        className={styles.userDropdownItem}
                        onClick={() => handleNavigation('/myprofile')}
                      >
                        <FaUserCircle />
                        My Profile
                      </Link>
                      <button onClick={handleLogout} className={styles.userDropdownItem}>
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button className={styles.loginButton} onClick={() => handleAuthModal('login')}>
                Sign In / Join
              </button>
            )}

            <Link to="/donate" className={styles.donateButton}>
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuContent}>
              <ul className={styles.mobileNavMenu}>
                {navItems.map((item, index) =>
                  item.children ? (
                    renderMobileDropdown(item, index)
                  ) : (
                    <li key={index} className={styles.mobileNavItem}>
                      <Link
                        to={item.path || '#'}
                        className={`${styles.mobileNavLink} ${isLinkActive(item.path || '') ? styles.active : ''}`}
                        onClick={() => handleNavigation(item.path || '#')}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              {/* Mobile User Section */}
              <div className={styles.mobileUserSection}>
                {user ? (
                  <>
                    <div className={styles.mobileUserInfo}>Welcome, {user.name}</div>
                    <div className={styles.mobileUserActions}>
                      <Link
                        to="/appointmentlist"
                        className={styles.mobileUserAction}
                        onClick={() => handleNavigation('/appointmentlist')}
                      >
                        <FaCalendarAlt />
                        Appointments
                      </Link>
                      <Link
                        to="/myprofile"
                        className={styles.mobileUserAction}
                        onClick={() => handleNavigation('/myprofile')}
                      >
                        <FaUserCircle />
                        My Profile
                      </Link>
                      <button onClick={handleLogout} className={styles.mobileUserAction}>
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.mobileAuthButtons}>
                    <button className={styles.mobileLoginButton} onClick={() => handleAuthModal('login')}>
                      Sign In / Join
                    </button>
                  </div>
                )}

                <Link to="/donate" className={styles.mobileDonateButton}>
                  Donate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {authModalOpen && <AuthModal type={authModalType} onClose={closeAuthModal} onSwitch={switchAuthModal} />}
      </AnimatePresence>
    </>
  )
}

export default Navbar
