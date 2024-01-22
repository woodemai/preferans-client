import { Card, Rank, Suit } from "@/entities/card";
import CreateGameButton from "@/features/button/CreateGameButton";
import GameList from "@/widgets/GameList";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-full md:max-w-lg gap-y-4 mt-4">
            <CreateGameButton/>
            <GameList/>
            
            <div className="m-8"><Card suit={Suit.CLUBS} rank={Rank.ACE} /></div>
        </div>
    )
}