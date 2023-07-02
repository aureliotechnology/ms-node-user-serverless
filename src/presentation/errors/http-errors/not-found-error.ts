import { HttpStatusCode } from "@adapter/responses";

import { HttpError } from "./http-error";

export class NotFoundError extends HttpError {
  constructor(
    protected code: number = 4,
    readonly message: string = "Recurso não encontrado",
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(code, message, HttpStatusCode.NOT_FOUND, data, error);
  }
}
