import { HttpStatusCode } from "@adapter/responses";

import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  constructor(
    protected code: number = 1,
    readonly message: string = "Erro ao realizar requisição",
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(code, message, HttpStatusCode.BAD_REQUEST, data, error);
  }
}
