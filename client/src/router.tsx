import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import { StatusCode, RandomUsers, Login, Dogs, NotFound } from './pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/random-users" element={
          <PrivateRoute>
            <RandomUsers />
          </PrivateRoute>
        } />
        <Route path="/status-code" element={
          <PrivateRoute>
            <StatusCode />
          </PrivateRoute>
        } />
        <Route path="/cachorros" element={
          <PrivateRoute>
            <Dogs />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
