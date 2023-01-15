import { useState, useEffect, FormEvent } from 'react'
import { Id, toast } from 'react-toastify'
import { BiPlus } from 'react-icons/bi'

import './styles.css'
import { IClient } from '../../components/ClientItem'
import api from '../../services/api'
import { isEqualLength, validateCpf, validateEmail, validateEmptyField, maskPhone, maskCpf, setAuthorization } from '../../utils'
import { clientActionError, clientActionSuccess, emptyField, invalidField } from '../../helpers/error-messages'
import { ClientItem, ShortClientItem } from '../../components'

export type IAction = 'create' | 'edit' | 'show' | 'show-one'

interface IUpdateClientData {
  name?: string
  email?: string
  phone?: number
  address?: string
  cpf?: number
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [currentClient, setCurrentClient] = useState<IClient>({
    _id: '',
    name: '',
    email: '',
    phone: 0,
    cpf: 0,
    address: ''
  })
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

  function handleShowOne(client: IClient): void {
    setCurrentClient(client)

    setAction('show-one')
  }

  function handleEdit(): void {
    const { name, email, phone, address, cpf } = currentClient

    // Set current form data
    setName(name)
    setEmail(email)
    setPhone(phone.toString())
    setAddress(address)
    setCpf(cpf.toString())

    setAction('edit')
  }

  function handleShow(): void {
    clearFields()
    clearCurrentClient()
    setAction('show')
  }

  async function handleDestroy(id: string): Promise<void> {
    await destroy(id)
    clearCurrentClient()
    setAction('show')
  }

  async function destroy(id: string): Promise<void> {
    try {
      await api.delete(`/client/${id}`)

      setClients(clients.filter(client => client._id !== id))

      toast.success(clientActionSuccess('deletado'))
    } catch (error) {
      toast.error(clientActionError('deletar'))
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

      toast.success(clientActionSuccess('cadastrado'))
    } catch (error) {
      toast.error(clientActionError('cadastar'))
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

      const { data } = await api.put(`/client/${currentClient._id}`, client)

      // Update state
      setClients(clients.map(clientItem => {
        if (clientItem._id === currentClient._id) {
          client.name && (clientItem.name = data.client.name)
          client.email && (clientItem.email = data.client.email)
          client.phone && (clientItem.phone = data.client.phone)
          client.cpf && (clientItem.cpf = data.client.cpf)
          client.address && (clientItem.address = data.client.address)
        }

        return clientItem
      }))

      handleShow()

      clearCurrentClient()
      toast.success(clientActionSuccess('editado'))
    } catch (error) {
      toast.error(clientActionError('editar'))
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

  function clearCurrentClient(): void {
    setCurrentClient({
      _id: '',
      name: '',
      email: '',
      phone: 0,
      cpf: 0,
      address: ''
    })
  }

  function currentTitle(): string {
    if (action === 'show') return 'Clientes cadastrados'
    else if (action === 'create') return 'Criar cliente'
    else return `Cliente: ${currentClient.name}`
  }

  return (
    <div className='clients'>
      <header>
        <h1>{currentTitle()}</h1>
        {action === 'show' ? (
          <button type='button' className='client_button' onClick={() => setAction('create')}>
            <BiPlus />Criar cliente
          </button>
        ) : (
          <button type='button' className='client_button' onClick={() => handleShow()}>
            Ver clientes
          </button>
        )}
      </header>
      {/* Show all Clients */}
      {action === 'show' && clients.length > 0 && (
        <div className="client_list">
          {clients.map(client => (
            <ShortClientItem
              key={client._id}
              client={client}
              handleShowOne={handleShowOne}
            />
          ))}
        </div>
      )}
      {/* Show message when there are no clients */}
      {action === 'show' && clients.length === 0 && (
        <div className="client_message">
          <p>Nenhum cliente cadastrado</p>
        </div>
      )}
      {/* Create, Edit or Delete Client */}
      {(action === 'create' || action === 'edit') && (
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
          </div>
        </form>
      )}
      {/* Show a unique client */}
      {action === 'show-one' && (
        <ClientItem
          client={currentClient}
          handleDestroy={handleDestroy}
          handleEdit={handleEdit}
        />
      )}
    </div>
  )
}

export default Clients