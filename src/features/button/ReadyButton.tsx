import { FC } from "react"
import LoadingButton from "./LoadingButton"

interface Props {
    isLoading: boolean,
    ready: boolean,
    switchReady: () => void,
}


const ReadyButton: FC<Props> = ({ ready, switchReady, isLoading }) => {


    return (
        <LoadingButton onClick={switchReady} loading={isLoading}>
            {ready ? "Unready" : "Ready"}
        </LoadingButton>
    )
}

export default ReadyButton