import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bill } from '@/types/bill';

type CardResumeProps = {
  bills: Bill[];
  totalSalary: number;
};

export function CardResume({ bills, totalSalary }: CardResumeProps) {
  const billsAmounts = bills.reduce((acc, bill) => {
    if (bill.status === 'pendente') {
      return { ...acc, pendingAmount: acc.pendingAmount + bill.amount };
    }
    return { ...acc, payedAmount: acc.payedAmount + bill.amount };
  }, { pendingAmount: 0, payedAmount: 0 });

  const remainingBalance = totalSalary - billsAmounts.payedAmount;

  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-indigo-300">Resumo</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-700" />
      <CardContent className="pt-6 space-y-2">
        <p className="text-gray-300">Contas pendentes: {bills.length}</p>
        <p className="text-gray-300">Valor total a pagar: R$ {billsAmounts.pendingAmount.toFixed(2)}</p>
        <p className="text-gray-300">Valor já pago: R$ {billsAmounts.payedAmount.toFixed(2)}</p>
        <p className="text-gray-300">Saldo restante: R$ {remainingBalance.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
