import CreateGameButton from "@/features/button/CreateGameButton";
import GameList from "@/widgets/GameList";


export const HomePage = () => {
    

    return (
        <div className="flex flex-col items-center gap-y-4 mt-4 w-full">
            <CreateGameButton />
            <GameList />
        </div>
    )
}

export default HomePage