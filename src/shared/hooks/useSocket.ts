import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch } from "../store/hooks";
import { IUser } from "@/entities/user";
import { gameSlice } from "../store/reducers/GameSlice";
import { GameInfo } from "@/entities/game/GameStartedResponse";
import { IGame } from "@/entities/game/Game";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();

  const dispatch = useAppDispatch();
  const { handleGameInfo } = gameSlice.actions;

  const switchReady = useCallback(() => {
    if (socket) {
      socket.emit("switch_ready");
    }
  }, [socket]);

  useEffect(() => {
    const s = io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
    });
    setSocket(s);

    s.on("info", (data: GameInfo) => {
      console.log(data);
      dispatch(handleGameInfo(data))
      
    })
 

    return () => {
      s.disconnect();
    };
  }, [dispatch, gameId, handleGameInfo, playerId]);
  return { switchReady };
};
