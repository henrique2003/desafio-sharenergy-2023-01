import ContentItem from './ContentItem'
import './styles.css'

export interface IRamdomUser {
  name: {
    first: string,
    last: string
  },
  email: string,
  dob: {
    age: number
  },
  cell: string,
  picture: {
    medium: string
    large: string
  },
  login: {
    username: string
  }
  nat: string
}

interface IProps {
  ramdomUser: IRamdomUser
}

const RandomUserItem: React.FC<IProps> = ({ ramdomUser }) => {
  const { picture, name, dob, email, login: { username } } = ramdomUser

  return (
    <button
      type='button'
      className="user_item"
    >
      <img
        src={picture.large}
        alt={`Foto de perilf do usuário ${name.first}`}
        title={`Foto de perilf do usuário ${name.first}`}
      />
      <div className='content'>
        <div>
          <ContentItem
            label='Username'
            text={username}
          />
          <ContentItem
            label='Nome'
            text={`${name.first}${name.last}`}
          />
        </div>
        <div>
          <ContentItem
            label='Idade'
            text={dob.age}
          />
          <ContentItem
            label='Email'
            text={email}
          />
        </div>
      </div>
    </button>
  )
}

export default RandomUserItem
