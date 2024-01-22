import { Card, ICard } from "@/entities/card";
import { FC } from "react";

interface Props {
    cards: ICard[]
}
const MyCards: FC<Props> = ({ cards }) => {

    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {cards.map((card) => (
                <Card key={card.id} suit={card.suit} rank={card.rank} />
            ))}
        </div>
    )
}

export default MyCards;