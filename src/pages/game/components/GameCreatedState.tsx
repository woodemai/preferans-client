import { GameState } from "@/entities/game";
import DisconnectButton from "@/features/button/DisconnectButton";
import ReadyButton from "@/features/button/ReadyButton";
import GameHeading from "./GameHeading";
import PlayersList from "./PlayersList";
import { FC, memo } from "react";

interface Props {
    state: GameState,
    isLoading: boolean,
    isReady: boolean,
    switchReady: () => void
}

const GameCreatedState: FC<Props> = memo(({
    state,
    isLoading,
    isReady,
    switchReady
}) => {

    if (state == GameState.CREATED) {
        return (
            <div className="mx-auto w-full sm:max-w-lg flex flex-col gap-y-4 mt-4">
                <GameHeading />
                <PlayersList />
                <ReadyButton isLoading={isLoading} ready={isReady} switchReady={switchReady} />
                <DisconnectButton />
            </div>
        )
    }
    return null
})

export default GameCreatedState;