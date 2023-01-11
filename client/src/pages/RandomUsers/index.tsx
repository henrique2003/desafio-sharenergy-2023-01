import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ReactPaginate from 'react-paginate'
import axios from 'axios'

import UserItem, { IRamdomUser } from '../../components/RandomUserItem'
import './styles.css'

const Users: React.FC = () => {
  const [users, setUsers] = useState<IRamdomUser[]>([])
  const [currentPagination, setCurrentPagination] = useState(0)
  const [inputFilter, setInputFilter] = useState('')

  useEffect(() => {
    async function loadRadomusers(): Promise<void> {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=100')

        setUsers(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    loadRadomusers()

    setCurrentPagination(0)
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
    setCurrentPagination(0)
  }

  // Pagination
  const usersPerPage = 20
  const endOffset = currentPagination + usersPerPage
  const currentUsers = filteredUsers.slice(currentPagination, endOffset)
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage)


  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * usersPerPage) % filteredUsers.length

    setCurrentPagination(newOffset)
  }

  return (
    <div className='random_users'>
      <header>
        <h1>Usuários encontrados: {filteredUsers.length}</h1>
        <div>
          <input
            placeholder='Procurar'
            type="text"
            onChange={onChangeFilter}
          />
          <BiSearchAlt2 />
        </div>
      </header>
      <section className="list">
        {currentUsers.length > 0 && (
          currentUsers.map((item, i) => (
            <UserItem key={i} ramdomUser={item} />
          )))}
      </section>
      {currentUsers.length <= 0 ? (
        <p className='filter_not_found'>Nehum resultado para "{inputFilter}"</p>
      ) : (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<BsArrowRight />}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLabel={<BsArrowLeft />}
          containerClassName={"pagination"}
          disabledClassName={"pagination disabled"}
          previousLinkClassName={"previous"}
          nextLinkClassName={"next"}
          onClick={() => window.scrollTo(0, 0)}
        />
      )}
    </div>
  )
}

export default Users