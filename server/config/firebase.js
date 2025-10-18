const admin = require('firebase-admin')

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      // If you have a service account JSON file, use:
      // const serviceAccount = require('./serviceAccountKey.json');
      // admin.initializeApp({
      //   credential: admin.credential.cert(serviceAccount)
      // });

      // Or use environment variables:
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      })
    }
    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error)
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
