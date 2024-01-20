import ICard, { Card } from "@/entities/card";
import { FC } from "react";

interface Props {
    cards: ICard[]
}
const MyCards: FC<Props> = ({ cards }) => {

    return (
        <div>
            {cards.map((card) => (
                <Card key={card.id} suit={card.suit} rank={card.rank} />
            ))}
        </div>
    )
}

export default MyCards;