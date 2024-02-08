import { FC } from "react"
import LoadingButton from "../user/LoadingButton"
import { cn } from "@/shared/lib/utils"

interface Props {
    isLoading: boolean,
    ready: boolean,
    switchReady: () => void,

}


const ReadyButton: FC<Props> = ({ ready, switchReady, isLoading }) => {


    return (
        <LoadingButton className={cn(ready ? 'bg-green-600 hover:bg-green-400'  : 'bg-rose-500 hover:bg-rose-400')} onClick={switchReady} loading={isLoading}>
            {ready ? "Готов" : "Не готов"}
        </LoadingButton>
    )
}

export default ReadyButton