import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCLLn-e3901uJNhde0kbskoRZddtETPz7A',
//   authDomain: 'blacktesting-d3b64.firebaseapp.com',
//   databaseURL: 'https://blacktesting-d3b64-default-rtdb.firebaseio.com',
//   projectId: 'blacktesting-d3b64',
//   storageBucket: 'blacktesting-d3b64.appspot.com',
//   messagingSenderId: '622094469052',
//   appId: '1:622094469052:web:ef9c30c3fa9f8f8eee8db9',
//   measurementId: 'G-20DXJWQEYN',
// }
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
export const realtimeDB = getDatabase(app)

export { db, auth, storage, googleProvider, facebookProvider, firestore, app }
