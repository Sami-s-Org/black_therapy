import { useState } from 'react'
import styles from './sidebar.module.css'
import { FaHome, FaUserAlt, FaBars } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { PiArticleNyTimesBold } from 'react-icons/pi'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    window.location.reload()
    navigate('/admin')
  }
  const toggleSidebar = () => setIsOpen(!isOpen)

  const navItems = [
    { path: '/admin/dashBoard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/appointments', label: 'Appointments', icon: <FaHome /> },
    { path: '/admin/coaches', label: 'Coaches', icon: <FaUserAlt /> },
    { path: '/admin/therapist', label: 'Therapists', icon: <FaUserAlt /> },
    { path: '/admin/bloges', label: 'Blogs', icon: <PiArticleNyTimesBold /> },
  ]

  return (
    <div className={styles.OuterContainer}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div>
          <div className={styles.toggleBtn} onClick={toggleSidebar}>
            <FaBars />
          </div>
          <ul className={styles.menu}>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <li className={`${styles.menuItem} ${isActive ? styles.activeLink : ''}`}>
                    <span className={styles.icon}>{item.icon}</span>
                    {isOpen && <span className={styles.label}>{item.label}</span>}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
        <p className={styles.Logout} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  )
}

export default Sidebar
