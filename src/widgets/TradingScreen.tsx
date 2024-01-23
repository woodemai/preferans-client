import { Suit } from "@/entities/card";
import { getChoices } from "@/shared/helpers/getTradingChoices"
import { resolveSuit } from "@/shared/helpers/resolveCard";
import { cn } from "@/shared/lib/utils";

const choices = getChoices()
const isSuitRed = (suit:Suit | "БК") => {
    return suit === Suit.HEARTS || suit === Suit.DIAMONDS
}

const TradingScreen = () => {

    return (
        <div className="z-[100] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-md shadow-md p-4 flex flex-col">
            <h1 className="font-bold tracking-tight text-xl mb-2">Trading</h1>
            <div className="rounded-sm">
                <div className="grid grid-cols-5 grid-rows-5">
                    {choices.map(choice =>
                        <div className="flex justify-center items-center cursor-pointer hover:bg-accent border border-gray-200 p-1 gap-1" key={choice.suit + choice.value.toExponential}>
                            <div>{choice.value}</div>
                            <div className={cn(isSuitRed(choice.suit) && "text-red-500")}>{resolveSuit(choice.suit)}</div>
                        </div>)}
                </div>
                <div className="flex justify-evenly w-full">
                    <div className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-gray-200 bt-0">Мизер</div>
                    <div className="text-center p-1 w-full cursor-pointer hover:bg-accent border border-gray-200 bt-0">Пас</div>
                </div>
            </div>
        </div>
    )
}

export default TradingScreen;