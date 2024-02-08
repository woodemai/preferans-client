import { IBet, BetType, SuitNT } from "@/entities/bet";
import { Suit } from "@/entities/card";

export const getChoices = (): IBet[] => {
  const choices: IBet[] = [];
  for (let i = 6; i <= 10; i++) {
    Object.values(Suit).forEach((suit) => {
      choices.push({
        type: BetType.VALUE,
        value: i,
        suit,
      });
    });
    choices.push({
      type: BetType.VALUE,
      value: i,
      suit: SuitNT.NT,
    });
  }
  return choices;
};
