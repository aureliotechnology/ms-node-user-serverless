import { APIGatewayProxyEvent, Context } from "aws-lambda";

import { HttpResponse } from "@infrastructure/adapter/responses/http-response";
import { BadRequestError } from "@presentation/errors/http-errors/bad-request-error";
import { HttpError } from "@presentation/errors/http-errors/http-error";
import { InternalServerError } from "@presentation/errors/http-errors/internal-server-error";
import { injectable } from "inversify";

@injectable()
export class LambdaHandler {
  constructor(
  ) {}

  async perform(
    event: APIGatewayProxyEvent,
    allowedMethod: string,
    lambda: () => Promise<
      { [k: string]: unknown } | HttpResponse | string | void
    >,
    context?: Context
  ) {
    console.log(`requestId: ${context?.awsRequestId}`);
    console.log(`funcName: ${context?.functionName}`);

    try {
      if (
        !event ||
        ("httpMethod" in event && event.httpMethod !== allowedMethod)
      ) {
        throw new BadRequestError(95, "Metodo não permitido");
      }

      const data = await lambda();

      if (data instanceof HttpResponse) {
        return data.toResponse();
      }

      console.error(
        `Invalid response type, must be an HttpResponse, was: ${data}`
      );
      throw new InternalServerError();
    } catch (error) {
      console.error(JSON.stringify(error, ["message", "stack"]));
      let httpError: HttpError = error;

      if (!(error instanceof HttpError)) {
        httpError = new InternalServerError();
      }
      return httpError.toResponse();
    }
  }
}
