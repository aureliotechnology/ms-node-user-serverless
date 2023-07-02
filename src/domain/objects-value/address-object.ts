export class Address {
    private constructor(
      private readonly _street: string,
      private readonly _streetLine2: string | null,
      private readonly _number: string,
      private readonly _city: string,
      private readonly _state: string,
      private readonly _country: string,
      private readonly _postalCode: string,
      private readonly _complement: string | null
    ) {}
  
    get street(): string {
      return this._street;
    }
  
    get streetLine2(): string | null {
      return this._streetLine2;
    }
  
    get number(): string {
      return this._number;
    }
  
    get city(): string {
      return this._city;
    }
  
    get state(): string {
      return this._state;
    }
  
    get country(): string {
      return this._country;
    }
  
    get postalCode(): string {
      return this._postalCode;
    }

    get complement(): string {
      return this._complement;
    }
  
    public static create(
      street: string,
      streetLine2: string | null,
      number: string,
      city: string,
      state: string,
      country: string,
      postalCode: string,
      complement?: string
    ): Address {
      // you can include validations here if required
      return new Address(street, streetLine2, number, city, state, country, postalCode, complement);
    }
  
    public equals(other: Address): boolean {
      return (
        this._street === other._street &&
        this._streetLine2 === other._streetLine2 &&
        this._number === other._number &&
        this._city === other._city &&
        this._state === other._state &&
        this._country === other._country &&
        this._postalCode === other._postalCode
      );
    }
  }