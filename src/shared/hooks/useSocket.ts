import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { gameSlice } from "../store/reducers/GameSlice";
import { authSlice } from "../store/reducers/AuthSlice";
import { ICard } from "@/entities/card";
import { GameState, GameInfo, MoveInfo } from "@/entities/game";
import { IBet } from "@/entities/bet";

const BASE_URL = "http://localhost:8086";

export const useSocket = (gameId: string, playerId: string) => {
  const [socket, setSocket] = useState<undefined | Socket>();

  const dispatch = useAppDispatch();

  const {
    handleGameInfo,
    handleAllReady,
    handleMoveInfo,
    handleNextTurn,
    handlePurchaseMove,
    handleBribeEnd,
    handleChangeState,
    handleReady,
    handleWin,
    handleDrop,
    handleBetInfo,
  } = gameSlice.actions;

  const { handleSwitchReady, handleDisconnect } = authSlice.actions;

  const { game } = useAppSelector((state) => state.gameReducer);

  const switchReady = useCallback(() => {
    if (socket) {
      socket.emit("switch_ready");
      dispatch(handleSwitchReady());
    }
  }, [dispatch, handleSwitchReady, socket]);

  const handleBet = useCallback(
    (bet: IBet) => {
      if (socket) {
        if (game.state === GameState.REBET) {
          socket.emit("send_rebet", bet)
        } else {
          socket.emit("send_bet", bet);
        }
      }
    },
    [game.state, socket]
  );

  const handleCard = useCallback(
    (card: ICard) => {
      if (socket) {
        if (game.state === GameState.GAMEPLAY) {
          socket.emit("send_card", card);
        } else if (game.state === GameState.DROPPING) {
          socket.emit("send_drop", card);
        }
      }
    },
    [game.state, socket]
  );

  useEffect(() => {
    const s = io(BASE_URL, {
      query: { gameId: gameId, playerId: playerId },
      withCredentials: true,
    });
    setSocket(s);

    s.on("info", (info: GameInfo) => {
      dispatch(handleGameInfo(info));
    });
    s.on("next_turn", () => {
      dispatch(handleNextTurn());
    });
    s.on("handle_state", (state: GameState) => {
      dispatch(handleChangeState(state));
    });
    s.on("handle_ready", (playerId: string) => {
      dispatch(handleReady(playerId));
    });
    s.on("move", (info: MoveInfo) => {
      dispatch(handleMoveInfo(info));
      dispatch(handleNextTurn());
    });
    s.on("drop", (playerId: string, card: ICard) => {
      dispatch(handleDrop({ playerId, card }));
    });
    s.on("bet", (playerId: string, bet: IBet) => {
      dispatch(handleBetInfo({ playerId, bet }));
    });
    s.on("bribe_end", (winnerId: string) => {
      dispatch(handleBribeEnd(winnerId));
      dispatch(handlePurchaseMove());
    });
    s.on("move_purchase", () => {
      dispatch(handlePurchaseMove());
    });
    s.on("handle_win", (winnerId: string) => {
      dispatch(handleWin(winnerId));
    });
    s.on("all_ready", () => {
      dispatch(handleAllReady());
    });

    return () => {
      s.disconnect();
      dispatch(handleDisconnect());
    };
  }, [dispatch, gameId, handleAllReady, handleBetInfo, handleBribeEnd, handleChangeState, handleDisconnect, handleDrop, handleGameInfo, handleMoveInfo, handleNextTurn, handlePurchaseMove, handleReady, handleWin, playerId]);
  return { switchReady, handleChoice: handleBet, handleCard };
};
