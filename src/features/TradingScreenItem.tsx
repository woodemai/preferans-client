import { BetSuit, BetType, IBet } from '@/entities/bet'
import { resolveBetSuit } from '@/entities/bet/resolveBetSuit'
import { Suit } from '@/entities/card'
import { cn } from '@/shared/lib/utils'
import { FC } from 'react'

interface Props {
    choice: IBet
    handleChoice: (bet: IBet) => void,
}
const isSuitRed = (suit?: BetSuit) => {
    return suit === Suit.HEARTS || suit === Suit.DIAMONDS
}

export const TradingScreenItem: FC<Props> = ({ handleChoice, choice }) => {
    if (choice.type === BetType.VALUE) {
        return (
            <button onClick={() => handleChoice(choice)} className="transition-all duration-100 flex justify-center items-center cursor-pointer hover:bg-accent border border-gray-200 p-1 gap-1">
                <div>{choice.value}</div>
                <div className={cn(isSuitRed(choice.suit) && "text-red-500")}>{resolveBetSuit(choice.suit)}</div>
            </button>
        )
    } else if (choice.type === BetType.MIZER) {
        return (
            <button onClick={() => handleChoice({ type: BetType.MIZER })} className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-gray-200 bt-0">Мизер</button>
        )
    } else {
        return (
            <button onClick={() => handleChoice({ type: BetType.PASS })} className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-gray-200 bt-0">Пас</button>
        )
    }
}
