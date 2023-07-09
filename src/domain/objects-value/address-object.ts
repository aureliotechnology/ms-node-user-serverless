export class Address {
     constructor(
     readonly street: string,
     readonly streetLine2: string | null,
     readonly number: string,
     readonly city: string,
     readonly state: string,
     readonly country: string,
     readonly postalCode: string,
     readonly complement: string | null
    ) {}
  
  
    public static create(
      street: string,
      streetLine2: string | null,
      number: string,
      city: string,
      state: string,
      country: string,
      postalCode: string,
      complement: string | null
    ): Address {
      // you can include validations here if required
      return new Address(street, streetLine2, number, city, state, country, postalCode, complement);
    }
  
    public equals(other: Address): boolean {
      return (
        this.street === other.street &&
        this.streetLine2 === other.streetLine2 &&
        this.number === other.number &&
        this.city === other.city &&
        this.state === other.state &&
        this.country === other.country &&
        this.postalCode === other.postalCode
      );
    }
  }