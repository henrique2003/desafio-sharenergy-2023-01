import { FormEvent, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import './styles.css'
import Checkbox from '../../components/Checkbox'
import api from '../../services/api'
import validateEmptyField from '../../utils/validateEmptyField'
import { UserContext } from '../../context/user'
import { emptyField, invalidField } from '../../helpers/error-messages'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberLogin, setRememberLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useContext(UserContext)

  useEffect(() => {
    async function auth(): Promise<void> {
      try {
        const token = JSON.parse(localStorage.getItem('token') as string)

        if (!token) return

        const { data } = await api.get('/user', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        login(data.user)
        navigate('/random-users')
      } catch (error) {
        return
      }
    }

    auth()
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    if (!validateEmptyField(username)) {
      setLoading(false)
      return toast.error(emptyField('Usuário'))
    }

    if (!validateEmptyField(password)) {
      setLoading(false)
      return toast.error(emptyField('Senha'))
    }

    try {
      const { data } = await api.post('/user/login', {
        username,
        password,
        rememberLogin
      })

      localStorage.setItem('token', JSON.stringify(data.token))

      login(data.user)
      navigate('/random-users')

      setLoading(false)
      toast.success('Logado com sucesso')
    } catch (error) {
      toast.error(invalidField('Email ou senha'))
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          active={rememberLogin}
          onClick={() => setRememberLogin(!rememberLogin)}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <ClipLoader
              loading
              color="white"
              size={18}
              aria-label="Loading Spinner"
              data-testid="loader"
              className='loading'
            />
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Login
