import 'reflect-metadata';
import { injectable } from 'inversify';
import { Client } from 'pg';
import { DatabaseAdapter } from '../database-interface';
import { extractNamesAndValues } from './pg-uteis';

@injectable()
export class PostgresAdapter implements DatabaseAdapter {
  private client: Client;
  private table: string;

  constructor() {
    const host = process.env.DB_PG_HOST;
    const port = parseInt(process.env.DB_PG_PORT);
    const user = process.env.DB_PG_USER;
    const pass = process.env.DB_PG_PASS;
    const db = process.env.DB_NAME;
    this.client = new Client({
      host: host,
      port: port,
      user: user,
      password: pass,
      database: db,
    });
    this.client.connect();
  }

  setConfig(schema: string, location: string) {
    this.table = `"${schema}"."${location}"`;
  }

  async create<T>(entity: any): Promise<T> {
   
    const values = extractNamesAndValues(entity)
    
    const placeholders = Array.from({ length: values[1].length }, (_, i) => `$${i + 1}`).join(',')
    const fields = values[0].join(',');
    const query = `INSERT INTO ${this.table} (${fields}) VALUES(${placeholders}) RETURNING *`;
    const result = await this.client.query(query, values[1]);
    return result.rows[0] as T;
}

  async findAll<T>(_entity: any): Promise<T[]> {
    const result = await this.client.query(`SELECT * FROM ${this.table}`);
    return result.rows as T[];
  }

  async findOne<T>(id: string, _entity: any): Promise<T | null> {
    const result = await this.client.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
    return result.rows[0] as T || null;
  }

  async update<T>(id: string, updated: Partial<T>): Promise<T | null> {
    const keys = Object.keys(updated);
    const values = Object.values(updated);

    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    values.unshift(id);  // colocar id no início da lista de valores

    const query = {
      text: `UPDATE ${this.table} SET ${setClause} WHERE id = $1 RETURNING *`,
      values,
    };

    const result = await this.client.query(query);
    return result.rows[0] as T || null;
  }

  async delete<T>(id: string, _entity: any): Promise<T | null> {
    const result = await this.client.query(`DELETE FROM ${this.table} WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0] as T || null;
  }
}
