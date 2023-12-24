import CreateGameButton from "@/features/CreateGameButton";
import { Button } from "@/shared/components/ui/button";
import GameList from "@/widgets/GameList";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-full md:max-w-lg gap-y-4 mt-4">
            <CreateGameButton/>
            <GameList/>
        </div>
    )
}