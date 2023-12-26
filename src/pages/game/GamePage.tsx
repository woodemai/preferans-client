import { useParams } from "react-router-dom"
import PlayersList from "./components/PlayersList"
import DisconnectButton from "./components/DisconnectButton"

const GamePage = () => {
    const { id } = useParams()
    if (id) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <h1 className="text-3xl font-bold">Игра создана</h1>
                <PlayersList gameId={id} />
                <DisconnectButton gameId={id} />
            </div>
        )
    }
}

export default GamePage