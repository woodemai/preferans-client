import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { gameApi } from "../store/services/GameService";
import { useAppDispatch } from "../store/hooks";
import { authApi } from "../store/services/AuthService";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();
  //const [loading, setLoading] = useState(false);
  // const [connect, { isLoading: connectionLoader }] =
  //   gameApi.useConnectMutation();
  // const [disconnect, { isLoading: disconnectionLoader }] =
  //   gameApi.useDisconnectMutation();

  const dispatch = useAppDispatch();

  const switchReady = useCallback(() => {
    if (socket) {
      socket.emit("switch_ready");
    }
  }, [socket]);
  // useEffect(() => {
  //   setLoading(connectionLoader || disconnectionLoader);
  // }, [connectionLoader, disconnectionLoader]);

  useEffect(() => {
    const s = io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
    });
    setSocket(s);

    s.on("connect", () => {
      console.log("connected to the server");
    });

    s.on("users", async () => {
      console.log("users");
      dispatch(gameApi.util.invalidateTags(["Users"]));
      dispatch(authApi.util.invalidateTags(["Auth"]));
    });
    s.on("all_ready", () => {
      gameApi.util.invalidateTags(["Game"]);
    });

    return () => {
      console.log("disconnected to the server");
      s.disconnect();
    };
  }, [dispatch, gameId, playerId]);
  return { switchReady };
};
