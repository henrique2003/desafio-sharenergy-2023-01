import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import axios from 'axios'

import UserItem, { IRamdomUser } from '../../components/RandomUserItem'
import './styles.css'

const Users: React.FC = () => {
  const [users, setUsers] = useState<IRamdomUser[]>([])

  useEffect(() => {
    async function loadRadomusers(): Promise<void> {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=100')

        setUsers(data.results)
      } catch (error) {
        console.log(error);
      }
    }

    loadRadomusers()
  }, [])

  return (
    <div className='users'>
      <header>
        <h1>Usuários encontrados: {users.length}</h1>
        <div>
          <input
            placeholder='Filtro'
            type="text"
          />
          <BiSearchAlt2 />
        </div>
      </header>
      <section className="list">
        {users.length > 0 && (
          users.map((item, i) => (
            <UserItem key={i} ramdomUser={item} />
          )))}
      </section>
    </div>
  )
}

export default Users