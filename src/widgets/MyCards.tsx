import { IBet } from "@/entities/bet";
import { Card, ICard } from "@/entities/card";
import PlayerInfo from "@/features/PlayerInfo";
import { resolveSuitValue } from "@/shared/helpers/resolveSuitValue";
import { useAppSelector } from "@/shared/store/hooks";
import { FC, useCallback, useEffect, useState } from "react";

interface Props {
    cards: ICard[],
    bet?: IBet
    name: string,
    score: number,
    interactive?: boolean,
    active?: boolean
    handleCard: (card: ICard) => void

}

const MyCards: FC<Props> = ({ cards: initialCards, interactive = false, active = false, handleCard, bet, name, score }) => {

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
        <div className="absolute bottom-0 left-[50%] flex flex-col gap-4 justify-center items-center transition-all duration-300 translate-x-[-50%] mb-4">
            <PlayerInfo name={name} score={score} bet={bet} />
            <div className="flex">
                {cards.map((card, i) =>
                    <button onClick={() => handleClick(card)}
                        style={{ zIndex: i }} className="-ml-[30px]"
                        key={card.id}><Card interactive={handleInteractive(card)} active={handleActive(card)} suit={card.suit} rank={card.rank} /></button>
                )}
            </div>
        </div>
    )
}

export default MyCards;