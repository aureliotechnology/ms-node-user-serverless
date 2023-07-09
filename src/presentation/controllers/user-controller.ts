import { IUserSaveUC } from "@application/interfaces/user-save-uc-interface";
import { IUserUpdateUC } from "@application/interfaces/user-update-uc-interface";
import { UserEntity } from "@domain/entities/user-entity";
import { Inject } from "@infrastructure/config/inject";
import { TYPES } from "@infrastructure/config/type-injector";
import { UserSavePostValidator } from "@presentation/validators/user-save-post-validator";
import { UserUpdatePutValidator } from "@presentation/validators/user-update-put-validator";

export default class UserController {
  private readonly userSaveUC:IUserSaveUC ;
  private readonly userUpdateUC:IUserUpdateUC ;
  constructor() {
    this.userSaveUC = Inject.getClass<IUserSaveUC>(TYPES.IUserSaveUC);
    this.userUpdateUC = Inject.getClass<IUserUpdateUC>(TYPES.IUserUpdateUC);
  }

  async save(input: any): Promise<UserEntity> {
    const data = new UserSavePostValidator(input).isValid();
    
    return this.userSaveUC.execute(data);
  }

  async update(input: any): Promise<UserEntity> {
    const data = new UserUpdatePutValidator(input).isValid();
    
    return this.userUpdateUC.execute(data);
  }
}
