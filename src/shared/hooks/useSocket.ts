import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch } from "../store/hooks";
import { gameSlice } from "../store/reducers/GameSlice";
import { GameInfo } from "@/entities/game/GameStartedResponse";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();

  const dispatch = useAppDispatch();
  const { handleGameInfo, handleAllReady } = gameSlice.actions;

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
      dispatch(handleGameInfo(data))
      
    })
    s.on("all_ready", () => {
      dispatch(handleAllReady());
    });
 

    return () => {
      s.disconnect();
    };
  }, [dispatch, gameId, handleAllReady, handleGameInfo, playerId]);
  return { switchReady };
};
