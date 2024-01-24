import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch } from "../store/hooks";
import { gameSlice } from "../store/reducers/GameSlice";
import { GameInfo } from "@/entities/game/GameInfo";
import { IBet } from "../helpers/getTradingChoices";
import { MoveInfo } from "@/entities/game/MoveInfo";
import { ICard } from "@/entities/card";
import { authSlice } from "../store/reducers/AuthSlice";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();

  const dispatch = useAppDispatch();
  const { handleGameInfo, handleAllReady, handleMoveInfo, handleNextTurn, handlePurchaseMove, handleBribeEnd } =
    gameSlice.actions;
  const {handleSwitchReady} = authSlice.actions

  const switchReady = useCallback(() => {
    if (socket) {
      socket.emit("switch_ready");
      dispatch(handleSwitchReady())
    }
  }, [dispatch, handleSwitchReady, socket]);

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
        socket.emit("send_card", card);
      }
    },
    [socket]
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
      dispatch(handleNextTurn());
    });
    s.on("bribe_end", (winnerId: string) => {
      dispatch(handleBribeEnd(winnerId))
      dispatch(handlePurchaseMove())
    });
    s.on("move_purchase", () => {
      dispatch(handlePurchaseMove())
    });
    s.on("all_ready", () => {
      dispatch(handleAllReady());
    });

    return () => {
      s.disconnect();
    };
  }, [dispatch, gameId, handleAllReady, handleBribeEnd, handleGameInfo, handleMoveInfo, handleNextTurn, handlePurchaseMove, playerId]);
  return { switchReady, handleChoice, handleCard };
};
