import { ICard } from "../card"
import { GameState } from "./GameState"

export interface IGame {
  id: string,
  state: GameState,
  size: number,
  purchase: ICard[],
  tableDeck: ICard[],
  bribeWinnerCard: ICard | null,
  currentPlayerIndex: number,
}