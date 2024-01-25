import { Card, ICard } from "@/entities/card";
import { cn } from "@/shared/lib/utils";
import { useAppSelector } from "@/shared/store/hooks";
import { FC, useCallback, useEffect, useState } from "react";

interface Props {
    cards: ICard[],
    interactive?: boolean,
    active?: boolean
    handleCard: (card: ICard) => void

}

const MyCards: FC<Props> = ({ cards, interactive = false, active = false, handleCard }) => {

    const { bribeWinnerCard } = useAppSelector(state => state.gameReducer.game)
    const [hasSuit, setHasSuit] = useState(false)

    const handleSetSuit = useCallback(() => {
        if (bribeWinnerCard) {
            for (const card of cards) {
                if (card.suit === bribeWinnerCard.suit) {
                    setHasSuit(true)
                    return;
                }
            }
            setHasSuit(false)
        }
    }, [bribeWinnerCard, cards])

    const handleInteractive = (card: ICard) => {
        if (bribeWinnerCard) {
            if (hasSuit) {
                return interactive && card.suit === bribeWinnerCard.suit;
            } else {
                return interactive;
            }
        } else {
            return interactive
        }
    }
    const handleActive = (card: ICard) => {
        if (bribeWinnerCard) {
            if (hasSuit) {
                return active && card.suit === bribeWinnerCard.suit;
            } else {
                return active;
            }
        } else {
            return active
        }
    }
    useEffect(() => {
        handleSetSuit()
    }, [handleSetSuit]);

    const handleClick = (card: ICard) => {
        if (interactive) {
            handleCard(card)
        }
    }

    return (
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] mb-4">
            <div className=" grid grid-cols-10 max-w-[18rem] sm:max-w-md md:max-w-lg lg:max-w-xl transition-all duration-300">
                {cards.map((card, i) => (
                    <button onClick={() => handleClick(card)} className={cn(i === 0 && 'z-0',
                        i === 1 && 'z-10', i === 2 && 'z-20', i === 3 && 'z-30',
                        i === 4 && 'z-40', i === 5 && 'z-50',
                        i === 6 && 'z-[60]', i === 7 && 'z-[70]',
                        i === 8 && 'z-[80]', i === 9 && 'z-[90]',)} key={card.id}><Card interactive={handleInteractive(card)} active={handleActive(card)} suit={card.suit} rank={card.rank} /></button>
                ))}
            </div>
        </div>
    )
}

export default MyCards;