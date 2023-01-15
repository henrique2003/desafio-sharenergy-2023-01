import { AiOutlineEdit } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

import { maskCpf, maskPhone } from '../../utils/maskers'
import './styles.css'

export interface IClient {
  _id: string
  name: string
  email: string
  phone: number
  address: string
  cpf: number
}

interface IProps {
  client: IClient
  handleEdit: (client: IClient) => void
  handleDestroy: (id: string) => void
}

const ClientItem: React.FC<IProps> = ({ client, handleEdit, handleDestroy }) => {
  const { email, name, phone, cpf, address } = client

  return (
    <div className="client_item">
      <div className="client_content">
        <div className="client_content_item">
          <div className="border"></div>
          <div>
            <h4>Nome:</h4>
            <p>{name}</p>
          </div>
        </div>
        <div className="client_content_item">
          <div className="border"></div>
          <div>
            <h4>Email:</h4>
            <p>{email}</p>
          </div>
        </div>
        <div className="client_content_item">
          <div className="border"></div>
          <div>
            <h4>Telefone:</h4>
            <p>{maskPhone(phone.toString())}</p>
          </div>
        </div>
        <div className="client_content_item">
          <div className="border"></div>
          <div>
            <h4>Cpf:</h4>
            <p>{maskCpf(cpf.toString())}</p>
          </div>
        </div>
        <div className="client_content_item">
          <div className="border"></div>
          <div>
            <h4>Endereço:</h4>
            <p>{address}</p>
          </div>
        </div>
      </div>
      <div className="client_item_actions">
        <button type='button' onClick={() => handleEdit(client)}>
          <AiOutlineEdit />
        </button>
        <button type='button' onClick={() => handleDestroy(client._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default ClientItem