import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { GameState } from "@/entities/game";

export const useTurn = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { game, players } = useAppSelector((state) => state.gameReducer);
  const [isTurn, setIsTurn] = useState(false);

  useEffect(() => {
    if (game.state === GameState.TRADING) {
      setIsTurn(players[game.currentPlayerIndex].id === user.id);
    }
  }, [game.currentPlayerIndex, game.state, players, user.id]);

  return { isTurn };
};
