const admin = require('firebase-admin')

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      // Try Firebase Admin SDK's built-in environment variable support first
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.log('Using GOOGLE_APPLICATION_CREDENTIALS for Firebase initialization')
        admin.initializeApp()
      }
      // Check if we have custom environment variables for Firebase
      else if (
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_PRIVATE_KEY &&
        process.env.FIREBASE_CLIENT_EMAIL
      ) {
        // Use environment variables
        // Handle private key formatting - it might come with or without quotes
        let privateKey = process.env.FIREBASE_PRIVATE_KEY
        if (privateKey) {
          // Remove surrounding quotes if present
          privateKey = privateKey.replace(/^["']|["']$/g, '')
          // Replace escaped newlines with actual newlines
          privateKey = privateKey.replace(/\\n/g, '\n')
          // Ensure the key starts and ends with proper markers
          if (!privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('BEGIN RSA PRIVATE KEY')) {
            console.warn('Warning: Private key format may be incorrect. Ensure it includes proper BEGIN/END markers.')
          }
        }

        const serviceAccount = {
          type: 'service_account',
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
          private_key: privateKey,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID || '',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
        }

        console.log('Initializing Firebase with environment variables...')
        console.log('Project ID:', process.env.FIREBASE_PROJECT_ID)
        console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL)
        console.log('Private Key Length:', privateKey ? privateKey.length : 0)
        console.log('Private Key Starts with:', privateKey ? privateKey.substring(0, 50) + '...' : 'undefined')

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        })
      } else {
        // Try to use service account file (fallback)
        try {
          const serviceAccount = require('./therapyforblkmen-firebase-adminsdk.json')
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          })
        } catch (fileError) {
          throw new Error(
            'Firebase configuration not found. Please set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL environment variables, set GOOGLE_APPLICATION_CREDENTIALS, or provide a service account JSON file.'
          )
        }
      }
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
