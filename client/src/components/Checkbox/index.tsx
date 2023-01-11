import { BsCheck } from 'react-icons/bs'

import './styles.css'

interface IProps {
  active: boolean
  onClick: () => void
}

const Checkbox: React.FC<IProps> = ({ active, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      type='button'
      className={`checkbox ${active && 'active'}`}
    >
      <div className='box'>
        <BsCheck />
      </div>
      <p>Lembrar de mim</p>
    </button>
  )
}

export default Checkbox
