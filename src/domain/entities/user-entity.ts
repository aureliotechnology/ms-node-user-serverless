
import { v4 as uuidv4 } from 'uuid';
import { Address } from '../objects-value/address-object';
import { UserStatusEnum } from '../enums/user-status-enum';
import { Entity, Field } from '@infrastructure/config/decorator';

@Entity()
export class UserEntity {
  @Field("uuid")
  id: string
  @Field("string")
  username: string
  @Field("string")
  pass: string
  @Field("string")
  name: string
  @Field("string")
  lastName: string
  @Field("string")
  cpf: string
  @Field("string")
  phone: string
  @Field("string")
  email: string
  @Field("object")
  address: Address
  @Field("string")
  status: UserStatusEnum
  
  constructor() {
    JSON.stringify
  }

  
  public static create(
    id: string,
    username: string,
    pass: string,
    name: string,
    lastName: string,
    cpf: string,
    phone: string,
    email: string,
    address: Address,
    status: UserStatusEnum = UserStatusEnum.ACTIVE
  ): UserEntity {
    const model = new UserEntity();
    if(!id) {
      id = uuidv4();
    }
    model.id = id;
    model.username = username;
    model.pass = pass;
    model.name = name;
    model.lastName = lastName;
    model.cpf = cpf;
    model.phone = phone;
    model.email = email;
    model.address = address;
    model.status = status;
    return model
  }

  public changeStatus(status: UserStatusEnum): void {
    this.status = status;
  }

  public changeEmail(email: string): void {
    this.email = email;
  }

  public changePhone(phone: string): void {
    this.phone = phone;
  }

  public changeAddress(address: Address): void {
    this.address = address;
  }

  get metadata() {
    return Reflect.getMetadata('field', this);
  }
}
