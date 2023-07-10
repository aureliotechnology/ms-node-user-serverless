
import { DatabaseAdapter } from '@adapter/database/database-interface';
import { IUserListUC } from '@application/interfaces/user-list-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { TYPES } from '@infrastructure/config/type-injector';
import { inject, injectable } from 'inversify';

@injectable()
export class UserListUC implements IUserListUC {
  constructor(@inject(TYPES.DatabaseAdapter) private databaseAdapter: DatabaseAdapter) {}

  async execute(): Promise<UserEntity[]> {
    await this.databaseAdapter.setConfig('public', 'User');
    return await this.databaseAdapter.findAll<UserEntity>();
  }
}
