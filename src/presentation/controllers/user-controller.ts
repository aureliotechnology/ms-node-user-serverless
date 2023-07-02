import { IUserSaveUC } from "@application/interfaces/user-save-uc-interface";
import { UserEntity } from "@domain/entities/user-entity";
import { Inject } from "@infrastructure/config/inject";
import { TYPES } from "@infrastructure/config/type-injector";
import { UserSavePostValidator } from "@presentation/validators/user-save-post-validator";

export default class UserController {
  private readonly userSaveUC:IUserSaveUC ;
  constructor() {
    this.userSaveUC = Inject.getClass<IUserSaveUC>(TYPES.IUserSaveUC);
  }

  async save(input: any): Promise<UserEntity> {
    const data = new UserSavePostValidator(input).isValid();
    
    return this.userSaveUC.execute(data);
  }
}
