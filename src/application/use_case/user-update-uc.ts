
import { DatabaseAdapter } from '@adapter/database/database-interface';
import IUserUpdatePutUC from '@application/interfaces/user-update-put-interface';
import { IUserUpdateUC } from '@application/interfaces/user-update-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { TYPES } from '@infrastructure/config/type-injector';
import { inject, injectable } from 'inversify';

@injectable()
export class UserUpdateUC implements IUserUpdateUC {
  constructor(@inject(TYPES.DatabaseAdapter) private databaseAdapter: DatabaseAdapter) {}

  async execute(input: IUserUpdatePutUC): Promise<UserEntity> {
    
    const user = UserEntity.create(
      input.id,
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
    return await this.databaseAdapter.update<UserEntity>(input.id,user);
  }
}
