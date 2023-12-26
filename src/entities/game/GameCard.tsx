import { FC } from 'react'
import { IGame } from './Game'
import { useAppSelector } from '@/shared/store/hooks'
import { gameApi } from '@/shared/store/services/GameService'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'

type Props = {
    game: IGame
}



const GameCard:FC<Props> = ({game}) => {
  const {user} = useAppSelector(state => state.authReducer)
  const [connect, {isLoading}] = gameApi.useConnectMutation()
  const navigate = useNavigate()

  const handleConnect = async () => {
    if(user) {
      connect({playerId: user.id, gameId: game.id})
      navigate(`game/${game.id}`)
    }
  }

  return (
    <button type='button' disabled={isLoading} onClick={handleConnect} className='font-semibold hover:bg-accent transition-all durantion-300 bg-card p-4 rounded-md shadow-sm'>{`Number of players: ${game.playerIds.length}`}</button>
  )
}

export default GameCard