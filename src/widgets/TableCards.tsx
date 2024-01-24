import { ICard, Card } from "@/entities/card";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
    cards: ICard[]
}

const TableCards: FC<Props> = ({
    cards,
}) => {

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className=" grid grid-cols-4 transition-all duration-300">
                {cards.map((card, i) => (
                    <div  className={cn(i === 0 && 'z-0',
                        i === 1 && 'z-10', i === 2 && 'z-20', i === 3 && 'z-30',
                        i === 4 && 'z-40', i === 5 && 'z-50',
                        i === 6 && 'z-[60]', i === 7 && 'z-[70]',
                        i === 8 && 'z-[80]', i === 9 && 'z-[90]',)} key={card.id}>
                <Card suit={card.suit} rank={card.rank} interactive={false} active/>
            </div>
                ))}
        </div>
        </div >
    )
}

export default TableCards;