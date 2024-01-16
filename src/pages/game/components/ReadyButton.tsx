import { Button } from "@/shared/components/ui/button"
import { gameApi } from "@/shared/store/services/GameService"

const ReadyButton = ({ id, ready }: { id: string, ready: boolean }) => {

    const [switchReady] = gameApi.useSwitchReadyMutation()

    const handleReady = () => {
        switchReady(id)
    }

    return (
        <Button onClick={handleReady}>{ready ? "Unready" : "Ready"}</Button>
    )
}

export default ReadyButton