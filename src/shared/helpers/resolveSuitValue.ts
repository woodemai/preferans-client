import { ICard, Suit } from "@/entities/card"

const getValue = (suit: Suit) => {
    switch (suit) {
        case Suit.SPADES:
            return 0;
        case Suit.CLUBS:
            return 1;
        case Suit.DIAMONDS:
            return 2;
        case Suit.HEARTS:
            return 3;
    }
}

export const resolveSuitValue = (card1: ICard, card2: ICard) => {
    return getValue(card1.suit) - getValue(card2.suit);
}