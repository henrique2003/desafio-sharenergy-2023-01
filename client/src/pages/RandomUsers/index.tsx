import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import axios from 'axios'

import UserItem, { IRamdomUser } from '../../components/RandomUserItem'
import './styles.css'

const Users: React.FC = () => {
  const [users, setUsers] = useState<IRamdomUser[]>([])
  const [inputFilter, setInputFilter] = useState('')

  useEffect(() => {
    async function loadRadomUsers(): Promise<void> {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=100')

        setUsers(data.results)
      } catch (error) {
        console.log(error);
      }
    }

    loadRadomUsers()
  }, [])

  function filterUsers(): IRamdomUser[] {
    const allUser = [] as IRamdomUser[]

    users.map(user => {
      const fullname = `${user.name.first.toLocaleLowerCase()} ${user.name.last.toLocaleLowerCase()}`
      if (fullname.includes(inputFilter.trim().toLocaleLowerCase())) {
        allUser.push(user)
      } else if (user.email.includes(inputFilter.trim().toLocaleLowerCase())) {
        allUser.push(user)
      } else if (user.login.username.includes(inputFilter.trim().toLocaleLowerCase())) {
        allUser.push(user)
      } else {
        return user
      }
    })

    return allUser
  }

  const filteredUsers = filterUsers()

  function onChangeFilter(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputFilter(e.target.value)
  }

  return (
    <div className='users'>
      <header>
        <h1>Usuários encontrados: {users.length}</h1>
        <div>
          <input
            placeholder='Filtro'
            type="text"
            onChange={onChangeFilter}
          />
          <BiSearchAlt2 />
        </div>
      </header>
      <section className="list">
        {filteredUsers.length > 0 && (
          filteredUsers.map((item, i) => (
            <UserItem key={i} ramdomUser={item} />
          )))}
      </section>
    </div>
  )
}

export default Users