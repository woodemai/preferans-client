import { IUser } from "."

export type AuthResponse = {
    user: IUser,
    accessToken: string
}