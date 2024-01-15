import { IUser } from "@/entities/user";

export interface SocketResponse {
    gameId: string,
    users: IUser[],
}