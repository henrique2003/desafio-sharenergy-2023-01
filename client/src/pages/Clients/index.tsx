import { useState, useEffect, FormEvent } from 'react'
import { Id, toast } from 'react-toastify'
import { BiPlus } from 'react-icons/bi'

import './styles.css'
import { IClient } from '../../components/ClientItem'
import api from '../../services/api'
import setAuthorization from '../../utils/setAuthorization'
import { isEqualLength, validateCpf, validateEmail, validateEmptyField } from '../../utils'
import { emptyField, invalidField } from '../../helpers/error-messages'
import { maskPhone, maskCpf } from '../../utils/maskers'
import { ClientItem } from '../../components'

export type IAction = 'create' | 'edit' | 'show'

interface IUpdateClientData {
  name?: string
  email?: string
  phone?: number
  address?: string
  cpf?: number
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [currentClientId, setCurrentClientId] = useState('')
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

  function handleEdit(client: IClient): void {
    const { _id, name, email, phone, address, cpf } = client

    setCurrentClientId(_id)

    // Set current name on form
    setName(name)
    setEmail(email)
    setPhone(phone.toString())
    setAddress(address)
    setCpf(cpf.toString())

    setAction('edit')
  }

  function handleShow(): void {
    clearFields()
    setAction('show')
  }

  async function destroy(id: string): Promise<void> {
    try {
      await api.delete(`/client/${id}`)

      setClients(clients.filter(client => client._id !== id))
      setAction('show')

      clearFields()

      toast.success('Cliente deletado com sucesso')
    } catch (error) {
      toast.error('Erro ao deletar cliente')
    }
  }

  async function create(): Promise<void | Id> {
    try {
      if (!validateEmptyField(name)) {
        return toast.error(emptyField('Nome'))
      }

      if (!validateEmail(email)) {
        return toast.error(invalidField('Email'))
      }

      if (!isEqualLength(phone, 10)) {
        return toast.error(invalidField('Telefone'))
      }

      if (!validateCpf(cpf)) {
        return toast.error(invalidField('Cpf'))
      }

      if (!validateEmptyField(address)) {
        return toast.error(emptyField('Endereço'))
      }

      const { data } = await api.post('/client/create', {
        name,
        email,
        phone,
        cpf,
        address
      })

      setClients([...clients, data.client])
      handleShow()

      toast.success('Cliente cadastrado com sucesso')
    } catch (error) {
      toast.error('Erro ao cadastar cliente')
    }
  }

  async function edit(): Promise<void | Id> {
    try {
      let client: IUpdateClientData = {}

      if (validateEmptyField(name)) client.name = name

      if (validateEmptyField(email) && validateEmail(email)) client.email = email

      if (validateEmptyField(phone) && isEqualLength(phone, 10)) client.phone = parseInt(phone)

      if (validateEmptyField(cpf) && validateCpf(cpf)) client.cpf = parseInt(cpf)

      if (validateEmptyField(address)) client.address = address

      const { data } = await api.put(`/client/${currentClientId}`, client)

      // Update state
      setClients(clients.map(clientItem => {
        if (clientItem._id === currentClientId) {
          client.name && (clientItem.name = client.name)
          client.email && (clientItem.email = client.email)
          client.phone && (clientItem.phone = client.phone)
          client.cpf && (clientItem.cpf = client.cpf)
          client.address && (clientItem.address = client.address)
        }

        return clientItem
      }))

      handleShow()

      setCurrentClientId('')
      toast.success('Cliente editado com sucesso')
    } catch (error) {
      toast.error('Erro ao editado cliente')
    }
  }

  function onSubmit(e: FormEvent): void {
    e.preventDefault()

    action === 'create' ? create() : edit()
  }

  function clearFields(): void {
    setName('')
    setEmail('')
    setPhone('')
    setCpf('')
    setAddress('')
  }

  return (
    <div className='clients'>
      <header>
        <h1>{action === 'show' ? 'Clientes cadastrados' : action === 'create' ? 'Cria cliente' : `Cliente: ${name}`}</h1>
        {action === 'show' && (
          <button type='button' className='client_button' onClick={() => setAction('create')}>
            <BiPlus />Criar cliente
          </button>
        )}
        {action !== 'show' && (
          <button type='button' className='client_button' onClick={() => handleShow()}>
            Ver Clientes
          </button>
        )}
      </header>
      {/* Show all Clients */}
      {action === 'show' && clients.length > 0 && (
        <div className="client_list">
          {clients.map(client => (
            <ClientItem
              key={client._id}
              client={client}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
      {action === 'show' && clients.length === 0 && (
        <div className="client_message">
          <p>Nenhum cliente cadastrado</p>
        </div>
      )}
      {/* Create, Edit or Delete Client */}
      {action !== 'show' && (
        <form className="client_form" onSubmit={e => onSubmit(e)}>
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
                placeholder='Ex: (11) 2649-7963'
                value={maskPhone(phone)}
                onChange={e => setPhone(maskPhone(e.target.value).replace(/\D/g, ''))}
              />
            </div>
            <div className="client_group">
              <label htmlFor="cpf">Cpf:</label>
              <input
                id="cpf"
                type="text"
                placeholder='Ex: 516.615.318-90'
                value={maskCpf(cpf)}
                onChange={e => setCpf(maskCpf(e.target.value).replace(/\D/g, ''))}
                maxLength={14}
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
          <div className='client_form_actions'>
            <button type='submit'>{action === 'create' ? 'Cadastrar' : 'Editar'}</button>
            {action === 'edit' && (
              <button type='button' onClick={() => destroy(currentClientId)}>Deletar</button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

export default Clients