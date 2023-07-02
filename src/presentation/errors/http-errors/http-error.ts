import { HttpStatusCode } from "src/infrastructure/adapter/responses/http-status-codes";

export abstract class HttpError extends Error {
  protected constructor(
    protected code: number,
    readonly message: string,
    protected readonly statusCode: HttpStatusCode,
    protected error?: unknown,
    protected data?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toResponse() {
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
