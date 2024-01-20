import { useParams } from "react-router-dom"
import PlayersList from "./components/PlayersList"
import DisconnectButton from "../../features/button/DisconnectButton"
import ReadyButton from "../../features/button/ReadyButton"
import { useAppSelector } from "@/shared/store/hooks"
import GameHeading from "./components/GameHeading"
import { useSocket } from "@/shared/hooks/useSocket"
import { gameApi } from "@/shared/store/services/GameService"
import { GameState } from "@/entities/game/GameState"
import MyCards from "@/widgets/MyCards"
import Spinner from "@/shared/components/ui/spinner"




const GamePage = () => {

    const { id } = useParams()
    const { user } = useAppSelector(state => state.authReducer)
    const { data: game, isLoading } = gameApi.useGetGameQuery(id ?? '');
    const { switchReady } = useSocket(id ?? '', user.id);

    if(isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><Spinner /></div>
    }

    if (!id || !game) {
        return <h1>CLIENT ERROR: GAME NOT FOUND 404</h1>
    }
    
    

    if (game.state == GameState.CREATED) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <GameHeading />
                <PlayersList gameId={id} />
                <ReadyButton isLoading={isLoading} ready={user.ready} switchReady={switchReady} />
                <DisconnectButton />
            </div>
        )
    }
    if (game.state === GameState.STARTED) {
        return (
            <MyCards cards={[]}/>
        )
    }
    return (<h1>Игра окончена</h1>)

}

export default GamePage