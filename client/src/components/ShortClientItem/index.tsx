import './styles.css'

export interface IClient {
  _id: string
  name: string
  email: string
  phone: number
  address: string
  cpf: number
  createdAt: string
  updatedAt: string
}

interface IProps {
  client: IClient
  destroy: (_id: string) => Promise<void>
  handleEdit: () => void
}

const ShortClientItem: React.FC<IProps> = ({ client, destroy, handleEdit }) => {
  const { _id, email, name, createdAt } = client

  return (
    <div className="short_client_item">
      <div className="short_client_content">
        <div className="short_client_content_item">
          <div className="dot"></div>
          <div>
            <h4>Nome:</h4>
            <p>{name}</p>
          </div>
        </div>
        <div className="short_client_content_item">
          <div className="dot"></div>
          <div>
            <h4>Email:</h4>
            <p>{email}</p>
          </div>
        </div>
        <div className="short_client_content_item">
          <div className="dot"></div>
          <div>
            <h4>Criado em:</h4>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
      <div className="short_client_actions">
        <button type='button' className='short_client_button' onClick={() => handleEdit()}>
          Editar
        </button>
        <button type='button' className='short_client_button' onClick={() => destroy(_id)}>
          Deletar
        </button>
      </div>
    </div>
  )
}

export default ShortClientItem