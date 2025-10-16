import React, { useState } from 'react'
import { notifyError } from '../Toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../Share/FireBase'

// Props to notify parent when login is successful
interface AdminLoginModalProps {
  onLogin: () => void
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    try {
      // First, authenticate the user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if the user is an admin by looking up their UID in the admins collection
      const adminDocRef = doc(db, 'admins', user.uid)
      const adminDoc = await getDoc(adminDocRef)

      if (adminDoc.exists()) {
        const adminData = adminDoc.data()
        if (adminData.isActive !== false) {
          // Admin verification successful - call the onLogin callback
          // The parent component should handle the admin state management
          onLogin()
        } else {
          // Admin account is deactivated
          await auth.signOut()
          notifyError('Your admin account has been deactivated')
        }
      } else {
        // If not found in admins collection, sign out the user
        await auth.signOut()
        notifyError('You are not authorized as admin')
      }
    } catch (error: any) {
      console.error(error)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        notifyError('Invalid email or password')
      } else if (error.code === 'auth/invalid-email') {
        notifyError('Invalid email format')
      } else {
        notifyError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11111111111,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          width: '400px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#a88757',
            marginBottom: '16px',
            letterSpacing: '3px',
            fontFamily: 'Derivia Regular',
          }}
        >
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '12px',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '16px',
          }}
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '12px',
              borderRadius: '4px',
              paddingRight: '35px',
              padding: '10px',
              fontSize: '16px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '18px',
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            height: '50px',
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '20px',
            color: 'white',
            backgroundColor: '#a88757',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default AdminLoginModal
