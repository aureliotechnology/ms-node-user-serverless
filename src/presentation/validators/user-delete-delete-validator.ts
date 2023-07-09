import Joi from "joi";
import { JoiValidateHelper } from "src/infrastructure/utils/validators/joi-validate.helper";

import { BadRequestError } from "@presentation/errors/http-errors/bad-request-error";

export class UserDeleteDeleteValidator {
  id:string

  constructor(id: any) {
    this.validate({id: id});
    this.id = id
  }

  validate(data: any) {
    
    const validators = {
      id: JoiValidateHelper.uuid().required(),
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

  isValid(): string {
    return this.id
  }
}
