import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Sidebar from '../../Components/sidebar'

import AdminDashboard from './Dashboard'
import Adminbloges from './Adminblog'
import AdminCoaches from './AdminCoaches'
import AdminTherapists from './Admintherapist'
import AdminAppoinments from './AdminAppoints'
import AdminLoginModal from '../../Components/AdminLogin'

export default function AdminPanel() {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'

    if (!isAdmin) {
      setShowLogin(true)
    }
  }, [])

  const handleLoginSuccess = () => {
    setShowLogin(false)
    navigate('/admin/dashboard')
  }

  return (
    <div>
      {showLogin && <AdminLoginModal onLogin={handleLoginSuccess} />}
      {!showLogin && (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            background: '#f5f5f5',
            padding: '20px',
            boxSizing: 'border-box',
            gap: '20px',
          }}
        >
          <Sidebar />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloges"
              element={
                <ProtectedRoute>
                  <Adminbloges />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coaches"
              element={
                <ProtectedRoute>
                  <AdminCoaches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapist"
              element={
                <ProtectedRoute>
                  <AdminTherapists />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <AdminAppoinments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

interface Props {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
