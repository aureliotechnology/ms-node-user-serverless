import { HttpResponse } from "./http-response";
import { HttpStatusCode } from "./http-status-codes";

export class NoContentResponse extends HttpResponse {
  constructor(
    protected readonly data: unknown,
    protected readonly message: string = "Nenhum conteúdo retornado",
    protected readonly code: number = 0
  ) {
    super(data, message, code, HttpStatusCode.NO_CONTENT);
  }
}
