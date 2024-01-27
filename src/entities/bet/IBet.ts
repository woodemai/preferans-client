import { BetSuit } from "./BetSuit";
import { BetType } from "./BetType";

type IBetMizer = {
  type: BetType.MIZER;
};
type IBetPass = {
  type: BetType.PASS;
};
type IBetValue = {
  type: BetType.VALUE;
  value: number;
  suit: BetSuit;
};
export type IBet = IBetMizer | IBetPass | IBetValue;
