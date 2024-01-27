import { Suit } from "../card";

export enum SuitNT {
  NT = "NT",
}

export type BetSuit = Suit | SuitNT;
