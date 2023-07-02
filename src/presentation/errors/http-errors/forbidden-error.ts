import { HttpStatusCode } from "@adapter/responses";

import { HttpError } from "./http-error";

export class ForbiddenError extends HttpError {
  constructor(
    protected code: number = 3,
    readonly message: string = "Acesso proibido ao recurso",
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(code, message, HttpStatusCode.FORBIDDEN, data, error);
  }
}
