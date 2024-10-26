import Database from '@tauri-apps/plugin-sql';
import { useEffect, useState } from 'react';
import { SalaryService } from './services/salary-service';
import { BillService } from './services/bill-service';
import { Home } from './screens/Home';

function App() {  
  const [salaryService, setSalaryService] = useState<SalaryService | null>(null);
  const [billService, setBillService] = useState<BillService | null>(null);

  useEffect(() => {
    async function initializeDatabase() {
      const db = await Database.load('sqlite://./database.db');
      setSalaryService(new SalaryService(db));
      setBillService(new BillService(db));
    }

    initializeDatabase();
  }, []);

  if (!billService && !salaryService) return <p>loading...</p>;

  return <Home billService={billService!} salaryService={salaryService!} />;
}

export default App;
