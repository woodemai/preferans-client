import { IUser } from "@/entities/user";
import { useEffect, useState } from "react";

const useGetUserRivals = (userId: string, players: IUser[]) => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [leftRival, setLeftRival] = useState<IUser>();
  const [rightRival, setRightRival] = useState<IUser>();
  
  useEffect(() => {
    players.forEach((player, index) => {
      if (player.id === userId) {
        setCurrentUser(player);

        const leftIndex = (index + 1) % 3;
        const rightIndex = (index + 2) % 3;

        setLeftRival(players[leftIndex]);
        setRightRival(players[rightIndex]);
      }
    });
  }, [players, userId]);

  return { currentUser, leftRival, rightRival };
};
export default useGetUserRivals;
