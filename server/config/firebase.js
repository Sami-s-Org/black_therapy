const admin = require('firebase-admin')
const serviceAccount = require('./therapyforblkmen-firebase-adminsdk.json')

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    }
    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error)
    throw error
  }
}

const getFirestore = () => {
  return admin.firestore()
}

const getAuth = () => {
  return admin.auth()
}

module.exports = {
  initializeFirebase,
  getFirestore,
  getAuth,
  admin,
}
