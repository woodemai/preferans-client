import { GameState } from "./GameState"

export type IGame = {
    id: string,
    state: GameState,
    size: number
}