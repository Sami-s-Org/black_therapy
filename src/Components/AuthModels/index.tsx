import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { auth, db } from '../../Share/FireBase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore' // Make sure getDoc is imported
import { notifySuccess } from '../Toast'
import styles from '../common.module.css'

interface UserData {
  name: string
  email: string
  phone: string
  uid: string
  location?: string // Made optional with ?
}

interface AuthModalProps {
  type: 'login' | 'register'
  onClose: () => void
  onSwitch: () => void
  onLoginSuccess?: (userData: UserData) => void
}

const AuthModal: FC<AuthModalProps> = ({ type, onClose, onSwitch, onLoginSuccess }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      const user = userCredential.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        throw new Error('User document not found')
      }

      const userData = userDoc.data() as UserData

      notifySuccess('Login successful!')
      setLoginForm({ email: '', password: '' })

      if (onLoginSuccess) {
        onLoginSuccess({
          name: userData.name || '',
          email: user.email || '',
          phone: userData.phone || '',
          uid: user.uid,
          location: userData.location || '',
        })
      }

      onClose()
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
      const user = userCredential.user

      const userData = {
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        role: 'user',
        createdAt: new Date(),
        location: '', // Initialize location
      }

      await setDoc(doc(db, 'users', user.uid), userData)

      notifySuccess('Registration successful! You are now logged in.')
      setRegisterForm({ name: '', email: '', phone: '', password: '' })

      if (onLoginSuccess) {
        onLoginSuccess({
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone,
          uid: user.uid,
          location: '', // Include location
        })
      }

      onClose()
    } catch (error: any) {
      // ... [keep your existing error handling]
    } finally {
      setIsLoading(false)
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
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes className={styles.closeModal} onClick={onClose} />
        <h2 className={styles.modelheading}>{type === 'login' ? 'Login' : 'Register'}</h2>

        {type === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={registerForm.phone}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>
        )}

        <p className={styles.switchFormText}>
          {type === 'login' ? (
            <>
              Don't have a therapist account? <span onClick={isLoading ? undefined : onSwitch}>Register</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={isLoading ? undefined : onSwitch}>Login</span>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default AuthModal
