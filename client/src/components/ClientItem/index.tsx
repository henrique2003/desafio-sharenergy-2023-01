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
}

const ClientItem: React.FC<IProps> = ({ client, handleEdit }) => {
  const { _id, email, name } = client

  return (
    <button className="client_item" type='button' onClick={() => handleEdit(client)}>
      <div className="client_content">
        <div className="client_content_item">
          <div className="dot"></div>
          <div>
            <h4>Nome:</h4>
            <p>{name}</p>
          </div>
        </div>
        <div className="client_content_item">
          <div className="dot"></div>
          <div>
            <h4>Email:</h4>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default ClientItem