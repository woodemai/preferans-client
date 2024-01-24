import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch } from "../store/hooks";
import { gameSlice } from "../store/reducers/GameSlice";
import { GameInfo } from "@/entities/game/GameInfo";
import { IBet } from "../helpers/getTradingChoices";
import { MoveInfo } from "@/entities/game/MoveInfo";
import { ICard } from "@/entities/card";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();

  const dispatch = useAppDispatch();
  const { handleGameInfo, handleAllReady, handleMoveInfo, handleNextTurn } =
    gameSlice.actions;

  const switchReady = useCallback(() => {
    if (socket) {
      socket.emit("switch_ready");
    }
  }, [socket]);

  const handleChoice = useCallback(
    (choice: IBet) => {
      if (socket) {
        socket.emit("send_bet", choice);
      }
    },
    [socket]
  );

  const handleCard = useCallback(
    (card: ICard) => {
      if (socket) {
        dispatch(handleNextTurn());
        socket.emit("send_card", card);
      }
    },
    [dispatch, handleNextTurn, socket]
  );

  useEffect(() => {
    const s = io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
    });
    setSocket(s);

    s.on("info", (data: GameInfo) => {
      dispatch(handleGameInfo(data));
    });
    s.on("next_turn", () => {
      dispatch(handleNextTurn());
    });
    s.on("move", (data: MoveInfo) => {
      dispatch(handleMoveInfo(data));
    });
    s.on("all_ready", () => {
      dispatch(handleAllReady());
    });

    return () => {
      s.disconnect();
    };
  }, [dispatch, gameId, handleAllReady, handleGameInfo, handleMoveInfo, handleNextTurn, playerId]);
  return { switchReady, handleChoice, handleCard };
};
