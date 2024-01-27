import { BetSuit, SuitNT } from ".";
import { Suit } from "../card";

export const resolveBetSuit = (suit: BetSuit) => {
  switch (suit) {
    case Suit.HEARTS:
      return '♥'
    case Suit.DIAMONDS:
      return '♦'
    case Suit.CLUBS:
      return '♣'
    case Suit.SPADES:
      return '♠';
    case SuitNT.NT:
      return 'БК';
  }
}