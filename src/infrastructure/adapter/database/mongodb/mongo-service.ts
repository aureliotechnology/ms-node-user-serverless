import { injectable } from 'inversify';
import { schemaGenerate } from './scheme/generate-scheme';
import { DatabaseAdapter } from '../database-interface';
import mongoose, { Mongoose } from 'mongoose';
import { InternalServerError } from '@presentation/errors/http-errors/internal-server-error';

@injectable()
export class MongoService implements DatabaseAdapter {
    public location
    private connection
    private _connection: Mongoose | undefined;
    constructor() {
    }

    public async getConnection(): Promise<Mongoose> {
        try {
            if (!this._connection) {
                const query = process.env.DB_MONGO_QUERY
                this._connection = await mongoose.connect(query, {
                    dbName: process.env.DB_NAME,
                    autoCreate: false,

                });
              }
              return this._connection;
        } catch (error) {
            throw new InternalServerError(99, "Erro ao conectar ao banco");
        }
        
      }
    
    async connect() {
        this.connection = await this.getConnection();
    }

    async setConfig(_schema, location) {
        await this.connect();
        this.location = location
    }

    async create<T>(entity: any): Promise<T> {

        const schema = await schemaGenerate(entity)
        const model = this.connection.model(this.location, schema);
        const created = await model.create(entity);
        return created;
    }

    async findAll<T>(entity: any): Promise<T[]> {
        const schema = await schemaGenerate(entity)
        const model = this.connection.model(this.location, schema);
        const entities = await model.find();
        return entities;
    }

    async findOne<T>(id: string, entity: any): Promise<T | null> {
        const schema = await schemaGenerate(entity)
        const model = this.connection.model(this.location, schema);
        const one = await model.findById(id);
        return one;
    }

    async update<T>(id: string, updated: Partial<T>): Promise<T | null> {
        const schema = await schemaGenerate(updated)
        const model = this.connection.model(this.location, schema);
        const entity = await model.findByIdAndUpdate(id, updated, { new: true });
        return entity;
    }

    // DELETE
    async delete<T>(id: string, entity: any): Promise<T | null> {
        const schema = await schemaGenerate(entity)
        const model = this.connection.model(this.location, schema);
        const deletedUser = await model.findByIdAndDelete(id);
        return deletedUser;
    }
}

