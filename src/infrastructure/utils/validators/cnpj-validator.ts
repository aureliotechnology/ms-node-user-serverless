export default class CNPJValidator {
  constructor(public cnpj: string) {}

  private get numbers(): number[] {
    return Array.from(this.cnpj.replace(/[^0-9]/g, "")).map((number) =>
      Number(number)
    );
  }

  private get firstDigitMultipliers(): number[] {
    return [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  private get lastDigitMultipliers(): number[] {
    return [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  private validateLength() {
    if (this.numbers.length !== 14) {
      throw new Error("tem que ter 14 caracteres");
    }
  }

  private validateDigit(multipliers: number[], digit: number) {
    const sum = multipliers
      .map((multiplier, index) => multiplier * this.numbers[index])
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    const remaining = sum % 11;

    const digitToBe = remaining < 2 ? 0 : 11 - remaining;

    if (digitToBe !== digit) {
      throw new Error("o dígito verificador é inválido");
    }
  }

  private validateValidatorDigits() {
    this.validateDigit(this.firstDigitMultipliers, this.numbers[12]);
    this.validateDigit(this.lastDigitMultipliers, this.numbers[13]);
  }

  public execute() {
    this.validateLength();
    this.validateValidatorDigits();
  }

  public isValid() {
    try {
      this.execute();
      return true;
    } catch {
      return false;
    }
  }
}
