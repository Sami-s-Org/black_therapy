import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { app } from './index.js'

const db = getFirestore(app)

/**
 * Function to add an admin user to Firestore
 * @param {string} uid - The user's UID from Firebase Auth
 * @param {string} email - The admin's email address
 * @param {string} role - The admin role (default: 'admin')
 * @param {string} name - The admin's name (optional)
 */
export const addAdminUser = async (uid, email, role = 'admin', name = '') => {
  try {
    await setDoc(doc(db, 'admins', uid), {
      email: email,
      role: role,
      name: name,
      createdAt: new Date(),
      isActive: true,
    })
    console.log(`Admin user ${email} added successfully`)
    return true
  } catch (error) {
    console.error('Error adding admin user:', error)
    return false
  }
}

/**
 * Function to remove an admin user from Firestore
 * @param {string} uid - The user's UID to remove
 */
export const removeAdminUser = async (uid) => {
  try {
    await setDoc(doc(db, 'admins', uid), {
      isActive: false,
      removedAt: new Date(),
    })
    console.log(`Admin user ${uid} removed successfully`)
    return true
  } catch (error) {
    console.error('Error removing admin user:', error)
    return false
  }
}

/**
 * Function to update admin user role
 * @param {string} uid - The user's UID
 * @param {string} newRole - The new role
 */
export const updateAdminRole = async (uid, newRole) => {
  try {
    await setDoc(
      doc(db, 'admins', uid),
      {
        role: newRole,
        updatedAt: new Date(),
      },
      { merge: true }
    )
    console.log(`Admin role updated to ${newRole} for user ${uid}`)
    return true
  } catch (error) {
    console.error('Error updating admin role:', error)
    return false
  }
}
