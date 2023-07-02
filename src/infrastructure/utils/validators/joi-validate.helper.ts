import Joi from "joi";
import { messages } from "joi-translation-pt-br";

import CNPJValidator from "./cnpj";
import { StringValidator } from "./stringValidator";

export abstract class JoiValidateHelper {
  static uuid(): Joi.StringSchema<string> {
    return Joi.string().regex(StringValidator.uuidValidationRegExp());
  }

  static cnpj(): Joi.StringSchema<string> {
    return Joi.string().custom((value, helper) => {
      const validate = new CNPJValidator(value);
      if (!validate.isValid()) {
        return helper.error("any.invalid");
      }
      return true;
    });
  }

  static cpf(): Joi.StringSchema<string> {
    return Joi.string().custom((value, helper) => {
      if (!StringValidator.validateCPF(value)) {
        return helper.error("any.invalid");
      }
      return true;
    });
  }

  static cep(): Joi.StringSchema<string> {
    return Joi.string().custom((value, helper) => {
      if (!StringValidator.validateCEP(value)) {
        return helper.error("any.invalid");
      }
      return true;
    });
  }

  static phone(): Joi.StringSchema<string> {
    return Joi.string()
      .custom((value, helper) => {
        const phone = value.replace(/[,!]/g, "");
        const regex = /[1-9]{2}[9]{1}[1-9]{1}[0-9]{7}/g;
        if (!regex.test(phone)) {
          return helper.error("any.invalid");
        }
        return true;
      })
      .label("Telefone");
  }

  static validate = (schema: Joi.ObjectSchema, data: object) => {
    const { value, error } = Joi.compile(schema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(data, { messages });

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return { errorMessage, value };
    }
    return { errorMessage: null, value };
  };
}
