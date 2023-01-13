import { Link } from 'react-router-dom'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

import './styles.css'

interface IProps {
  link: {
    before: {
      display: boolean
      to: string
    }
    after: {
      display: boolean
      to: string
    }
  }
}

const Navigation: React.FC<IProps> = ({ link: { before, after } }) => {
  return (
    <nav className='navigation'>
      {before.display ? (
        <div>
          <BsArrowLeft />
          <Link to={before.to}>Página anterior</Link>
        </div>
      ) : <div></div>}
      {after.display ? (
        <div>
          <Link to={after.to}>Próxima página</Link>
          <BsArrowRight />
        </div>
      ) : <div></div>}
    </nav>
  )
}

export default Navigation