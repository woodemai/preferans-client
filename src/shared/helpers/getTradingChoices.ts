import { Suit } from "@/entities/card";

export enum BetType {
  VALUE ="VALUE",
  MIZER = "MIZER",
  PASS = "PASS"
}
export interface IBet {
  type: BetType
  value?: number;
  suit?: Suit | "БК";
}

export const getChoices = (): IBet[] => {
  const choices: IBet[] = [];
  for (let i = 6; i <= 10; i++) {
    Object.values(Suit).forEach((suit) => {
      choices.push({
        type: BetType.VALUE,
        value: i,
        suit
      });
    });
    choices.push({
      type: BetType.VALUE,
      value: i,
      suit: "БК",
    });
  }
  return choices;
};
