import { Check, X } from "lucide-react"

const Ready = ({ready}:{ready:boolean}) => {
    if(ready) {
        return <Check color="green"/>
    }else {
        return <X color="red"/>
    }
}

export default Ready