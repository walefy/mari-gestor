import Database from '@tauri-apps/plugin-sql';
import { ServiceError } from '@/errors/service-error';
import { ServiceResponse } from '@/types/service-response';
import { Salary } from '@/types/salary';

export class SalaryService {
  constructor(private readonly db: Database) {}

  public async addSalary(name: string, salary: number): ServiceResponse<Salary> {
    try {
      const [salaries] = await this.getAllSalaries();

      if (salaries && salaries.length >= 3) {
        return [null, new ServiceError('You can\'t have more than 3 salaries')];
      }

      const query = 'INSERT INTO salaries (name, amount) VALUES ($1, $2)';
      const { lastInsertId: id } = await this.db.execute(query, [name, salary]);

      return this.getSalaryById(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async getAllSalaries(): ServiceResponse<Salary[]> {
    try {
      const salaries: Salary[] = await this.db.select('SELECT * from salaries');
      return [salaries, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async getSalaryById(id: number): ServiceResponse<Salary> {
    try {
      const salary: Salary = await this.db.select('SELECT * from salaries WHERE id = $1', [id]);
      return [salary, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }

  public async removeSalary(id: number): ServiceResponse<void> {
    try {
      await this.db.execute('DELETE FROM salaries WHERE id = $1', [id]);
      return [null, null];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return [null, new ServiceError(errorMessage)];
    }
  }
}

