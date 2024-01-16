import { Button } from '@/shared/components/ui/button'
import { gameApi } from '@/shared/store/services/GameService'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    gameId: string,
    userId: string
}

const DisconnectButton: FC<Props> = ({ gameId, userId }) => {

    const [disconnect] = gameApi.useDisconnectMutation()
    
    const navigate = useNavigate()

    const handleDisconnect = async () => {
            disconnect({playerId: userId, gameId})
            navigate('/') 
    }

    return (
        <Button variant={'destructive'} onClick={handleDisconnect}>Disconnect</Button>
    )
}

export default DisconnectButton