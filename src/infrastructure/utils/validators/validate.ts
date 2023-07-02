import Joi from "joi";
import { messages } from "joi-translation-pt-br";

export type Data = { [key: string]: unknown };

export const validate = (schema: Joi.ObjectSchema, data: object) => {
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
