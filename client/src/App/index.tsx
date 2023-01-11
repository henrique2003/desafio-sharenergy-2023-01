import { UserProvider } from '../context/user'
import Router from '../router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  return (
    <UserProvider>
      <>
        <Router />
        <ToastContainer />
      </>
    </UserProvider>
  )
}

export default App
