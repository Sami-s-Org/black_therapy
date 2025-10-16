import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Sidebar from '../../Components/sidebar'
import { useAdmin, AdminProvider } from '../../Share/Context/AdminContext'
import AdminLoginModal from '../../Components/AdminLogin'

import AdminDashboard from './Dashboard'
import Adminbloges from './Adminblog'
import AdminCoaches from './AdminCoaches'
import AdminTherapists from './Admintherapist'
import AdminAppoinments from './AdminAppoints'
import AdminResource from './AdminResource'
import AdminFreeTheapy from './AdminfreeTheapy'
import AdminContact from './AdminContactlist'
import AdminNewLetterlist from './AdminNewLetterlist'

// Internal AdminPanel component that uses the AdminContext
function AdminPanelContent() {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()
  const { isAdmin, loading, checkAdminStatus } = useAdmin()

  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        setShowLogin(true)
      } else {
        setShowLogin(false)
        // Only navigate to dashboard if we're at the root admin path
        if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
          navigate('/admin/dashboard')
        }
      }
    }
  }, [isAdmin, loading, navigate])

  const handleLoginSuccess = async () => {
    const adminStatus = await checkAdminStatus()
    if (adminStatus) {
      setShowLogin(false)
      navigate('/admin/dashboard')
    }
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

  return (
    <div>
      {showLogin && <AdminLoginModal onLogin={handleLoginSuccess} />}
      {!showLogin && isAdmin && (
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
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="bloges"
              element={
                <ProtectedRoute>
                  <Adminbloges />
                </ProtectedRoute>
              }
            />
            <Route
              path="coaches"
              element={
                <ProtectedRoute>
                  <AdminCoaches />
                </ProtectedRoute>
              }
            />
            <Route
              path="FreeTherapy"
              element={
                <ProtectedRoute>
                  <AdminFreeTheapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="newLetters"
              element={
                <ProtectedRoute>
                  <AdminNewLetterlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="ContactList"
              element={
                <ProtectedRoute>
                  <AdminContact />
                </ProtectedRoute>
              }
            />
            <Route
              path="therapist"
              element={
                <ProtectedRoute>
                  <AdminTherapists />
                </ProtectedRoute>
              }
            />
            <Route
              path="appointments"
              element={
                <ProtectedRoute>
                  <AdminAppoinments />
                </ProtectedRoute>
              }
            />
            <Route
              path="resources"
              element={
                <ProtectedRoute>
                  <AdminResource />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

// Main AdminPanel component that wraps the content with AdminProvider
export default function AdminPanel() {
  return (
    <AdminProvider>
      <AdminPanelContent />
    </AdminProvider>
  )
}

interface Props {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin, loading } = useAdmin()

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
        Loading...
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
