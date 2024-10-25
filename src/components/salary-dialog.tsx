import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SalaryDialogProps = {
  children: React.ReactNode;
  open: boolean;
  nameRef: React.RefObject<HTMLInputElement>;
  amountRef: React.RefObject<HTMLInputElement>;
  onOpenChange: (open: boolean) => void;
  handleAddSalary: () => void;
};

export function SalaryDialog({ children, open, onOpenChange, nameRef, amountRef, handleAddSalary }: SalaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}

      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 shadow-lg text-gray-100">
        <DialogHeader>
          <DialogTitle>Adicione um novo salário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" ref={nameRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Valor
            </Label>
            <Input id="amount" className="col-span-3" ref={amountRef} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddSalary}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
