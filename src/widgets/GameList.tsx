import { GameCard } from "@/entities/game"
import Spinner from "@/shared/components/ui/spinner"
import { gameApi } from "@/shared/store/services/GameService"
import { CSSTransition, TransitionGroup } from "react-transition-group"

const GameList = () => {
  const { data: games, isLoading, error } = gameApi.useGetAllGamesQuery({ pageNumber: 0, pageSize: 5 }, { pollingInterval: 1000 })
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

  return (
    <>
      <TransitionGroup className='flex flex-col w-full sm:max-w-sm md:max-w-md gap-y-4'>
        {games.map(game =>
          <CSSTransition
            key={game.id}
            timeout={500}
            classNames='page'
          >
            <GameCard game={game} />
          </CSSTransition>
        )}
      </TransitionGroup>
      {games.length === 0 && <h3>No games found</h3>}
    </>
  )
}

export default GameList