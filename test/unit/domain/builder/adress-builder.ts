import { Address } from "@domain/objects-value/address-object";

export class AddressBuilder {
    private street = 'Street 1';
    private streetLine2 = 'Apt 10';
    private number = '123';
    private city = 'City';
    private state = 'State';
    private country = 'Country';
    private postalCode = '12345';
    private complement = 'Complement';
  
    withStreet(street: string) {
      this.street = street;
      return this;
    }
  
    build() {
      return new Address(this.street, this.streetLine2, this.number, this.city, this.state, this.country, this.postalCode, this.complement);
    }
  }