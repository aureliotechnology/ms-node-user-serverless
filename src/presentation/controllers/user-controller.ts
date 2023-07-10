import { IUserDeleteUC } from "@application/interfaces/user-delete-uc-interface";
import { IUserListUC } from "@application/interfaces/user-list-uc-interface";
import { IUserSaveUC } from "@application/interfaces/user-save-uc-interface";
import { IUserUpdateUC } from "@application/interfaces/user-update-uc-interface";
import { IUserViewUC } from "@application/interfaces/user-view-uc-interface";
import { UserEntity } from "@domain/entities/user-entity";
import { Inject } from "@infrastructure/config/inject";
import { TYPES } from "@infrastructure/config/type-injector";
import { NotFoundError } from "@presentation/errors/http-errors/not-found-error";
import { UserDeleteDeleteValidator } from "@presentation/validators/user-delete-delete-validator";
import { UserSavePostValidator } from "@presentation/validators/user-save-post-validator";
import { UserUpdatePutValidator } from "@presentation/validators/user-update-put-validator";
import { UserViewGetValidator } from "@presentation/validators/user-view-get-validator";

export default class UserController {
  private readonly userSaveUC:IUserSaveUC ;
  private readonly userUpdateUC:IUserUpdateUC ;
  private readonly userViewUC:IUserViewUC ;
  private readonly userDeleteUC:IUserDeleteUC ;
  private readonly userListUC:IUserListUC
  constructor() {
    this.userSaveUC = Inject.getClassNamed<IUserSaveUC>(TYPES.IUserUC, 'save');
    this.userUpdateUC = Inject.getClassNamed<IUserUpdateUC>(TYPES.IUserUC, 'update');
    this.userViewUC = Inject.getClassNamed<IUserViewUC>(TYPES.IUserUC, 'view');
    this.userDeleteUC = Inject.getClassNamed<IUserDeleteUC>(TYPES.IUserUC, 'delete');
    this.userListUC = Inject.getClassNamed<IUserListUC>(TYPES.IUserUC, 'list');
  }

  async save(input: any): Promise<UserEntity> {
    const data = new UserSavePostValidator(input).isValid();
    
    return this.userSaveUC.execute(data);
  }

  async update(input: any): Promise<UserEntity> {
    const data = new UserUpdatePutValidator(input).isValid();
    
    return this.userUpdateUC.execute(data);
  }
  
  async list(): Promise<UserEntity[]> {
    return this.userListUC.execute();
  }

  async view(id: string): Promise<UserEntity> {
    const data = new UserViewGetValidator(id).isValid();
    const user = this.userViewUC.execute(data);
    
    if(!user) {
      throw new NotFoundError();
    }

    return user;
  }
  
  async delete(id: string): Promise<UserEntity> {
    const data = new UserDeleteDeleteValidator(id).isValid();
    const user = this.userDeleteUC.execute(data);
    
    if(!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
