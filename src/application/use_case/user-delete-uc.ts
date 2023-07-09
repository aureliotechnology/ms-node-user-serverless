
import { DatabaseAdapter } from '@adapter/database/database-interface';
import UserMongoSchema from '@adapter/database/mongodb/scheme/user-scheme';
import { IUserDeleteUC } from '@application/interfaces/user-delete-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { TYPES } from '@infrastructure/config/type-injector';
import { inject, injectable } from 'inversify';

@injectable()
export class UserDeleteUC implements IUserDeleteUC {
  constructor(@inject(TYPES.DatabaseAdapter) private databaseAdapter: DatabaseAdapter) {}

  async execute(id: string): Promise<UserEntity | null> {
    await this.databaseAdapter.setConfig(UserMongoSchema, 'User');
    return await this.databaseAdapter.delete<UserEntity>(id);
  }
}
