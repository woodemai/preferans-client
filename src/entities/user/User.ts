import { ICard } from "../card"
import { UserRole } from "./UserRole"

export type IUser = {
    id: string,
    email: string,
    password: string,
    name: string,
    score: number
    ready: boolean,
    role: UserRole,
    cards: ICard[]      
}