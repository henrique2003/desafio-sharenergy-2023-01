import axios from 'axios'
import { useEffect, useState } from 'react';
import { BeatLoader, PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify'

import './styles.css'

const Dogs: React.FC = () => {
  const [currentDogUrl, setCurrentDogUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadRandomDog(): Promise<void> {
    try {
      setLoading(true)

      const { data } = await axios.get('https://dog.ceo/api/breeds/image/random')

      setCurrentDogUrl(data.message)
      setLoading(false)
    } catch (error) {
      toast.error('Erro ao carregar a image aleatória')
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRandomDog()
  }, [])

  return (
    <div className='random_dogs'>
      <header>
        <div>
          <h1>Image aleatória:</h1>
          <p>Aperte do botão para achar outra image</p>
        </div>
        <button type='button' onClick={() => loadRandomDog()}>
          {loading ? (
            <BeatLoader
              loading
              color="rgba(0,0,0,0.6)"
              size={11}
              aria-label="Loading Spinner"
              data-testid="loader"
              className='loading'
            />
          ) : (
            <span>Atualizar</span>
          )}
        </button>
      </header>
      <div className="random_dogs_image">
        {loading ? (
          <PuffLoader
            loading
            color="rgba(0,0,0,0.6)"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loading"
          />
        ) : (
          <div className="bg_image" style={{
            background: `url("${currentDogUrl}")`
          }}></div>
        )}
      </div>
    </div>
  )
}

export default Dogs