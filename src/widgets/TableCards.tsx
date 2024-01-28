import { ICard, Card } from "@/entities/card";

const TableCards = ({ cards }: { cards: ICard[] }) => {

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 flex gap-x-4">
            {cards.map(card => <Card key={card.id} suit={card.suit} rank={card.rank} interactive={false} active />)}
        </div >
    )
}

export default TableCards;