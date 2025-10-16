import React, { useState, useEffect } from 'react'
import { useAdmin } from '../../Share/Context/AdminContext'
import AdminLogin from '../AdminLogin'

interface AdminRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  fallback = <div>Access denied. Admin privileges required.</div>,
}) => {
  const { isAdmin, loading, checkAdminStatus } = useAdmin()
  const [showLogin, setShowLogin] = useState(false)

  // Re-verify admin status when component mounts
  useEffect(() => {
    if (!loading) {
      checkAdminStatus()
    }
  }, [loading])

  const handleLoginSuccess = () => {
    setShowLogin(false)
    checkAdminStatus()
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666',
        }}
      >
        Verifying admin access...
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div>
        {showLogin ? (
          <AdminLogin onLogin={handleLoginSuccess} />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              gap: '20px',
            }}
          >
            {fallback}
            <button
              onClick={() => setShowLogin(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#a88757',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Admin Login
            </button>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoute
