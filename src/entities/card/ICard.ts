import { Rank } from "./Rank";
import { Suit } from "./Suit";

export interface ICard {
    id: string
    suit: Suit,
    rank: Rank
}