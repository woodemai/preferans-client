import { ICard } from "@/entities/card";
import { GameState } from "@/entities/game";
import { IUser } from "@/entities/user";
import { IBet } from "@/shared/helpers/getTradingChoices";
import useGetUserRivals from "@/shared/hooks/useGetUserRivals";
import { useTurn } from "@/shared/hooks/useTurn";
import GameCards from "@/widgets/GameCards";
import MyCards from "@/widgets/MyCards";
import RivalCards from "@/widgets/RivalCards";
import TradingScreen from "@/widgets/TradingScreen";
import { FC } from "react";

interface Props {
    userId: string,
    state: GameState,
    players: IUser[]
    gameCards: ICard[]
    handleChoice: (choice: IBet) => void
    handleCard: (card:ICard) => void
}

const GameStartedState: FC<Props> = ({
    userId,
    state,
    players,
    gameCards,
    handleChoice,
    handleCard
}) => {

    const { currentUser, leftRival, rightRival } = useGetUserRivals(userId, players);
    const { isTurn } = useTurn();

    if (state !== GameState.CREATED && currentUser && leftRival && rightRival) {

        return (
            <div className="w-full mt-20">
                <MyCards handleCard={handleCard} interactive={state === GameState.GAMEPLAY && isTurn} cards={currentUser.cards} />
                <RivalCards type="left" cards={leftRival.cards} />
                <RivalCards type="right" cards={rightRival.cards}/>
                <GameCards cards={gameCards} />
                {state === GameState.TRADING && isTurn && <TradingScreen handleChoice={handleChoice} />}
                {state === GameState.GAMEPLAY && isTurn && "Ваш ход"}
                
            </div>
        )
    }
}

export default GameStartedState;