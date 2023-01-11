import { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import Checkbox from '../../components/Checkbox'
import validateEmptyField from '../../utils/validateEmptyField'
import './styles.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberLogin, setRememberLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    if (!validateEmptyField(username)) {
      return setLoading(false)
    }

    if (!validateEmptyField(password)) {
      return setLoading(false)
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
