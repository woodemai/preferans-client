import { IUser } from '@/entities/user'
import { FC, memo } from 'react'
import Ready from './Ready'

type Props = {
    player: IUser
}

const PlayerItem: FC<Props> = memo(({ player }) => {

    return (
        <div className='p-4 bg-card rounded-md shadow-md w-full'>
            <div className='flex justify-between items-center'>
                <h5>{player.name}</h5>
                <Ready ready={player.ready} />
            </div>
        </div>
    )
})

export default PlayerItem