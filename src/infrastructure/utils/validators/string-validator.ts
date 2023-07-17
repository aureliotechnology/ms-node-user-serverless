export abstract class StringValidator {
  static isValidString(value: string): boolean {
    return typeof value === "string" && value !== "";
  }

  static validateCEP = (cep: string) => {
    cep = cep.replace(/[^0-9]/g, "");
    const cepRegex = /^[0-9]{5}[\d]{3}$/g;

    return cepRegex.test(cep);
  };

  static validateEmail = (email: string) => {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email);
  };

  static uuidValidationRegExp = (): RegExp => {
    const exp =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const validate = new RegExp(exp);
    return validate;
  };

  static mongoidValidationRegExp = (): RegExp => {
    const exp =
      /^[a-fA-F0-9]{24}$/i;
    const validate = new RegExp(exp);
    return validate;
  };
}
