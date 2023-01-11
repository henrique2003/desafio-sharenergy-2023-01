import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { StatusCode, RandomUsers, Login, Dogs } from './pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/random-users" element={<RandomUsers />} />
        <Route path="/status" element={<StatusCode />} />
        <Route path="/cachorros" element={<Dogs />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
