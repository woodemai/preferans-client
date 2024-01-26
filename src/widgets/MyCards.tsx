import { Card, ICard } from "@/entities/card";
import { resolveSuitValue } from "@/shared/helpers/resolveSuitValue";
import { cn } from "@/shared/lib/utils";
import { useAppSelector } from "@/shared/store/hooks";
import { FC, useCallback, useEffect, useState } from "react";

interface Props {
    cards: ICard[],
    interactive?: boolean,
    active?: boolean
    handleCard: (card: ICard) => void

}

const MyCards: FC<Props> = ({ cards:initialCards, interactive = false, active = false, handleCard }) => {

    const { bribeWinnerCard } = useAppSelector(state => state.gameReducer.game)
    const [hasSuit, setHasSuit] = useState(false)
    const [cards, setCards] = useState(initialCards)
    useEffect(() => {
        const arrayForSort = [...initialCards]
        arrayForSort.sort((a, b) => resolveSuitValue(a, b))
        setCards(arrayForSort)
    }, [initialCards])

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
        if (handleInteractive(card)) {
            handleCard(card)
        }
    }

    return (
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] mb-4">
            <div className="relative w-[30rem] min-h-[130px] transition-all duration-300">
                {cards.map((card, i) => (
                    <button onClick={() => handleClick(card)} className={cn("absolute")}
                        style={{ marginLeft: `${i * 500 * 1/cards.length}px`, zIndex: i }}
                        key={card.id}><Card interactive={handleInteractive(card)} active={handleActive(card)} suit={card.suit} rank={card.rank} /></button>
                ))}
            </div>
        </div>
    )
}

export default MyCards;