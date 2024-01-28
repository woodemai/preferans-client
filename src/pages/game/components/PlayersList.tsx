import Spinner from '@/shared/components/ui/spinner';
import PlayerItem from './PlayerItem'
import { useAppSelector } from '@/shared/store/hooks'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PlayersList = () => {
  const { players: players } = useAppSelector(state => state.gameReducer);
  if (!players) {
    return <Spinner />
  }
  return (
    <TransitionGroup className='flex flex-col sm:flex-row gap-4 justify-between'>
      {players.map(player =>
        <CSSTransition
          key={player.id}
          timeout={500}
          classNames='page' >
          <PlayerItem player={player} />
        </CSSTransition>)}
    </TransitionGroup>
  )
}

export default PlayersList