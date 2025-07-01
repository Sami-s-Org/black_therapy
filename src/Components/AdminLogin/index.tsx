import React, { useState } from 'react'
import { notifyError } from '../Toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
    const auth = getAuth()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (user.uid === 'n3EWjofKtTVyLubZEZheQeX3bsH2') {
        localStorage.setItem('isAdmin', 'true')
        onLogin()
      } else {
        notifyError('You are not authorized as admin')
      }
    } catch (error) {
      console.error(error)
      notifyError('Invalid email or password')
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
