import { Link, useParams } from "react-router-dom"
import PlayersList from "./components/PlayersList"
import DisconnectButton from "../../features/button/DisconnectButton"
import ReadyButton from "../../features/button/ReadyButton"
import { useAppSelector } from "@/shared/store/hooks"
import GameHeading from "./components/GameHeading"
import { useSocket } from "@/shared/hooks/useSocket"
import { GameState } from "@/entities/game/GameState"
import Spinner from "@/shared/components/ui/spinner"
import { Button } from "@/shared/components/ui/button"
import MyCards from "@/widgets/MyCards"
import { useEffect } from "react"
import { gameApi } from "@/shared/store/services/GameService"




const GamePage = () => {


    const { id } = useParams()
    const { user } = useAppSelector(state => state.authReducer)
    gameApi.useGetGameQuery(id ?? "");
    const { users: players, game, isLoading } = useAppSelector(state => state.gameReducer)
    const { switchReady } = useSocket(id ?? '', user.id);

    useEffect(() => {
        console.log(game?.state);

    }, [game?.state])

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><Spinner /></div>
    }

    if (!id || !game) {
        return (
            <div className="p-8 bg-card rounded-md shadow-md mt-8 flex justify-center items-center gap-4 flex-col">
                <h1 className="font-bold text-xl">{`Your game not found :(`}</h1>
                <Link to={'/'}><Button variant={'link'}>To game list</Button></Link>
            </div>
        )
    }

    if (game.state == GameState.CREATED) {
        return (
            <div className="flex flex-col w-full sm:max-w-xl gap-y-4 mt-4">
                <GameHeading />
                <PlayersList />
                <ReadyButton isLoading={isLoading} ready={user.ready} switchReady={switchReady} />
                <DisconnectButton />
            </div>
        )
    }

    if (game.state === GameState.STARTED) {
        return (
            <>
                {players.map(player => player.cards && <MyCards key={player.id} cards={player.cards} />)}
                <h1>Game started</h1>
            </>
        )
    }
    return (<h1>Игра окончена</h1>)

}

export default GamePage