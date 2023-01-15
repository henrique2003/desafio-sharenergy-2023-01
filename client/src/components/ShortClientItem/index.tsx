import { IClient } from '../ClientItem'
import './styles.css'

interface IProps {
  client: IClient
  handleShowOne: (client: IClient) => void
}

const ShortClientItem: React.FC<IProps> = ({ client, handleShowOne }) => {
  const { email, name } = client

  return (
    <button className="short_client_item" type='button' onClick={() => handleShowOne(client)}>
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
      </div>
    </button>
  )
}

export default ShortClientItem