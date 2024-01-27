import { Card, ICard } from "@/entities/card";
import CardShirt from "@/entities/card/CardShirt";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
    cards?: ICard[]
    type: 'left' | 'right'
    isOpen?: boolean
}

const RivalCards: FC<Props> = ({ cards = [], type, isOpen = false }) => {
    if (cards) {
        return (
            <div className={cn("absolute top-[40%] translate-y-[-50%]", type === 'left' ? 'left-0' : 'mt-24 right-0')}>
                <div className={cn("grid grid-cols-10 max-w-[8.5rem] transition-all duration-300", type === 'left' ? 'rotate-90' : 'rotate-[-90deg]')}>
                    {cards.map((card, i) => (
                        <div className={cn(i === 0 && 'z-0',
                            i === 1 && 'z-10', i === 2 && 'z-20', i === 3 && 'z-30',
                            i === 4 && 'z-40', i === 5 && 'z-50',
                            i === 6 && 'z-[60]', i === 7 && 'z-[70]',
                            i === 8 && 'z-[80]', i === 9 && 'z-[90]',)} key={card.id}>{isOpen
                                ? <Card interactive={false} suit={card.suit} rank={card.rank} />
                                : <CardShirt />}</div>
                    ))}
                </div>
            </div>
        )
    }
    return null;
}

export default RivalCards;