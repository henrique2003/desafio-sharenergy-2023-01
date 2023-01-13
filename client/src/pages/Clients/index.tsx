import { useState, useEffect, FormEvent } from 'react';
import { BiPlus } from 'react-icons/bi'

import './styles.css'
import ShortClientItem from '../../components/ShortClientItem/index'
import { IClient } from '../../components/ShortClientItem/index'
import { toast } from 'react-toastify'
import api from '../../services/api'
import setAuthorization from '../../utils/setAuthorization'

export type IAction = 'create' | 'edit' | 'show'

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [action, setAction] = useState<IAction>('show')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    async function loadClients(): Promise<void> {
      try {
        const { data } = await api.get('/client')

        setClients(data.clients)
      } catch (error) {
        console.log('Error on load clients')
      }
    }

    setAuthorization()
    loadClients()
  }, [])

  function handleEdit(): void {
    setAction('edit')
  }

  async function destroy(id: string): Promise<void> {
    try {
      await api.delete(`/client/${id}`)

      setClients(clients.filter(client => client._id !== id))

      toast.success('Client deletado com sucesso')
    } catch (error) {
      toast.error('Erro ao deletar cliente')
    }
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    try {
      e.preventDefault()


    } catch (error) {
      toast.error('Erro ao cadastar cliente')
    }
  }

  return (
    <div className='clients'>
      <header>
        <h1>Clientes cadastrados</h1>
        {action === 'show' && (
          <button type='button' className='create_client' onClick={() => setAction('create')}>
            <BiPlus />Criar cliente
          </button>
        )}
        {action === 'create' && (
          <button type='button' className='create_client' onClick={() => setAction('show')}>
            Ver Clientes
          </button>
        )}
      </header>
      {action === 'show' && clients.length > 0 && (
        <div className="client_list">
          {clients.map(client => (
            <ShortClientItem
              key={client._id}
              client={client}
              handleEdit={handleEdit}
              destroy={destroy}
            />
          ))}
        </div>
      )}
      {action === 'show' && clients.length === 0 && (
        <div className="client_message">
          <p>Nenhum cliente cadastrado</p>
        </div>
      )}
      {action === 'create' && (
        <form className="clients_create_form" onSubmit={e => onSubmit(e)}>
          <div className="row">
            <div className="client_group">
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                type="text"
                placeholder='Ex: Henrique'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="client_group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder='Ex: henrique@gmail.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="client_group">
              <label htmlFor="phone">Telefone:</label>
              <input
                id="phone"
                type="text"
                placeholder='Ex: (11)959426382'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="client_group">
              <label htmlFor="cpf">Cpf:</label>
              <input
                id="cpf"
                type="text"
                placeholder='Ex: 516.615.318-90'
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </div>
            <div className="client_group">
              <label htmlFor="address">Endereço:</label>
              <input
                id="address"
                type="text"
                placeholder='Ex: Rua Cipriano barata 1051'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      )}
    </div>
  )
}

export default Clients