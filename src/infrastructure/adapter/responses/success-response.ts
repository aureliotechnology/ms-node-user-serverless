import { HttpResponse } from "./http-response";
import { HttpStatusCode } from "./http-status-codes";

export class SuccessResponse extends HttpResponse {
  constructor(
    protected readonly data: unknown,
    protected readonly message: string = "Sucesso",
    protected readonly code: number = 0
  ) {
    super(data, message, code, HttpStatusCode.OK);
  }
}
