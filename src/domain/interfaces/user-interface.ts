import { UserEntity } from "@domain/entities/user-entity";

export interface IUserRepository {

  getById(id: string): Promise<string | null>;
  list(): Promise<UserEntity[] | []>;
  save(entity: UserEntity): Promise<UserEntity | null>;
  
}
