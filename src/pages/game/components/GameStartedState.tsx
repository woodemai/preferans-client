import { IBet } from "@/entities/bet";
import { ICard } from "@/entities/card";
import { GameState } from "@/entities/game";
import { IUser } from "@/entities/user";
import useGetUserRivals from "@/shared/hooks/useGetUserRivals";
import { useTurn } from "@/shared/hooks/useTurn";
import MyCards from "@/widgets/MyCards";
import PurchaseCards from "@/widgets/PurchaseCards";
import RivalCards from "@/widgets/RivalCards";
import TableCards from "@/widgets/TableCards";
import TradingScreen from "@/widgets/TradingScreen";
import { FC, useEffect, useState } from "react";

interface Props {
    userId: string,
    state: GameState,
    players: IUser[]
    purchaseCards: ICard[]
    tableCards: ICard[]
    handleChoice: (bet: IBet) => void
    handleCard: (card: ICard) => void

}

const GameStartedState: FC<Props> = ({
    userId,
    state,
    players,
    purchaseCards,
    tableCards,
    handleChoice,
    handleCard,
}) => {

    const { currentUser, leftRival, rightRival } = useGetUserRivals(userId, players);
    const { isTurn } = useTurn();
    const [turnToBet, setTurnToBet] = useState(false)
    const [turnToMove, setTurnToMove] = useState(false)

    useEffect(() => {
        setTurnToBet((state === GameState.TRADING || state === GameState.REBET) && isTurn)
        setTurnToMove((state === GameState.GAMEPLAY || state === GameState.DROPPING) && isTurn)
    }, [isTurn, state])

    if (state !== GameState.CREATED && currentUser && leftRival && rightRival) {

        return (
            <>
                <MyCards handleCard={handleCard} interactive={turnToMove} active={turnToMove} cards={currentUser.cards} />
                <RivalCards type="left" cards={leftRival.cards} />
                <RivalCards type="right" cards={rightRival.cards} />
                <PurchaseCards cards={purchaseCards} />
                <TableCards cards={tableCards} />
                {/* <ScoreTable/> */}
                <TradingScreen show={turnToBet} handleChoice={handleChoice} />
            </>
        )
    }
}

export default GameStartedState;