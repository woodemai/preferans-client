import { Button } from "@/shared/components/ui/button"

const ReadyButton = ({ ready, switchReady }: { ready: boolean, switchReady: () => void }) => {


    return (
        <Button onClick={switchReady}>{ready ? "Unready" : "Ready"}</Button>
    )
}

export default ReadyButton