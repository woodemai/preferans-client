import CreateGameButton from "@/features/button/CreateGameButton";
import { BulletTable } from "@/widgets/BulletTable";
import GameList from "@/widgets/GameList";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-full md:max-w-lg gap-y-4 mt-4">
            <CreateGameButton />
            <GameList />
            <BulletTable/>
        </div>
    )
}