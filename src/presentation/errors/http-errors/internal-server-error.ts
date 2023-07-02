import { HttpStatusCode } from "@adapter/responses";

import { HttpError } from "./http-error";

export class InternalServerError extends HttpError {
  constructor(
    protected code: number = 98,
    readonly message: string = "Erro interno no servidor",
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(code, message, HttpStatusCode.INTERNAL_SERVER_ERROR, data, error);
  }
}
