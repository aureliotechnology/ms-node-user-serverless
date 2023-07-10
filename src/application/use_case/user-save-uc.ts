
import { DatabaseAdapter } from '@adapter/database/database-interface';
import IUserSavePostUC from '@application/interfaces/user-save-post-interface';
import { IUserSaveUC } from '@application/interfaces/user-save-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { TYPES } from '@infrastructure/config/type-injector';
import { inject, injectable } from 'inversify';

@injectable()
export class UserSaveUC implements IUserSaveUC {
  constructor(@inject(TYPES.DatabaseAdapter) private databaseAdapter: DatabaseAdapter) {}

  async execute(input: IUserSavePostUC): Promise<UserEntity> {
    
    const user = UserEntity.create(
      '',
      input.username,
      input.pass,
      input.name,
      input.lastName,
      input.cpf,
      input.phone,
      input.email,
      input.address,
      input.status
    );
    await this.databaseAdapter.setConfig('public', 'User');
    return await this.databaseAdapter.create<UserEntity>(user);
  }
}
