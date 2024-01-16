import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BASE_URL = "http://0.0.0.0:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState(
    io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
    })
  );

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setSocket(
      io(BASE_URL, {
        query: { gameId: gameId, playerId: playerId },
      })
    );

    socket.on("connect", () => {
      setIsConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId, playerId, socket]);
  return { isConnected };
};
