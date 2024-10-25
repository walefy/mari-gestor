import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function CardResume() {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-indigo-300">Resumo</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-700" />
      <CardContent className="pt-6 space-y-2">
        <p className="text-gray-300">Contas pendentes: 3</p>
        <p className="text-gray-300">Valor total a pagar: R$ 2.500,00</p>
        <p className="text-gray-300">Valor já pago: R$ 1.800,00</p>
        <p className="text-gray-300">Saldo restante: R$ 700,00</p>
      </CardContent>
    </Card>
  );
}
