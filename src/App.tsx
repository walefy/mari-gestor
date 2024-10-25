import Database from '@tauri-apps/plugin-sql';
import { CardBill } from './components/card-bill';
import { CardResume } from './components/card-resume';
import { CardSalary } from './components/card-salary';
import { useEffect, useRef, useState } from 'react';
import { SalaryService } from './services/salary-service';
import { Salary } from './types/salary';
import { BillService } from './services/bill-service';
import { Bill } from './types/bill';
import { SalaryDialog } from './components/salary-dialog';
import { BillDialog } from './components/bill-dialog';

const db = await Database.load('sqlite://../database.db');
const salaryService = new SalaryService(db);
const billService = new BillService(db);

function App() {
  const salaryNameRef = useRef<HTMLInputElement>(null);
  const salaryAmountRef = useRef<HTMLInputElement>(null);
  const billNameRef = useRef<HTMLInputElement>(null);
  const billAmountRef = useRef<HTMLInputElement>(null);
  const [salaryModalStatus, setSalaryModalStatus] = useState(false);
  const [billModalStatus, setBillModalStatus] = useState(false);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    fetchSalaries();
    fetchBills();
  }, []);

  const fetchBills = () => {
    billService.getAllBills().then(([bills, error]) => {
      if (error) {
        console.error('Failed to fetch bills:', error);
        return;
      }

      setBills(bills!);
    });
  };

  const fetchSalaries = () => {
    salaryService.getAllSalaries().then(([salaries, error]) => {
      if (error) {
        console.error('Failed to fetch salaries:', error);
        return;
      }

      setSalaries(salaries!);
    });
  };

  const handleRemoveSalary = async (id: number) => {
    const [, error] = await salaryService.removeSalary(id);

    if (error) {
      console.error('Failed to remove salary:', error);
      return;
    }

    fetchSalaries();
  };

  const handleAddSalary = async () => {
    const inputName = salaryNameRef.current?.value;
    const inputAmount = salaryAmountRef.current?.value;

    if (!inputName || !inputAmount) {
      console.error('Name or amount is empty');
      return;
    }

    const [, error] = await salaryService.addSalary(inputName, Number(inputAmount));

    if (error) {
      console.error('Failed to add salary:', error);
      return;
    }

    setSalaryModalStatus(false);
    fetchSalaries();
  };

  const handleAddBill = async () => {
    const inputName = billNameRef.current?.value;
    const inputAmount = billAmountRef.current?.value;

    if (!inputName || !inputAmount) {
      console.error('Name or amount is empty');
      return;
    }

    const [, error] = await billService.addBill(inputName, Number(inputAmount));

    if (error) {
      console.error('Failed to add bill:', error);
      return;
    }

    setBillModalStatus(false);
    fetchBills();
  };

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
          <CardResume />
        </div>
        <BillDialog
          open={billModalStatus}
          amountRef={billAmountRef}
          nameRef={billNameRef}
          onOpenChange={setBillModalStatus}
          handleAddBill={handleAddBill}
        >
          <CardBill bills={bills} />
        </BillDialog>
      </div>
    </main>
  );
}

export default App;
