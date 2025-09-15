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
  apiKey: 'AIzaSyDM-Edju6Xw160BQS89XGwhugZuQ247b9I',
  authDomain: 'therapyforblkmen.firebaseapp.com',
  databaseURL: 'https://therapyforblkmen-default-rtdb.firebaseio.com',
  projectId: 'therapyforblkmen',
  storageBucket: 'therapyforblkmen.firebasestorage.app',
  messagingSenderId: '831685819013',
  appId: '1:831685819013:web:cec419d61a3fa6a97b07ec',
  measurementId: 'G-FXDTHDP8TS',
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
