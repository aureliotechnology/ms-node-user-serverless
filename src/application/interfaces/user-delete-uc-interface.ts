import { UserEntity } from "@domain/entities/user-entity";

export interface IUserDeleteUC {
    execute(id: string): Promise<UserEntity | null>;
  }