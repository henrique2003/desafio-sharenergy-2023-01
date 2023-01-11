import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'
import { UserContext } from '../../context/user/index'

interface IProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<IProps> = ({ children }): React.ReactElement => {
  const navigate = useNavigate()
  const { login, user } = useContext(UserContext)

  useEffect(() => {
    async function auth(): Promise<void> {
      try {
        if (!user._id) {
          return navigate('/')
        }

        const token = JSON.parse(localStorage.getItem('token') as string)

        if (!token) {
          return navigate('/')
        }

        const { data } = await api.get('/user', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        login(data.user)
      } catch (error) {
        return navigate('/')
      }
    }

    auth()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute
