import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addAdminUser } from './adminSetup.js'
import { app } from './index.js'

const auth = getAuth(app)

/**
 * Setup script to create admin user
 * Run this once to set up your admin user
 */
export const setupAdmin = async (email, password, name = 'Admin User') => {
  try {
    console.log('Setting up admin user...')

    // First, create the user account in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log('User created in Firebase Auth:', user.uid)

    // Then add them to the admins collection
    const success = await addAdminUser(user.uid, email, 'admin', name)

    if (success) {
      console.log('✅ Admin setup completed successfully!')
      console.log('Email:', email)
      console.log('UID:', user.uid)
      console.log('Role: admin')
    } else {
      console.log('❌ Failed to add user to admins collection')
    }

    return success
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists. Adding to admins collection...')

      // Try to sign in to get the UID
      try {
        const signInCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = signInCredential.user

        const success = await addAdminUser(user.uid, email, 'admin', name)

        if (success) {
          console.log('✅ Admin setup completed successfully!')
          console.log('Email:', email)
          console.log('UID:', user.uid)
          console.log('Role: admin')
        }

        return success
      } catch (signInError) {
        console.error('Error signing in existing user:', signInError)
        return false
      }
    } else {
      console.error('Error setting up admin:', error)
      return false
    }
  }
}

// Example usage:
// setupAdmin('info@therapyforblackmen.org', 'your-secure-password', 'Admin Name')
