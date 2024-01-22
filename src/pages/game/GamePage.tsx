import { useParams } from "react-router-dom"
import { useAppSelector } from "@/shared/store/hooks"
import { useSocket } from "@/shared/hooks/useSocket"
import { gameApi } from "@/shared/store/services/GameService"
import GameCreatedState from "./components/GameCreatedState"
import GameStartedState from "./components/GameStartedState"
import GameErrorState from "./components/GameErrorState"
import GameLoadingState from "./components/GameLoadingState"




const GamePage = () => {


    const { id } = useParams()
    const { user } = useAppSelector(state => state.authReducer)
    const { players, game, isLoading } = useAppSelector(state => state.gameReducer)
    gameApi.useGetGameQuery(id ?? "");
    const { switchReady } = useSocket(id ?? '', user.id);


    return (
        <>
            <GameLoadingState isLoading={isLoading} />
            <GameErrorState id={id} game={game} />
            <GameCreatedState state={game.state} isLoading={isLoading} isReady={user.ready} switchReady={switchReady} />
            <GameStartedState state={game.state} userId={user.id} players={players} gameCards={game.cards} />
        </>
    )
}

export default GamePage