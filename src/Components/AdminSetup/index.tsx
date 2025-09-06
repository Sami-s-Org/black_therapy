import React, { useState } from 'react'
import { setupAdmin } from '../../Share/FireBase/setupAdmin.js'

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('info@therapyforblackmen.org')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('Admin User')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSetup = async () => {
    if (!email || !password) {
      setMessage('Please fill in all fields')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const success = await setupAdmin(email, password, name)
      if (success) {
        setMessage('✅ Admin setup completed successfully!')
        setPassword('')
      } else {
        setMessage('❌ Admin setup failed. Check console for details.')
      }
    } catch (error) {
      setMessage('❌ Error during setup. Check console for details.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '400px',
        margin: '50px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2>Admin Setup</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Use this component to set up your admin user. Remove this component after setup.
      </p>

      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={handleSetup}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#a88757',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Setting up...' : 'Setup Admin'}
      </button>

      {message && (
        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default AdminSetup
