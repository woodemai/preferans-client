import { IBet } from "@/entities/bet";
import { Card, ICard } from "@/entities/card";
import CardShirt from "@/entities/card/CardShirt";
import PlayerInfo from "@/features/PlayerInfo";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
    cards?: ICard[],
    name: string,
    score: number,
    bet?: IBet
    type: 'left' | 'right'
    isOpen?: boolean
}

const RivalCards: FC<Props> = ({ cards = [], type, isOpen = false, bet, name, score }) => {
    return (
        <div className={cn("absolute top-[50%] flex flex-col translate-y-[-50%]", type === 'left' ? 'left-0' : 'right-0')}>
            <PlayerInfo bet={bet} name={name} score={score} />
            <div className={cn("transition-all duration-300 flex", type === 'left' ? 'rotate-90 mt-[60px] mb-[30px]' : 'rotate-[-90deg] mt-[120px] mb-[-30px]')}>
                {cards.map((card, i) => (
                    <div style={{ zIndex: i }} className="-mr-[60px]" key={card.id}>{isOpen
                            ? <Card interactive={false} suit={card.suit} rank={card.rank} />
                            : <CardShirt />}</div>
                ))}
            </div>
        </div>
    )
}

export default RivalCards;