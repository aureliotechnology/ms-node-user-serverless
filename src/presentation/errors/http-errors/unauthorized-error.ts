import { HttpStatusCode } from "@adapter/responses";

import { HttpError } from "./http-error";

export class UnauthorizedError extends HttpError {
  constructor(
    protected code: number = 2,
    readonly message: string = "Falha de autenticação",
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(code, message, HttpStatusCode.UNAUTHORIZED, data, error);
  }
}
