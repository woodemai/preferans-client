import { BetSuit, BetType, IBet, SuitNT } from ".";
import { Suit } from "../card";

const getSuitNumber = (suit: BetSuit) => {
  switch (suit) {
    case Suit.SPADES:
      return 0;
    case Suit.CLUBS:
      return 1;
    case Suit.DIAMONDS:
      return 2;
    case Suit.HEARTS:
      return 3;
    case SuitNT.NT:
      return 4;
  }
};

export const isBetBigger = (userBet: IBet, bet: IBet) => {
  if (
    userBet.type === BetType.PASS ||
    bet.type === BetType.PASS ||
    userBet.type === BetType.MIZER ||
    bet.type === BetType.MIZER
  ) {
    return false;
  }

  const valueDiff = userBet.value - bet.value;
  if (valueDiff > 0) {
    return false;
  } else if (valueDiff < 0) {
    return true;
  } else {
    const suitDiff = getSuitNumber(userBet.suit) - getSuitNumber(bet.suit);
    if (suitDiff > 0) {
      return false;
    } else {
      return true;
    }
  }
};
