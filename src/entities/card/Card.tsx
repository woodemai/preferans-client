import { FC } from "react";
import { Rank, Suit } from ".";

interface Props {
    rank: Rank,
    suit: Suit
}

const Card:FC<Props> = ({rank, suit}) => {

    return (
        <div>
            {rank}
            {suit}
        </div>
    )
}

export default Card;