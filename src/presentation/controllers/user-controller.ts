import { IUserSaveUC } from "@application/interfaces/user-save-uc-interface";
import { IUserUpdateUC } from "@application/interfaces/user-update-uc-interface";
import { IUserViewUC } from "@application/interfaces/user-view-uc-interface";
import { UserEntity } from "@domain/entities/user-entity";
import { Inject } from "@infrastructure/config/inject";
import { TYPES } from "@infrastructure/config/type-injector";
import { NotFoundError } from "@presentation/errors/http-errors/not-found-error";
import { UserSavePostValidator } from "@presentation/validators/user-save-post-validator";
import { UserUpdatePutValidator } from "@presentation/validators/user-update-put-validator";
import { UserViewGetValidator } from "@presentation/validators/user-view-get-validator";

export default class UserController {
  private readonly userSaveUC:IUserSaveUC ;
  private readonly userUpdateUC:IUserUpdateUC ;
  private readonly userViewUC:IUserViewUC ;
  constructor() {
    this.userSaveUC = Inject.getClass<IUserSaveUC>(TYPES.IUserSaveUC);
    this.userUpdateUC = Inject.getClass<IUserUpdateUC>(TYPES.IUserUpdateUC);
    this.userViewUC = Inject.getClass<IUserViewUC>(TYPES.IUserViewUC);
  }

  async save(input: any): Promise<UserEntity> {
    const data = new UserSavePostValidator(input).isValid();
    
    return this.userSaveUC.execute(data);
  }

  async update(input: any): Promise<UserEntity> {
    const data = new UserUpdatePutValidator(input).isValid();
    
    return this.userUpdateUC.execute(data);
  }

  async view(id: string): Promise<UserEntity> {
    const data = new UserViewGetValidator(id).isValid();
    const user = this.userViewUC.execute(data);
    
    if(!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
