import { Suit } from "@/entities/card";

export type TradingChoice = {
  value: number;
  suit: Suit | "БК"; // No trump card - без козыря
};

export const getChoices = (): TradingChoice[] => {
  const choices: TradingChoice[] = [];
  for (let i = 6; i <= 10; i++) {
    Object.values(Suit).forEach((suit) => {
      choices.push({
        value: i,
        suit,
      });
    });
    choices.push({
      value: i,
      suit: "БК",
    });
  }
  return choices;
};