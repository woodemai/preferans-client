import { ICard } from "@/entities/card";
import { GameState } from "@/entities/game";
import { IUser } from "@/entities/user";
import { IBet } from "@/shared/helpers/getTradingChoices";
import useGetUserRivals from "@/shared/hooks/useGetUserRivals";
import { useTurn } from "@/shared/hooks/useTurn";
import PurchaseCards from "@/widgets/PurchaseCards";
import MyCards from "@/widgets/MyCards";
import RivalCards from "@/widgets/RivalCards";
import TradingScreen from "@/widgets/TradingScreen";
import { FC, useEffect, useState } from "react";
import TableCards from "@/widgets/TableCards";

interface Props {
    userId: string,
    state: GameState,
    players: IUser[]
    purchaseCards: ICard[]
    tableCards: ICard[]
    handleChoice: (choice: IBet) => void
    handleCard: (card: ICard) => void
}

const GameStartedState: FC<Props> = ({
const GameStartedState: FC<Props> = ({
    userId,
    state,
    players,
    purchaseCards,
    tableCards,
    handleChoice,
    handleCard
}) => {

    const { currentUser, leftRival, rightRival } = useGetUserRivals(userId, players);
    const { isTurn } = useTurn();
    const [turnToBet, setTurnToBet] = useState(false)
    const [turnToMove, setTurnToMove] = useState(false)

    useEffect(() => {
        setTurnToBet(state === GameState.TRADING && isTurn)
        setTurnToMove(state ===GameState.GAMEPLAY && isTurn)
    }, [isTurn, state])

    if (state !== GameState.CREATED && currentUser && leftRival && rightRival) {

        return (
            <div className="w-full mt-20">
                <MyCards handleCard={handleCard} interactive={turnToMove} cards={currentUser.cards} />
                <RivalCards type="left" cards={leftRival.cards} />
                <RivalCards type="right" cards={rightRival.cards} />
                <PurchaseCards cards={purchaseCards} />
                <TableCards cards={tableCards} />
                {turnToBet && <TradingScreen handleChoice={handleChoice} />}
                {turnToMove && "Ваш ход"}
            </div>
        )
    }
}

export default GameStartedState;