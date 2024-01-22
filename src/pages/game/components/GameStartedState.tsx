import { ICard } from "@/entities/card";
import { GameState } from "@/entities/game/GameState";
import { IUser } from "@/entities/user";
import useGetUserRivals from "@/shared/hooks/useGetUserRivals";
import GameCards from "@/widgets/GameCards";
import MyCards from "@/widgets/MyCards";
import RivalCards from "@/widgets/RivalCards";
import { FC } from "react";

interface Props {
    userId: string,
    state: GameState,
    players: IUser[]
    gameCards: ICard[]
}

const GameStartedState:FC<Props> = ({
    userId,
    state,
    players,
    gameCards
}) => {

    const { currentUser, leftRival, rightRival } = useGetUserRivals(userId, players);

    if (state === GameState.STARTED && currentUser?.cards) {

        return (
            <>
                <MyCards cards={currentUser.cards} />
                <RivalCards type="left" cards={leftRival.cards} />
                <RivalCards type="right" cards={rightRival.cards} />
                <GameCards cards={gameCards} />
            </>
        )
    }
}

export default GameStartedState;