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
    const socket = useSocket(id ?? '', user?.id ?? '');

    if (id && user) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <GameHeading key={1} />
                <PlayersList gameId={id} />
                <ReadyButton id={user.id} ready={user.ready} />
                <DisconnectButton gameId={id} userId={user.id} key={4} />
            </div>
        )
    }
}

export default GamePage