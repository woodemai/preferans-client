import Spinner from '@/shared/components/ui/spinner';
import PlayerItem from './PlayerItem'
import { useAppSelector } from '@/shared/store/hooks'

const PlayersList = () => {
  const { users: players } = useAppSelector(state => state.gameReducer);
  if(!players) {
    return <Spinner/>
  }
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-between'>
      {players.map(player => <PlayerItem key={player.id} player={player} />)}
    </div>
  )
}

export default PlayersList