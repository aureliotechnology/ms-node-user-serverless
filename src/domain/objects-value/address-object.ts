import { Entity, Field } from "@infrastructure/config/decorator"

@Entity()
export class Address {
  @Field("string")
   street: string
  @Field("string")
   streetLine2: string | null
  @Field("string")
   number: string
  @Field("string")
   city: string
  @Field("string")
   state: string
  @Field("string")
   country: string
  @Field("string")
   postalCode: string
  @Field("string")
   complement: string | null
     constructor(
      street: string,
      streetLine2: string | null,
      number: string,
      city: string,
      state: string,
      country: string,
      postalCode: string,
      complement: string | null
    ) {
      this.street = street;
      this.streetLine2 = streetLine2;
      this.number = number;
      this.city = city;
      this.state = state;
      this.country = country;
      this.postalCode = postalCode;
      this.complement = complement;
    }

  
  
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