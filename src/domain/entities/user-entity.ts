import { UserStatusEnum } from "@domain/enums/user-status-enum";
import { Address } from "@domain/objects-value/address-object";


export class UserEntity {
  private constructor(
    private readonly _id: string,
    private readonly _username: string,
    private readonly _pass: string,
    private readonly _name: string,
    private readonly _lastName: string,
    private readonly _cpf: string,
    private _phone: string,
    private _email: string,
    private _address: Address,
    private _status: UserStatusEnum,
  ) {}

  // getters here ...

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
    return new UserEntity(id, username, pass, name, lastName, cpf, phone, email, address, status);
  }

  public changeStatus(status: UserStatusEnum): void {
    this._status = status;
  }

  public changeEmail(email: string): void {
    this._email = email;
  }

  public changePhone(phone: string): void {
    this._phone = phone;
  }

  public changeAddress(address: Address): void {
    this._address = address;
  }
}
