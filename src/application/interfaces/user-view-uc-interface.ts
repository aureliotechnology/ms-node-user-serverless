import { UserEntity } from "@domain/entities/user-entity";

export interface IUserViewUC {
    execute(id: string): Promise<UserEntity | null>;
  }