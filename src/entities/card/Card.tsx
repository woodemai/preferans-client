import { FC, useCallback } from "react";
import { Rank, Suit } from ".";
import { cn } from "@/shared/lib/utils";
import { resolveSuit, resolveRank } from "./resolveCard";

interface Props {
    rank: Rank,
    suit: Suit,
    interactive?: boolean
    active?: boolean

}

export const Card: FC<Props> = ({ rank, suit, interactive = true, active =true }) => {

    const resolvedSuit = resolveSuit(suit)
    const resolvedRank = resolveRank(rank)

    const isSuitRed = useCallback(() => {
        return suit === Suit.HEARTS || suit === Suit.DIAMONDS
    }, [suit])

    return (
        <div className={cn("bg-card rounded-lg shadow-md h-[130px] w-[80px] p-2  transition-all duration-100 cursor-default", isSuitRed() && "text-rose-500", interactive && "hover:-translate-y-4 cursor-pointer hover:z-[100]", !active && "bg-muted")}>
            <div className="w-full h-full border rounded-md border-border relative flex justify-center items-center">
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
        </div>
    )
}