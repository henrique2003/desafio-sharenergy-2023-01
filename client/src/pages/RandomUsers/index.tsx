import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'

import UserItem, { IRamdomUser } from '../../components/RandomUserItem'
import './styles.css'

const Users: React.FC = () => {
  const [users, setUsers] = useState<IRamdomUser[]>([])
  const [currentPagination, setCurrentPagination] = useState(0)
  const [inputFilter, setInputFilter] = useState('')

  useEffect(() => {
    async function loadRandomUsers(): Promise<void> {
      try {
        const { data } = await axios.get('https://randomuser.me/api/?results=100')

        setUsers(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    loadRandomUsers()

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

  const filtredUsers = filterUsers()

  function onChangeFilter(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputFilter(e.target.value)
    setCurrentPagination(0)
  }

  // Pagination
  const usersPerPage = 20
  const endOffset = currentPagination + usersPerPage
  const currentUsers = filtredUsers.slice(currentPagination, endOffset)
  const pageCount = Math.ceil(filtredUsers.length / usersPerPage)


  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * usersPerPage) % filtredUsers.length

    setCurrentPagination(newOffset)
  }

  return (
    <div className='random_users'>
      <header>
        <h1>Usuários encontrados: {filtredUsers.length}</h1>
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
      {(inputFilter.length > 0 && currentUsers.length === 0) && (
        <p className='filter_not_found'>Nehum resultado para "{inputFilter}"</p>
      )}
      {currentUsers.length > 0 && (
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
      {(currentUsers.length === 0 && inputFilter.length === 0) && (
        <PuffLoader
          loading
          color="rgba(0,0,0,0.6)"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading"
        />
      )}
    </div>
  )
}

export default Users