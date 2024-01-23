import { FC, useCallback } from "react";
import { Rank, Suit } from ".";
import { cn } from "@/shared/lib/utils";
import { resolveSuit, resolveRank } from "@/shared/helpers/resolveCard";

interface Props {
    rank: Rank,
    suit: Suit,
    interactive?: boolean
}

const Card: FC<Props> = ({ rank, suit, interactive = true }) => {

    const resolvedSuit = resolveSuit(suit)
    const resolvedRank = resolveRank(rank)

    const isSuitRed = useCallback(() => {
        return suit === Suit.HEARTS || suit === Suit.DIAMONDS
    }, [suit])

    const handleDropCard = () => {
        console.log(`double clicked ${rank} ${suit}`);

    }

    return (
        <button onDoubleClick={handleDropCard} className={cn("bg-white rounded-lg shadow-md h-[160px] w-[100px] p-2  transition-all duration-100 cursor-default", isSuitRed() && "text-rose-500", interactive && "hover:-translate-y-4 cursor-pointer hover:z-[100] ")}>
            <div className="w-full h-full ring-1 rounded-md ring-gray-300 relative flex justify-center items-center">
                <div className="absolute top-2 left-2 flex justify-center flex-col items-center leading-4">
                    <div>{resolvedRank}</div>
                    <div>{resolvedSuit}</div>
                </div>
                <div className="text-5xl">
                    {resolvedSuit}
                </div>
                <div className="absolute bottom-2 right-2 rotate-180 flex justify-center flex-col items-center leading-4">
                    <div>{resolvedRank}</div>
                    <div>{resolvedSuit}</div>
                </div>
            </div>
        </button>
    )
}

export default Card;    