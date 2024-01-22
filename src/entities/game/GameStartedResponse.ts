import { IUser } from "../user";
import { IGame } from "./Game";

export interface GameInfo {
    game: IGame,
    users: IUser[]
}