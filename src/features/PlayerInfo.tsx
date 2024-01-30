import { BetType, IBet } from "@/entities/bet";
import { resolveBetSuit } from "@/entities/bet/resolveBetSuit";

interface Props {
    bet?: IBet,
    name: string,
    score: number,
}

const resolveBet = (bet: IBet) => {
    switch (bet.type) {
        case BetType.MIZER:
            return <>МИЗЕР</>
        case BetType.PASS:
            return <>ПАС</>
        case BetType.VALUE:
            return <>{`${bet.value} ${resolveBetSuit(bet.suit)}`}</>
        default:
            break;
    }
}


const PlayerInfo = ({ bet, name, score }: Props) => {

    return (
        <section className="bg-secondary rounded-sm shadow-md p-4 flex flex-col gap-y-2">
            <h6>{`Имя: ${name}`}</h6>
            <p>{score > 0 && `Взяток: ${score}`}</p>
            <p>{bet && resolveBet(bet)}</p>
        </section>
    )
}

export default PlayerInfo;