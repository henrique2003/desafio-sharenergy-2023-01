import api from '../services/api'

export default function setAuthorization(): void {
  const token = JSON.parse(localStorage.getItem('token') as string)

  api.defaults.headers.common.authorization = `Bearer ${token}`
}