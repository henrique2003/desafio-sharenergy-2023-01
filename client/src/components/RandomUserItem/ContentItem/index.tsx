import './styles.css'

interface IProps {
  label: string
  text: string | number
}

const InfoItem: React.FC<IProps> = ({ label, text }) => {
  return (
    <div className='info_item'>
      <strong>{label}:</strong>
      <p>{text}</p>
    </div>
  )
}

export default InfoItem
