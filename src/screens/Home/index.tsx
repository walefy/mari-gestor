import { CardBill } from '@/components/card-bill';
import { CardResume } from '@/components/card-resume';
import { CardSalary } from '@/components/card-salary';
import { SalaryDialog } from '@/components/salary-dialog';
import { BillDialog } from '@/components/bill-dialog';
import { useHome } from './useHome';
import { BillService } from '@/services/bill-service';
import { SalaryService } from '@/services/salary-service';

type HomeProps = {
  salaryService: SalaryService;
  billService: BillService;
};

export function Home({ billService, salaryService }: HomeProps) {
  const {
    billAmountRef,
    billModalStatus,
    billNameRef,
    bills,
    handleAddBill,
    handlePaymentBill,
    handleAddSalary,
    handleRemoveBill,
    handleRemoveSalary,
    salaries,
    salaryAmountRef,
    salaryModalStatus,
    salaryNameRef,
    totalSalary,
    setBillModalStatus,
    setSalaryModalStatus
  } = useHome({ billService, salaryService  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalaryDialog
            open={salaryModalStatus}
            amountRef={salaryAmountRef}
            nameRef={salaryNameRef}
            onOpenChange={setSalaryModalStatus}
            handleAddSalary={handleAddSalary}
          >
            <CardSalary salaries={salaries} handleRemoveSalary={handleRemoveSalary} />
          </SalaryDialog>
          <CardResume bills={bills} totalSalary={totalSalary} />
        </div>
        <BillDialog
          open={billModalStatus}
          amountRef={billAmountRef}
          nameRef={billNameRef}
          onOpenChange={setBillModalStatus}
          handleAddBill={handleAddBill}
        >
          <CardBill
            bills={bills}
            salaries={salaries}
            totalSalary={totalSalary}
            handleRemoveBill={handleRemoveBill}
            handlePaymentBill={handlePaymentBill}
          />
        </BillDialog>
      </div>
    </main>
  );
}
