import { ServiceError } from '@/errors/service-error';
import { Bill, BillDb } from '@/types/bill';
import { ServiceResponse } from '@/types/service-response';
import Database from '@tauri-apps/plugin-sql';

export class BillService {
  constructor(private readonly db: Database) {}

  public async addBill(name: string, amount: number): ServiceResponse<Bill> {
    try {
      const query = 'INSERT INTO bills (name, amount) VALUES ($1, $2)';
      const { lastInsertId: id } = await this.db.execute(query, [name, amount]);
  
      return this.getBillById(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async getBillById(id: number): ServiceResponse<Bill> {
    try {
      const billDb: BillDb = await this.db.select('SELECT * from bills WHERE id = $1', [id]);
      const bill: Bill = { ...billDb, status: billDb.status ? 'pago' : 'pendente' };

      return [bill, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async getAllBills(): ServiceResponse<Bill[]> {
    try {
      const query = 'SELECT * from bills ORDER BY status ASC';
      const billsDb: BillDb[] = await this.db.select(query);
      const bills: Bill[] = billsDb.map((billDb) => ({ ...billDb, status: billDb.status ? 'pago' : 'pendente' }));

      return [bills, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async removeBill(id: number): ServiceResponse<void> {
    try {
      const query = 'DELETE FROM bills WHERE id = $1';
      await this.db.execute(query, [id]);

      return [null, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async updateBillStatus(id: number, status: boolean): ServiceResponse<Bill> {
    try {
      const query = 'UPDATE bills SET status = $1 WHERE id = $2';
      const { lastInsertId } = await this.db.execute(query, [status, id]);

      return this.getBillById(lastInsertId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }
}
