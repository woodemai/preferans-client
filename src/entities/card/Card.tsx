import { FC, useCallback } from "react";
import { Rank, Suit } from ".";
import { cn } from "@/shared/lib/utils";

interface Props {
    rank: Rank,
    suit: Suit
}
const resolveSuit = (suit: Suit) => {
    switch (suit) {
        case Suit.HEARTS:
            return <>♥</>
        case Suit.DIAMONDS:
            return <>♦</>
        case Suit.CLUBS:
            return <>♣</>
        case Suit.SPADES:
            return <>♠</>
    }
}

const resolveRank = (rank: Rank) => {
    switch (rank) {
        case Rank.SEVEN:
            return <>7</>
        case Rank.EIGHT:
            return <>8</>
        case Rank.NINE:
            return <>9</>
        case Rank.TEN:
            return <>10</>
        case Rank.JACK:
            return <>J</>
        case Rank.QUEEN:
            return <>Q</>
        case Rank.KING:
            return <>K</>
        case Rank.ACE:
            return <>T</>
    }
}
const Card: FC<Props> = ({ rank, suit }) => {

    const resolvedSuit = resolveSuit(suit)
    const resolvedRank = resolveRank(rank)

    const isSuitRed = useCallback(() => {
        return suit === Suit.HEARTS || suit === Suit.DIAMONDS
    }, [suit])

    return (
        <div className={cn("bg-white rounded-md shadow-md h-[200px] w-[140px] p-2", isSuitRed() && "text-red-500")}>
            <div className="w-full h-full ring-1 rounded-md ring-gray-300 relative flex justify-center items-center">
                <div className="absolute top-2 left-2 flex justify-center flex-col items-center leading-4">
                    <div>{resolvedRank}</div>
                    <div>{resolvedSuit}</div>
                </div>
                <div className="text-4xl">
                    {resolvedSuit}
                </div>
                <div className="absolute bottom-2 right-2 rotate-180 flex justify-center flex-col items-center leading-4">
                    <div>{resolvedRank}</div>
                    <div>{resolvedSuit}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;    