import { useParams } from "react-router-dom"
import PlayersList from "./components/PlayersList"
import DisconnectButton from "./components/DisconnectButton"
import ReadyButton from "./components/ReadyButton"
import { useAppSelector } from "@/shared/store/hooks"

const GamePage = () => {
    const { id } = useParams()
    const {user} = useAppSelector(state => state.authReducer)
    if (id && user) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <h1 className="text-3xl font-bold">Игра создана</h1>
                <PlayersList gameId={id} />
                <ReadyButton id={user.id} ready={user.ready}/>
                <DisconnectButton gameId={id} userId={user.id} />
            </div>
        )
    }
}

export default GamePage