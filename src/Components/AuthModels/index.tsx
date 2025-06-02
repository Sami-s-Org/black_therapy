import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { auth, db } from '../../Share/FireBase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { notifyError, notifySuccess } from '../Toast'
import styles from '../common.module.css'

interface AuthModalProps {
  type: 'login' | 'register'
  onClose: () => void
  onSwitch: () => void
  onLoginSuccess?: () => void // Added optional onLoginSuccess prop
}

const AuthModal: FC<AuthModalProps> = ({ type, onClose, onSwitch, onLoginSuccess }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      notifySuccess('Login successful!')
      onClose()
      setLoginForm({ email: '', password: '' })
      // Call onLoginSuccess if provided
      if (onLoginSuccess) {
        onLoginSuccess()
      }
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
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
      onClose()
      setRegisterForm({ name: '', email: '', phone: '', password: '' })
      // Call onLoginSuccess after registration too
      if (onLoginSuccess) {
        onLoginSuccess()
      }
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
              Don't have an account? <span onClick={isLoading ? undefined : onSwitch}>Register</span>
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
