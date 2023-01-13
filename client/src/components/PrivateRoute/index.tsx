import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'
import { UserContext } from '../../context/user/index'
import setAuthorization from '../../utils/setAuthorization';

interface IProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<IProps> = ({ children }): React.ReactElement => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useContext(UserContext)

  useEffect(() => {
    async function auth(): Promise<void> {
      try {
        setLoading(true)

        const token = JSON.parse(localStorage.getItem('token') as string)

        if (!token) {
          return navigate('/')
        }

        setAuthorization()
        const { data } = await api.get('/user')

        login(data.user)

        setLoading(false)
      } catch (error) {
        return navigate('/')
      }
    }

    auth()
  }, [])

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute
