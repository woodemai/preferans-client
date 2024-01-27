import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { useAppSelector } from "@/shared/store/hooks"


export const ScoreTable = () => {
    const { players } = useAppSelector(state => state.gameReducer)
    return (
        <Table className="bg-card rounded-md shadow-md max-w-sm">
            <TableCaption>Таблица взяток</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Взятки</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {players.map(player => <TableRow key={player.id}><TableCell>{player.name}</TableCell><TableCell>{player.score}</TableCell></TableRow>)}
            </TableBody>
        </Table>
    )
}