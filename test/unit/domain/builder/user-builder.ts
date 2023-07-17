import { Address } from "@domain/objects-value/address-object";
import { AddressBuilder } from "./adress-builder";
import { UserStatusEnum } from "@domain/enums/user-status-enum";
import { UserEntity } from "@domain/entities/user-entity";


export class UserEntityBuilder {
  private id = 'id1';
  private username = 'username1';
  private pass = 'pass1';
  private name = 'name1';
  private lastName = 'lastName1';
  private cpf = 'cpf1';
  private phone = 'phone1';
  private email = 'email1';
  private address = new AddressBuilder().build();
  private status = UserStatusEnum.ACTIVE;

  withAddress(address: Address) {
    this.address = address;
    return this;
  }

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  withId(id:string) {
    this.id = id;
    return this;
  }

  build() {
    return UserEntity.create(this.id, this.username, this.pass, this.name, this.lastName, this.cpf, this.phone, this.email, this.address, this.status);
  }
}

