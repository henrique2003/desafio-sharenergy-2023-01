import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navigation, PrivateRoute } from './components'
import { StatusCode, RandomUsers, Login, Dogs, NotFound } from './pages'
import Clients from './pages/Clients'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/random-users" element={
          <PrivateRoute>
            <>
              <Navigation
                link={{
                  before: {
                    display: false,
                    to: ''
                  },
                  after: {
                    display: true,
                    to: '/status-code'
                  }
                }}
              />
              <RandomUsers />
            </>
          </PrivateRoute>
        } />
        <Route path="/status-code" element={
          <PrivateRoute>
            <>
              <Navigation
                link={{
                  before: {
                    display: true,
                    to: '/random-users'
                  },
                  after: {
                    display: true,
                    to: '/cachorros'
                  }
                }}
              />
              <StatusCode />
            </>
          </PrivateRoute>
        } />
        <Route path="/cachorros" element={
          <PrivateRoute>
            <>
              <Navigation
                link={{
                  before: {
                    display: true,
                    to: '/status-code'
                  },
                  after: {
                    display: true,
                    to: '/clientes'
                  }
                }}
              />
              <Dogs />
            </>
          </PrivateRoute>
        } />
        <Route path="/clientes" element={
          <PrivateRoute>
            <>
              <Navigation
                link={{
                  before: {
                    display: true,
                    to: '/cachorros'
                  },
                  after: {
                    display: false,
                    to: ''
                  }
                }}
              />
              <Clients />
            </>
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
