import Router from '../router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

export default App
