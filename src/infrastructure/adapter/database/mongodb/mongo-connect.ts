import mongoose, { Mongoose } from 'mongoose';
import { injectable } from 'inversify';
import { InternalServerError } from '@presentation/errors/http-errors/internal-server-error';

@injectable()
export class MongoConnectionService {
  private _connection: Mongoose | undefined;

  public async getConnection(): Promise<Mongoose> {
    try {
        if (!this._connection) {
            this._connection = await mongoose.connect('mongodb://balta:e296cd9f@localhost:27017/admin');
          }
          return this._connection;
    } catch (error) {
        throw new InternalServerError(99, "Erro ao conectar ao banco");
    }
    
  }
}
