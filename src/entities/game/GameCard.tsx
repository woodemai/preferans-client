import { FC } from 'react'
import { IGame } from './Game'
import { useAppSelector } from '@/shared/store/hooks'
import { useNavigate } from 'react-router-dom'

type Props = {
    game: IGame
}



const GameCard:FC<Props> = ({game}) => {
  const {user} = useAppSelector(state => state.authReducer)
  const navigate = useNavigate()

  const handleConnect = async () => {
    if(user) {
      navigate(`game/${game.id}`)
    }
  }

  return (
    <button type='button'  onClick={handleConnect} className='font-semibold hover:bg-accent transition-all duration-300 bg-card p-4 rounded-md shadow-sm'>{`Number of players: ${game.size}`}</button>
  )
}

export default GameCard