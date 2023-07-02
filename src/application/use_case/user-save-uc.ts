
import IUserSavePostUC from '@application/interfaces/user-save-post-interface';
import { IUserSaveUC } from '@application/interfaces/user-save-uc-interface';
import { UserEntity } from '@domain/entities/user-entity';
import { injectable } from 'inversify';

@injectable()
export class UserSaveUC implements IUserSaveUC {
  constructor() {}

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

    return user;
  }
}
