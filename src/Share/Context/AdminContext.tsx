import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../FireBase'

interface AdminData {
  email: string
  role: string
  name: string
  isActive: boolean
}

interface AdminContextType {
  isAdmin: boolean
  adminData: AdminData | null
  loading: boolean
  checkAdminStatus: () => Promise<boolean>
  signOutAdmin: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

interface AdminProviderProps {
  children: ReactNode
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  // Function to check admin status by verifying against Firestore
  const checkAdminStatus = useCallback(async (): Promise<boolean> => {
    try {
      const user = auth.currentUser
      if (!user) {
        setIsAdmin(false)
        setAdminData(null)
        return false
      }

      // Always verify against Firestore - never trust client-side state
      const adminDocRef = doc(db, 'admins', user.uid)
      const adminDoc = await getDoc(adminDocRef)

      if (adminDoc.exists()) {
        const data = adminDoc.data() as AdminData
        if (data.isActive !== false) {
          setIsAdmin(true)
          setAdminData(data)
          return true
        }
      }

      // If we reach here, user is not an admin
      setIsAdmin(false)
      setAdminData(null)
      return false
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
      setAdminData(null)
      return false
    }
  }, [])

  // Function to sign out admin
  const signOutAdmin = async (): Promise<void> => {
    try {
      await auth.signOut()
      setIsAdmin(false)
      setAdminData(null)
    } catch (error) {
      console.error('Error signing out admin:', error)
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        // User is signed in, check if they're an admin
        await checkAdminStatus()
      } else {
        // User is signed out
        setIsAdmin(false)
        setAdminData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [checkAdminStatus])

  const value: AdminContextType = {
    isAdmin,
    adminData,
    loading,
    checkAdminStatus,
    signOutAdmin,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

// Custom hook to use admin context
export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

// Higher-order component to protect admin routes
export const withAdminProtection = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isAdmin, loading } = useAdmin()

    if (loading) {
      return <div>Loading...</div>
    }

    if (!isAdmin) {
      return <div>Access denied. Admin privileges required.</div>
    }

    return <Component {...props} />
  }
}
