import { useEffect } from 'react'
import './App.css'
import AppRouter from './Share/Routing'
import { onAuthStateChanged } from 'firebase/auth'
import { notifyError, notifySuccess } from './Components/Toast'
import { auth } from './Share/FireBase'

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        notifySuccess('Firebase connected. User:')
      } else {
        notifyError('Firebase connected. No user signed in.')
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    // <p>Under development</p>
    <div>
      <AppRouter />
    </div>
  )
}

export default App
