import { FC } from 'react'
import PlayerItem from './PlayerItem'
import { useAppSelector } from '@/shared/store/hooks'

type Props = {
  gameId: string
}

const PlayersList: FC<Props> = () => {
  // const {data, isLoading} = gameApi.useGetAllPlayersQuery(gameId)
  // useEffect(() => {
  //     if(data) {
  //   setPlayers(data)
  // }
  // }, [data, gameId])
  // if(isLoading) {
  //     return <Spinner/>
  // }
  const { players } = useAppSelector(state => state.gameReducer)
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-between'>
      {players.map(player => <PlayerItem key={player.id} player={player} />)}
    </div>
  )
}

export default PlayersList