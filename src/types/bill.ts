export type Bill = {
  id: number;
  name: string;
  amount: number;
  status: 'pago' | 'pendente';
};

export type BillDb = Omit<Bill, 'status'> & {
  status: boolean;
};

