import { HttpResponse } from "./http-response";
import { HttpStatusCode } from "./http-status-codes";

export class BadRequestResponse extends HttpResponse {
  constructor(
    protected readonly data: unknown,
    protected readonly message: string = "Requisição mal sucedida",
    protected readonly code: number = 1
  ) {
    super(data, message, code, HttpStatusCode.BAD_REQUEST);
  }
}
