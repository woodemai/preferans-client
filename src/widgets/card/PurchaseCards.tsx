import { ICard, Card } from "@/entities/card";
import CardShirt from "@/entities/card/CardShirt";
import { FC } from "react";

interface Props {
    cards: ICard[]
    open?: boolean
}

const GameCards: FC<Props> = ({ cards, open = false }) => {
    return (
        <div className="transition-all duration-300 flex max-w-fit gap-x-4 relative left-[50%] translate-x-[-50%] mt-4">
            {cards.map(card => (
                <div key={card.id}>{open
                    ? <Card interactive={false} suit={card.suit} rank={card.rank} />
                    : <CardShirt />
                }</div>
            ))}
        </div>
    )
}

export default GameCards;