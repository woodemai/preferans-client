import { IUser } from '@/entities/user'
import { FC } from 'react'

type Props = {
    player: IUser
}

const PlayerItem:FC<Props> = ({player}) => {
    return (
        <div className='p-4 bg-card rounded-sm shadow-sm w-full sm:max-w-lg'>
            <h3 className='font-bold mb-4'>{player.name}</h3>
            <span>Score: {player.score}</span>
        </div>
    )
}

export default PlayerItem