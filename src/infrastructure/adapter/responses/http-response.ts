import { HttpStatusCode } from "./http-status-codes";

export class HttpResponse {
  constructor(
    protected readonly data: unknown,
    protected readonly message: string,
    protected readonly code: number,
    protected readonly statusCode: HttpStatusCode
  ) {}

  toResponse(): object {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}
