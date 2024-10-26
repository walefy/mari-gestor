import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Receipt, Trash2 } from 'lucide-react';

type MenuBillDialogProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleRemoveBill: () => void;
  handlePaymentBill: () => void;
};

export function MenuBillDialog({ children, open, onOpenChange, handleRemoveBill, handlePaymentBill }: MenuBillDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}

      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 shadow-lg text-gray-100 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Gerencie sua conta</DialogTitle>
        </DialogHeader>
          <Button onClick={handleRemoveBill} className="bg-transparent cursor-default">
            <Trash2 className="w-6 h-6 ml-2 hover:brightness-50 text-red-500" />
            Apagar conta
          </Button>

          <Button onClick={handlePaymentBill} className="bg-transparent">
            <Receipt className="w-6 h-6 ml-2 hover:brightness-50 text-green-500" />
            Pagar conta
          </Button>
      </DialogContent>
    </Dialog>
  );
}
