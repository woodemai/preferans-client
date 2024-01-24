import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

export const useTurn = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { game, players  } = useAppSelector((state) => state.gameReducer);
  const [isTurn, setIsTurn] = useState(false);

  useEffect(() => {    
    if(players.length === 3) {  
      setIsTurn(players[game.currentPlayerIndex].id === user.id);
    }
  }, [game.currentPlayerIndex, players, user.id]);

  return { isTurn };
};
