import { Check, X } from "lucide-react"
import { memo } from "react"

const Ready = memo(({ ready }: { ready: boolean }) => {
    if (ready) {
        return <Check color="green" />
    } else {
        return <X color="red" />
    }
})

export default Ready