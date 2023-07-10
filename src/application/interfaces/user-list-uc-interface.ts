import { UserEntity } from "@domain/entities/user-entity";

export interface IUserListUC {
    execute(): Promise<UserEntity[]>;
  }