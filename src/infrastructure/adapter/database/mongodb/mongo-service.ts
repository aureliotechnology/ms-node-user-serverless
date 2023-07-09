import { inject, injectable } from 'inversify';
import { MongoConnectionService } from './mongo-connect';
import { TYPES } from '@infrastructure/config/type-injector';

@injectable()
export class MongoService {
    private model
    private connection
    constructor(@inject(TYPES.MongoConnectionService) private mongoConnectionService: MongoConnectionService) {
    }
    
    async connect() {
        this.connection = await this.mongoConnectionService.getConnection();
    }

    async setConfig(schema, location) {
       
        await this.connect();
        this.model = this.connection.model(location, schema);
    }

    async create<T>(entity: any): Promise<T> {
        if(!this.connection){
            console.log("deu ruim");
        };
        const created = await this.model.create(entity);
        return created;
    }

    async findAll<T>(): Promise<T[]> {
        const entities = await this.model.find();
        return entities;
    }

    async findOne<T>(id: string): Promise<T | null> {
        const entity = await this.model.findById(id);
        return entity;
    }

    async update<T>(id: string, updated: Partial<T>): Promise<T | null> {
        const entity = await this.model.findByIdAndUpdate(id, updated, { new: true });
        return entity;
    }

    // DELETE
    async delete<T>(id: string): Promise<T | null> {
        const deletedUser = await this.model.findByIdAndDelete(id);
        return deletedUser;
    }
}

