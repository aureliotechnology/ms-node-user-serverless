import { UserEntity } from "@domain/entities/user-entity";
import IUserSavePostUC from "./user-save-post-interface";


export interface IUserSaveUC {
    execute(user: IUserSavePostUC): Promise<UserEntity>;
  }