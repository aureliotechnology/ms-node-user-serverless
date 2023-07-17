import { UserEntity } from "@domain/entities/user-entity";
import { UserEntityBuilder } from "../builder/user-builder";
import { UserStatusEnum } from "@domain/enums/user-status-enum";
import { AddressBuilder } from "../builder/adress-builder";


describe('UserEntity', () => {
  it('should create a new user entity', () => {
    const user = new UserEntityBuilder().build();

    expect(user).toBeInstanceOf(UserEntity);
    // ... the rest of your assertions
  });

  it('should change user status', () => {
    const user = new UserEntityBuilder().build();

    user.changeStatus(UserStatusEnum.INACTIVE);

    expect(user.status).toEqual(UserStatusEnum.INACTIVE);
  });

  it('should change user email', () => {
    const user = new UserEntityBuilder().build();

    user.changeEmail('newemail@test.com');

    expect(user.email).toEqual('newemail@test.com');
  });

  it('should change user phone', () => {
    const user = new UserEntityBuilder().build();

    user.changePhone('newphone1');

    expect(user.phone).toEqual('newphone1');
  });

  it('should change user address', () => {
    const address = new AddressBuilder().withStreet('Street 2').build();
    const user = new UserEntityBuilder().build();

    user.changeAddress(address);

    expect(user.address).toBe(address);
  });
});
