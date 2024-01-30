import { BetSuit, BetType, IBet } from '@/entities/bet'
import { isBetBigger } from '@/entities/bet/getBiggerBet'
import { resolveBetSuit } from '@/entities/bet/resolveBetSuit'
import { Suit } from '@/entities/card'
import { cn } from '@/shared/lib/utils'
import { FC, useEffect, useState } from 'react'

interface Props {
    bet: IBet
    userBet?: IBet
    onClick: () => void,
}
const isSuitRed = (suit?: BetSuit) => {
    return suit === Suit.HEARTS || suit === Suit.DIAMONDS
}

const handleDisabled = (userBet: IBet | undefined, bet: IBet): boolean => {
    if (!userBet) {
        return false
    }
    return isBetBigger(userBet, bet);
}

export const TradingScreenItem: FC<Props> = ({ onClick, bet, userBet }) => {

    
    const [disabled, setDisabled]  = useState(handleDisabled(userBet, bet))

    useEffect(() => {
        setDisabled(handleDisabled(userBet, bet))
    }, [bet, userBet])

    if (bet.type === BetType.VALUE) {
        return (
            <button disabled={disabled} onClick={onClick} className="transition-all duration-100 disabled:cursor-default disabled:hover:bg-muted disabled:bg-muted flex justify-center items-center cursor-pointer hover:bg-accent border border-secondary p-1 gap-1">
                <div>{bet.value}</div>
                <div className={cn(isSuitRed(bet.suit) && "text-red-500")}>{resolveBetSuit(bet.suit)}</div>
            </button>
        )
    } else if (bet.type === BetType.MIZER) {
        return (
            <button onClick={onClick} className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-secondary bt-0">Мизер</button>
        )
    } else {
        return (
            <button onClick={onClick} className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-secondary bt-0">Пас</button>
        )
    }
}
