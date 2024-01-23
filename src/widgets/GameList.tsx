import {GameCard} from "@/entities/game"
import Spinner from "@/shared/components/ui/spinner"
import { gameApi } from "@/shared/store/services/GameService"

const GameList = () => {
  const { data: games, isLoading, error } = gameApi.useGetAllGamesQuery()

  if (error) {
    return <div>Error!</div>
  }
  if (isLoading || !games) {
    return (
      <div className="flex justify-center items-center w-full p-4">
        <Spinner />
      </div>
    )
  }
  if (games?.length < 1) {
    return (
      <div className="text-2xl font-bold flex justify-center items-center w-full p-4">
        No games found
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full gap-y-4">
      {games.map(game => <GameCard game={game} key={game.id} />)}
    </div>
  )
}

export default GameList