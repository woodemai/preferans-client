import { ICard } from "../card"
import { GameStage } from "./GameStage"
import { GameState } from "./GameState"

export type IGame = {
    id: string,
    state: GameState,
    size: number
    cards: ICard[]
    stage: GameStage
}