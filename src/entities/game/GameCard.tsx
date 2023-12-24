import { FC } from 'react'
import { IGame } from './Game'

type Props = {
    game: IGame
}

const GameCard:FC<Props> = ({game}) => {
  return (
    <div className='p-4 bg-card rounded-md shadow-sm'>{`Number of players: ${game.playerIds.length}`}</div>
  )
}

export default GameCard