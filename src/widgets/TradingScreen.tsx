import { IBet, BetType } from "@/entities/bet";
import { TradingScreenItem } from "@/features/TradingScreenItem";
import { getChoices } from "@/shared/helpers/getTradingChoices";

const choices = getChoices()


const TradingScreen = ({ handleChoice }: { handleChoice: (choice: IBet) => void }) => {

    return (
        <div className="z-[100] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-md shadow-md p-4 flex flex-col">
            <h1 className="font-bold tracking-tight text-xl mb-2">Trading</h1>
            <div className="rounded-sm">
                <div className="grid grid-cols-5 grid-rows-5">
                    {choices.map((choice, i) => <TradingScreenItem handleChoice={handleChoice} choice={choice} key={i} />)}
                </div>
                <div className="flex justify-evenly w-full">
                    <TradingScreenItem handleChoice={handleChoice} choice={{type: BetType.MIZER}} />
                    <TradingScreenItem handleChoice={handleChoice} choice={{ type: BetType.PASS }} />
                </div>
            </div>
        </div>
    )
}

export default TradingScreen;