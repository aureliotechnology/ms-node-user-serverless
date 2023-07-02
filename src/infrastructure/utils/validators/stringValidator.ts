import CNPJValidator from "./cnpj";

/* eslint-disable no-param-reassign */
export abstract class StringValidator {
  static isValidString(value: string): boolean {
    return typeof value === "string" && value !== "";
  }

  static validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf === "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i += 1)
      add += parseInt(cpf.charAt(i), 10) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9), 10)) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i += 1)
      add += parseInt(cpf.charAt(i), 10) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10), 10);
  };

  static validateCNPJ = (cnpj: string): boolean => {
    return new CNPJValidator(cnpj).isValid();
  };

  static validateCEP = (cep: string) => {
    cep = cep.replace(/[^0-9]/g, "");
    const cepRegex = /^[0-9]{5}[\d]{3}$/g;

    return cepRegex.test(cep);
  };

  static validatorCnpj = (cnpj: string) => {
    return new CNPJValidator(cnpj).isValid();
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
}
