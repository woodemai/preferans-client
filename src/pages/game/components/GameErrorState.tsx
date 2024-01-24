import { GameState, IGame } from "@/entities/game";
import { Button } from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    id?: string,
    game: IGame
}

const GameErrorState: FC<Props> = ({
    id,
    game
}) => {

    if (!id || !game) {
        return (
            <div className="p-8 bg-card rounded-md shadow-md mt-8 flex justify-center items-center gap-4 flex-col">
                <h1 className="font-bold text-xl">{`Your game not found :(`}</h1>
                <Link to={'/'}><Button variant={'link'}>To game list</Button></Link>
            </div>
        )
    }
    if (game.size < 3 && game.state !== GameState.CREATED) {
        return (
            <div className="p-8 bg-card rounded-md shadow-md mt-8 flex justify-center items-center gap-4 flex-col">
                <h1 className="font-bold text-xl">Один или несколько игроков отключились</h1>
                <p>Ожидаем переподключение...</p>
                <Spinner />
                <Link to={'/'}><Button variant={'link'}>К списку игр</Button></Link>
            </div>
        )
    }

}

export default GameErrorState;