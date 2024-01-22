import { Loader2 } from "lucide-react"

const Spinner = ({size}:{size?:number}) => {
  return (
    <Loader2 size={size} className="animate-spin"/>
  )
}

export default Spinner