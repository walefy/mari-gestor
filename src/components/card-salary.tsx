import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2Icon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DialogTrigger } from '@/components/ui/dialog';
import { Salary } from '@/types/salary';

type CardSalaryProps = {
  salaries: Salary[];
  handleRemoveSalary: (id: number) => void;
}

export function CardSalary({ salaries, handleRemoveSalary }: CardSalaryProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl font-semibold text-indigo-300">
          <span>Salários</span>

          <DialogTrigger asChild>
            <Plus className="w-6 h-6 ml-2 hover:brightness-50" />
          </DialogTrigger>
        </CardTitle>
      </CardHeader>
      <Separator className="bg-gray-700" />
      <CardContent className="pt-6">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-left text-gray-300">Nome</TableHead>
              <TableHead className="text-right text-gray-300">Valor</TableHead>
              <TableHead className="text-right text-gray-300">Apagar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaries.map(salary => (
              <TableRow key={salary.id} className="border-b border-gray-700">
                <TableCell className="text-left text-gray-300">{salary.name}</TableCell>
                <TableCell className="text-right text-gray-300">R$ {salary.amount.toFixed(2)}</TableCell>
                <TableCell className="flex justify-end text-gray-300">
                  <Trash2Icon
                    className="w-6 h-6 hover:brightness-50"
                    color="#ff4b4b"
                    onClick={() => handleRemoveSalary(salary.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
