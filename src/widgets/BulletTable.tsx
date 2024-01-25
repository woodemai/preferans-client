import { Table, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"

export const BulletTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Игрок</TableHead>
                    <TableHead>Пуля</TableHead>
                    <TableHead>Гора</TableHead>
                    <TableHead>Висты</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
        )
}