
import { DatabaseAdapter } from '@adapter/database/database-interface';
import { IUserViewUC } from '@application/interfaces/user-view-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { TYPES } from '@infrastructure/config/type-injector';
import { inject, injectable } from 'inversify';

@injectable()
export class UserViewUC implements IUserViewUC {
  constructor(@inject(TYPES.DatabaseAdapter) private databaseAdapter: DatabaseAdapter) {}

  async execute(id: string): Promise<UserEntity | null> {
    await this.databaseAdapter.setConfig('public', 'User');
    return await this.databaseAdapter.findOne<UserEntity>(id, UserEntity);
  }
}
