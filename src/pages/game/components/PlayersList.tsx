import { IUser } from '@/entities/user'
import Spinner from '@/shared/components/ui/spinner'
import { gameApi } from '@/shared/store/services/GameService'
import { FC, memo, useEffect, useState } from 'react'
import PlayerItem from './PlayerItem'

type Props = {
    gameId:string
}

const PlayersList:FC<Props> = memo(({gameId}) => {
    const [players, setPlayers] = useState<IUser[]>([])
    const {data, isLoading} = gameApi.useGetAllPlayersQuery(gameId)
    useEffect(() => {
        if(data) {
      setPlayers(data)
    }
    }, [data, gameId])
    if(isLoading) {
        return <Spinner/>
    }
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-between'>
        {players.map(player => <PlayerItem key={player.id} player={player}/>)}
    </div>
  )
})

export default PlayersList