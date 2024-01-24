import { useParams } from "react-router-dom"
import { useAppSelector } from "@/shared/store/hooks"
import { useSocket } from "@/shared/hooks/useSocket"
import GameCreatedState from "./components/GameCreatedState"
import GameStartedState from "./components/GameStartedState"
import GameErrorState from "./components/GameErrorState"
import GameLoadingState from "./components/GameLoadingState"




const GamePage = () => {


    const { id } = useParams()
    const { user } = useAppSelector(state => state.authReducer)
    const { players, game, isLoading } = useAppSelector(state => state.gameReducer)
    const { switchReady, handleChoice, handleCard } = useSocket(id ?? '', user.id);


    return (
        <>
            <GameLoadingState isLoading={isLoading} />
            <GameErrorState id={id} game={game} />
            <GameCreatedState state={game.state} isLoading={isLoading} isReady={user.ready} switchReady={switchReady} />
            <GameStartedState tableCards={game.tableDeck} state={game.state} userId={user.id} players={players} purchaseCards={game.purchase} handleChoice={handleChoice} handleCard={handleCard} />
        </>
    )
}

export default GamePage