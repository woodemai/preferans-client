import { Button } from '@/shared/components/ui/button'
import { useNavigate } from 'react-router-dom'



const DisconnectButton = () => {

    
    const navigate = useNavigate()

    const handleDisconnect = async () => {
            navigate('/') 
    }

    return (
        <Button variant={'destructive'} onClick={handleDisconnect}>Disconnect</Button>
    )
}

export default DisconnectButton