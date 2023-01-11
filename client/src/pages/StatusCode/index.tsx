import { useState } from 'react'
import Select from 'react-select'

import './styles.css'
import status_code_options from '../../mocks/status-code'

const RandomUsers: React.FC = () => {
  const [currentStatusCode, setCurrentStatusCode] = useState(0)

  async function handleClickButton(statusCode: number): Promise<void> {
    if (currentStatusCode === statusCode) {
      return setCurrentStatusCode(0)
    }

    setCurrentStatusCode(statusCode)
  }

  return (
    <div className="status_code">
      <header>
        <h1>Código de estatus http{currentStatusCode > 0 ? `: ${currentStatusCode}` : ''}</h1>
        <Select
          options={status_code_options}
          className="select_code"
          onChange={e => setCurrentStatusCode(e?.value ?? 0)}
        />
      </header>
      <div className="status_code_image">
        <img
          src={`https://http.cat/${currentStatusCode}`}
          alt={`Imagem de gatinho que retorna o estados`}
        />
      </div>
    </div>
  )
}

export default RandomUsers