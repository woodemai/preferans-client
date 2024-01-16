import { useEffect } from "react";
import { io } from "socket.io-client";
import { gameApi } from "../store/services/GameService";
import { useAppDispatch } from "../store/hooks";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [connect] = gameApi.useConnectMutation()
  const [disconnect] = gameApi.useDisconnectMutation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const s = io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
    })


    s.on("connect", () => {
      console.log('connected to the server');
      connect({ playerId, gameId })
    });

    s.on("users", async () => {
      console.log('users');
      dispatch(gameApi.util.invalidateTags(['Game']))
    })
    return () => {
      console.log('disconnected to the server');
      disconnect({ playerId, gameId })
      s.disconnect();
    };
  }, [connect, disconnect, dispatch, gameId, playerId]);
};
