import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bill } from '@/types/bill';
import { Plus } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';

type CardBillProps = {
  bills: Bill[];
}

export function CardBill({ bills }: CardBillProps) {
  return (
    <Card className="flex flex-col bg-gray-800 border-gray-700 shadow-lg h-[350px]">
      <CardHeader className="flex justify-between flex-row">
        <CardTitle className="text-2xl font-semibold text-indigo-300">Contas</CardTitle>
        <DialogTrigger asChild>
          <Plus className="w-6 h-6 ml-2 hover:brightness-50 text-indigo-300" />
        </DialogTrigger>
      </CardHeader>
      <Separator className="bg-gray-700" />
      <CardContent className="pt-1 flex-grow overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-left text-gray-300">Nome</TableHead>
                  <TableHead className="text-left text-gray-300">Valor</TableHead>
                  <TableHead className="text-left text-gray-300">P1 (valor a pagar)</TableHead>
                  <TableHead className="text-left text-gray-300">P2 valor a pagar</TableHead>
                  <TableHead className="text-left text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {bills.map((bill) => (
                  <TableRow key={bill.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <TableCell>{bill.name}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>{bill.amount / 2}</TableCell>
                    <TableCell>{bill.amount / 2}</TableCell>
                    <TableCell>{bill.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </CardContent>
    </Card>
  );
}
