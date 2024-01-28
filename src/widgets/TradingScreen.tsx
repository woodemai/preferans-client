import { IBet, BetType } from "@/entities/bet";
import { TradingScreenItem } from "@/features/TradingScreenItem";
import { getChoices } from "@/shared/helpers/getTradingChoices";

const choices = getChoices()
interface Props {
    handleChoice: (choice: IBet) => void,
    show: boolean
}


const TradingScreen = ({ handleChoice, show }: Props) => {


    const handleClick = (bet: IBet) => {
        handleChoice(bet)
    }
    if (show) {
        return (

            <div className="z-[100] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-card rounded-md shadow-md p-4 flex flex-col">
                <h1 className="font-bold tracking-tight text-xl mb-2">Trading</h1>
                <div className="rounded-sm">
                    <div className="grid grid-cols-5 grid-rows-5">
                        {choices.map((choice, i) => <TradingScreenItem onClick={() => handleClick(choice)} choice={choice} key={i} />)}
                    </div>
                    <div className="flex justify-evenly w-full">
                        <TradingScreenItem onClick={() => handleClick({ type: BetType.MIZER })} choice={{ type: BetType.MIZER }} />
                        <TradingScreenItem onClick={() => handleClick({ type: BetType.PASS })} choice={{ type: BetType.PASS }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TradingScreen;