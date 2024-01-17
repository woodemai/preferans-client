import { useParams } from "react-router-dom"
import PlayersList from "./components/PlayersList"
import DisconnectButton from "./components/DisconnectButton"
import ReadyButton from "./components/ReadyButton"
import { useAppSelector } from "@/shared/store/hooks"
import GameHeading from "./components/GameHeading"
import { useSocket } from "@/shared/hooks/useSocket"




const GamePage = () => {

    const { id } = useParams()
    const { user } = useAppSelector(state => state.authReducer)

    const {switchReady} = useSocket(id ?? '', user?.id ?? '');

    if (id && user) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <GameHeading />
                <PlayersList gameId={id} />
                <ReadyButton ready={user.ready} switchReady={switchReady} />
                <DisconnectButton />
            </div>
        )
    }
}

export default GamePage