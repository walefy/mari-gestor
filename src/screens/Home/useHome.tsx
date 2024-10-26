import { BillService } from '@/services/bill-service';
import { SalaryService } from '@/services/salary-service';
import { Bill } from '@/types/bill';
import { Salary } from '@/types/salary';
import { useEffect, useRef, useState } from 'react';

type UseHomeProps = {
  salaryService: SalaryService;
  billService: BillService;
};

export function useHome({ billService, salaryService }: UseHomeProps) {
  const salaryNameRef = useRef<HTMLInputElement>(null);
  const salaryAmountRef = useRef<HTMLInputElement>(null);
  const billNameRef = useRef<HTMLInputElement>(null);
  const billAmountRef = useRef<HTMLInputElement>(null);
  const [salaryModalStatus, setSalaryModalStatus] = useState(false);
  const [billModalStatus, setBillModalStatus] = useState(false);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  const totalSalary = salaries.reduce((acc, salary) => acc + salary.amount, 0);

  useEffect(() => {
    if (salaryService && billService) {
      fetchSalaries();
      fetchBills();
    }
  }, [salaryService, billService]);

  const fetchBills = () => {
    billService?.getAllBills().then(([bills, error]) => {
      if (error) {
        console.error('Failed to fetch bills:', error);
        return;
      }
      setBills(bills!);
    });
  };

  const fetchSalaries = () => {
    salaryService?.getAllSalaries().then(([salaries, error]) => {
      if (error) {
        console.error('Failed to fetch salaries:', error);
        return;
      }
      setSalaries(salaries!);
    });
  };

  const handleRemoveSalary = async (id: number) => {
    const [, error] = await salaryService?.removeSalary(id) || [null, 'Service not available'];
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

    const [, error] = await salaryService?.addSalary(inputName, Number(inputAmount)) || [null, 'Service not available'];
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

    const [, error] = await billService?.addBill(inputName, Number(inputAmount)) || [null, 'Service not available'];
    if (error) {
      console.error('Failed to add bill:', error);
      return;
    }

    setBillModalStatus(false);
    fetchBills();
  };

  const handleRemoveBill = async (id: number) => {
    const [, error] = await billService?.removeBill(id) || [null, 'Service not available'];
    if (error) {
      console.error('Failed to remove bill:', error);
      return;
    }
    fetchBills();
  };

  const handlePaymentBill = async (id: number) => {
    const [, error] = await billService?.updateBillStatus(id, true) || [null, 'Service not available'];
    if (error) {
      console.error('Failed to payment bill:', error);
      return;
    }
    fetchBills();
  };

  return {
    salaryNameRef,
    salaryAmountRef,
    billNameRef,
    billAmountRef,
    salaryModalStatus,
    billModalStatus,
    salaries,
    bills,
    totalSalary,
    fetchBills,
    fetchSalaries,
    handleAddBill,
    handleRemoveBill,
    handleAddSalary,
    handleRemoveSalary,
    handlePaymentBill,
    setSalaryModalStatus,
    setBillModalStatus,
  };
}
