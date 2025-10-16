import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

/**
 * Check if the current user is an admin
 * @returns {Promise<boolean>}
 */
export const isUserAdmin = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      return false
    }

    // Always verify against Firestore - never trust client-side state
    const adminDocRef = doc(db, 'admins', user.uid)
    const adminDoc = await getDoc(adminDocRef)

    if (adminDoc.exists()) {
      const adminData = adminDoc.data()
      return adminData.isActive !== false // Check if admin is active
    }

    return false
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Get admin user data
 * @returns {Promise<Object|null>}
 */
export const getAdminUserData = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      return null
    }

    // Always verify against Firestore
    const adminDocRef = doc(db, 'admins', user.uid)
    const adminDoc = await getDoc(adminDocRef)

    if (adminDoc.exists()) {
      const adminData = adminDoc.data()
      if (adminData.isActive !== false) {
        return adminData
      }
    }

    return null
  } catch (error) {
    console.error('Error getting admin data:', error)
    return null
  }
}

/**
 * Check if user has specific admin role
 * @param {string} requiredRole - The required role to check
 * @returns {Promise<boolean>}
 */
export const hasAdminRole = async (requiredRole) => {
  try {
    const adminData = await getAdminUserData()
    if (!adminData) {
      return false
    }

    return adminData.role === requiredRole
  } catch (error) {
    console.error('Error checking admin role:', error)
    return false
  }
}

/**
 * Sign out admin
 */
export const signOutAdmin = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.error('Error signing out admin:', error)
  }
}

/**
 * Verify admin status with additional security checks
 * This function should be called before any admin operation
 * @returns {Promise<{isAdmin: boolean, adminData: Object|null, error: string|null}>}
 */
export const verifyAdminStatus = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      return { isAdmin: false, adminData: null, error: 'No authenticated user' }
    }

    // Verify email is verified (optional security measure)
    if (!user.emailVerified) {
      return { isAdmin: false, adminData: null, error: 'Email not verified' }
    }

    // Check admin status in Firestore
    const adminDocRef = doc(db, 'admins', user.uid)
    const adminDoc = await getDoc(adminDocRef)

    if (adminDoc.exists()) {
      const adminData = adminDoc.data()
      if (adminData.isActive !== false) {
        return { isAdmin: true, adminData, error: null }
      } else {
        return { isAdmin: false, adminData: null, error: 'Admin account deactivated' }
      }
    }

    return { isAdmin: false, adminData: null, error: 'User not found in admin collection' }
  } catch (error) {
    console.error('Error verifying admin status:', error)
    return { isAdmin: false, adminData: null, error: 'Verification failed' }
  }
}
