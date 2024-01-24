import { Suit, Rank } from "@/entities/card";

export const resolveSuit = (suit?: Suit | "NT") => {
  switch (suit) {
    case Suit.HEARTS:
      return <>♥</>;
    case Suit.DIAMONDS:
      return <>♦</>;
    case Suit.CLUBS:
      return <>♣</>;
    case Suit.SPADES:
      return <>♠</>;
    case "NT":
      return <>БК</>;
    default:
      return <>{suit}</>
  }
};

export const resolveRank = (rank: Rank) => {
  switch (rank) {
    case Rank.SEVEN:
      return <>7</>;
    case Rank.EIGHT:
      return <>8</>;
    case Rank.NINE:
      return <>9</>;
    case Rank.TEN:
      return <>10</>;
    case Rank.JACK:
      return <>J</>;
    case Rank.QUEEN:
      return <>Q</>;
    case Rank.KING:
      return <>K</>;
    case Rank.ACE:
      return <>T</>;
  }
};