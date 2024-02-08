import { ICard, Rank, Suit } from "@/entities/card";

const getValue = (suit: Suit): number => {
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
};
const getRankValue = (rank: Rank): number => {
  switch (rank) {
    case Rank.SEVEN:
      return 7;
    case Rank.EIGHT:
      return 8;
    case Rank.NINE:
      return 9;
    case Rank.TEN:
      return 10;
    case Rank.JACK:
      return 11;
    case Rank.QUEEN:
      return 12;
    case Rank.KING:
      return 13;
    case Rank.ACE:
      return 14;
  }
};

export const resolveSuitValue = (card1: ICard, card2: ICard): number => {
  const suitDiff = getValue(card1.suit) - getValue(card2.suit);
  if (suitDiff === 0) {
    return getRankValue(card1.rank) - getRankValue(card2.rank);
  } else {
    return suitDiff;
  }
};
