import { FC, useState, useEffect, useRef } from 'react'
import styles from '../common.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown, FaBars, FaTimes } from 'react-icons/fa'
import logo from '../../assets/Black-Yellow-Modern-Digital-Marketing-Facebook-Cover-5.png'
import { useNavigate, Link } from 'react-router-dom'

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string>('')
  const [activeLink, setActiveLink] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown('')
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // @ts-ignore
  const navigateTo = (path: string) => {
    setActiveLink(path)
    navigate(path)
    setMenuOpen(false)
    setActiveDropdown('')
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? '' : name)
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown('')
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    const handleScroll = () => {
      const header = dropdownRef.current
      if (header) {
        if (window.scrollY > window.innerHeight * 0.01) {
          header.classList.add(styles.scrolled)
        } else {
          header.classList.remove(styles.scrolled)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={styles.header} ref={dropdownRef}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="Black Therapy Logo" />

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={`${styles.navLink} ${activeLink === '/' ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink('/')
                  setMenuOpen(false)
                  setActiveDropdown('')
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/findTherapist"
                className={`${styles.navLink} ${activeLink === '/findTherapist' ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink('/findTherapist')
                  setMenuOpen(false)
                  setActiveDropdown('')
                }}
              >
                Find a Therapist
              </Link>
            </li>
            <li>
              <Link
                to="/findCoach"
                className={`${styles.navLink} ${activeLink === '/findCoach' ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink('/findCoach')
                  setMenuOpen(false)
                  setActiveDropdown('')
                }}
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
                      <Link
                        to="/joinAsATherapist"
                        onClick={() => {
                          setActiveLink('/joinAsATherapist')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Join As A Therapist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/joinAsACoach"
                        onClick={() => {
                          setActiveLink('/joinAsACoach')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Join As A Coach
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ourTeam"
                        onClick={() => {
                          setActiveLink('/ourTeam')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Meet Our Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/boardMembers"
                        onClick={() => {
                          setActiveLink('/boardMembers')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Board Members
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/termsOfUse"
                        onClick={() => {
                          setActiveLink('/termsOfUse')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacyPolicy"
                        onClick={() => {
                          setActiveLink('/privacyPolicy')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Privacy Policy
                      </Link>
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
                      <Link
                        to="/findTherapist"
                        onClick={() => {
                          setActiveLink('/findTherapist')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Find a Therapist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/findCoach"
                        onClick={() => {
                          setActiveLink('/findCoach')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Find a Coach
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        onClick={() => {
                          setActiveLink('/blog')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contactUs"
                        onClick={() => {
                          setActiveLink('/contactUs')
                          setMenuOpen(false)
                          setActiveDropdown('')
                        }}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                to="/store"
                className={`${styles.navLink} ${activeLink === '/store' ? styles.active : ''}`}
                onClick={() => {
                  setActiveLink('/store')
                  setMenuOpen(false)
                  setActiveDropdown('')
                }}
              >
                Store
              </Link>
            </li>
          </ul>
        </nav>

        <Link to="/donate" className={styles.donate} onClick={() => setActiveLink('/donate')}>
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
