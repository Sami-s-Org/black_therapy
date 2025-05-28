import './App.css'
import AppRouter from './Share/Routing'
function App() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       notifySuccess('Firebase connected. User:')
  //     } else {
  //       notifyError('Firebase connected. No user signed in.')
  //     }
  //   })

  //   return () => unsubscribe()
  // }, [])
  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
