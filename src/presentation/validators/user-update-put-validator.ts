import Joi from "joi";
import { JoiValidateHelper } from "src/infrastructure/utils/validators/joi-validate.helper";

import { BadRequestError } from "@presentation/errors/http-errors/bad-request-error";
import { Address } from "@domain/objects-value/address-object";
import { UserStatusEnum } from "@domain/enums/user-status-enum";
import IUserUpdatePutUC from "@application/interfaces/user-update-put-interface";

export class UserUpdatePutValidator {
  id:string
  username: string
  pass: string
  name: string
  lastName: string
  cpf: string
  phone: string
  email: string
  address: Address
  status: UserStatusEnum

  constructor(data: any) {
    this.validate(data);
    this.id = data.id
    this.username = data.username;
    this.pass = data.pass;
    this.name = data.name;
    this.lastName = data.lastName;
    this.cpf = data.cpf;
    this.phone = data.phone;
    this.email = data.email;
    this.address = data.address;
    this.status = data.status;
  }

  validate(data: any) {
    const address = {
      street: Joi.string().required(),
      streetLine2: Joi.string().optional(),
      number: Joi.number().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      postalCode: JoiValidateHelper.cep().required(),
      complement: Joi.string().optional(),
    };

    const validators = {
      id: JoiValidateHelper.uuid().required(),
      username: Joi.string().required(),
      pass: Joi.string().required(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      cpf: JoiValidateHelper.cpf().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.object(address).required(),
      status: Joi.string().valid(...Object.values(UserStatusEnum)).required(),
    };

    const errors = JoiValidateHelper.validate(Joi.object(validators), data);

    if (errors.errorMessage) {
      // TODO Alterar para 422
      throw new BadRequestError(
        1,
        "Um ou mais campos inválidos",
        errors.errorMessage,
        errors.errorMessage
      );
    }
  }

  isValid(): IUserUpdatePutUC {
    return {...this};
  }
}
