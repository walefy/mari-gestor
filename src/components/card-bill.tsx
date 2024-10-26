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
import { Salary } from '@/types/salary';
import { useState } from 'react';
import { MenuBillDialog } from './menu-bill-dialog';

type CardBillProps = {
  bills: Bill[];
  salaries: Salary[];
  totalSalary: number;
  handleRemoveBill: (id: number) => Promise<void>;
  handlePaymentBill: (id: number) => Promise<void>;
}

export function CardBill({ bills, salaries, handlePaymentBill, handleRemoveBill, totalSalary }: CardBillProps) {
  const [open, setOpen] = useState(false);
  const [clickedId, setClickedId] = useState<number | null>(null);

  const percentPerSalary = salaries.map((salary) => ({
    name: salary.name,
    percent: salary.amount / totalSalary,
  }));

  const handlePaymentWithDialog = async (id: number) => {
    setOpen(false);
    await handlePaymentBill(id);
  };

  const handleRemoveWithDialog = async (id: number) => {
    setOpen(false);
    await handleRemoveBill(id);
  };

  const handleOpenDialog = (id: number) => {
    setClickedId(id);
    setOpen(true);
  };

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
              {salaries.map((salary) => (
                <TableHead key={salary.id} className="text-left text-gray-300">{salary.name}</TableHead>
              ))}
              <TableHead className="text-left text-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {bills.map((bill) => (
              <MenuBillDialog
                key={bill.id}
                handlePaymentBill={(() => handlePaymentWithDialog(bill.id))}
                handleRemoveBill={(() => handleRemoveWithDialog(bill.id))}
                onOpenChange={setOpen}
                open={open && clickedId === bill.id}
              >
                <TableRow
                  className="border-b border-gray-700 hover:bg-gray-600 transition-colors"
                  onClick={() => handleOpenDialog(bill.id)}
                >
                  <TableCell>{bill.name}</TableCell>
                  <TableCell>{bill.amount.toFixed(2)}</TableCell>
                  {percentPerSalary.map((percent) => (
                    <TableCell key={percent.name}>{(percent.percent * bill.amount).toFixed(2)}</TableCell>
                  ))}
                  <TableCell>{bill.status}</TableCell>
                </TableRow>
              </MenuBillDialog>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
