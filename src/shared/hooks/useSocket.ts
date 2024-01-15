import { useCallback, useEffect, useState } from "react"
import { SocketResponse } from "../types/SocketResponse";
import { IUser } from "@/entities/user";
import { io } from "socket.io-client";

const BASE_URL = "http://0.0.0.0:8086";

export const useSocket = (gameId: string, playerId: string) => {
    const [socket, setSocket] = useState(io(BASE_URL, {
        query: { gameId: gameId }
    }));
    const [response, setResponse] = useState<SocketResponse>({
        gameId: '',
        users: []
    });
    
    const [isConnected, setIsConnected] = useState(false);

    const sendData = useCallback((payload: { users: IUser[] }) => {
        socket.emit("send_message", {
            gameId: gameId,
            users: payload.users
        })
    }, [socket, gameId])
    
    useEffect(() => {
        if (gameId && playerId) {            
            const s = io(BASE_URL, {
                query: { gameId: gameId, playerId: playerId }
            })
            setSocket(s)

            s.on("connect", () => {
                setIsConnected(true);
            });
            s.on("connect_error", (error) => {
                console.error("SOCKET CONNECTION ERROR", error);
            });

            s.on("get_users", (res) => {
                setResponse({
                    gameId: res.gameId,
                    users: res.users
                });
            });
            return () => {
                s.disconnect();
            }
        }
    }, [gameId, playerId])
    return { isConnected, response, sendData }
}