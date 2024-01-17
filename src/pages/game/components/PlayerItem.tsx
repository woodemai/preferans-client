import { IUser } from '@/entities/user'
import { FC, memo } from 'react'
import Ready from './Ready'

type Props = {
    player: IUser
}

const PlayerItem: FC<Props> = memo(({ player }) => {

    return (
        <div className='p-4 bg-card rounded-sm shadow-sm w-full sm:max-w-lg'>
            <div className='flex gap-4'>
                <h3 className='font-bold mb-4'>{player.name}</h3>
                <Ready ready={player.ready} />
            </div>
            <span>Score: {player.score}</span>

        </div>
    )
})

export default PlayerItem