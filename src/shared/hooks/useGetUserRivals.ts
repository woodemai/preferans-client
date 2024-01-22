import { IUser } from "@/entities/user";
import { useEffect, useRef, useState } from "react";

const useGetUserRivals = (userId: string, players: IUser[]) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [leftRival, setLeftRival] = useState<IUser>({} as IUser);
  const [rightRival, setRightRival] = useState<IUser>({} as IUser);

  const playersRef = useRef(players);

  useEffect(() => {
    const currentPlayer = players.find((player) => player.id == userId);
    setCurrentUser(currentPlayer ?? ({} as IUser));
    playersRef.current = players.filter((player) => player === currentPlayer);
    if (players.length === 2) {
      setLeftRival(players[0]);
      setRightRival(players[1]);
    }
  }, [players, userId]);

  return { currentUser, leftRival, rightRival };
};
export default useGetUserRivals;
