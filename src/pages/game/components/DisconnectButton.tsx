import { Button } from '@/shared/components/ui/button'
import { useAppSelector } from '@/shared/store/hooks'
import { gameApi } from '@/shared/store/services/GameService'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    gameId: string
}

const DisconnectButton: FC<Props> = ({ gameId }) => {

    const {user} = useAppSelector(state => state.authReducer)
    const [disconnect] = gameApi.useDisconnectMutation()
    const navigate = useNavigate()

    const handleDisconnect = async () => {
        if(user) {
            disconnect({playerId: user.id, gameId})
            navigate('/')
        }    
    }

    return (
        <Button onClick={handleDisconnect}>Disconnect</Button>
    )
}

export default DisconnectButton