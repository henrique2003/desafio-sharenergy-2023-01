import { useState } from 'react'

import status_code_data from '../../mocks/status-code'

const RandomUsers: React.FC = () => {
  const [currentStatusCode, setCurrentStatusCode] = useState(0)

  return (
    <div className="status_code">
      <h1>Código de estatus http: {currentStatusCode}</h1>
      <div className="status_code_list">
        {status_code_data.map((codeItem, i) => (
          <button
            type='button'
            key={i}
            className={`${currentStatusCode === codeItem && 'active'}`}
          >{codeItem}</button>
        ))}
      </div>
    </div>
  )
}

export default RandomUsers