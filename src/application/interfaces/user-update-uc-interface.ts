import { UserEntity } from "@domain/entities/user-entity";
import IUserUpdatePutUC from "./user-update-put-interface";


export interface IUserUpdateUC {
    execute(user: IUserUpdatePutUC): Promise<UserEntity>;
  }