import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { inject, singleton } from "tsyringe";

import { EnvironmentVariables } from "@infrastructure/config/environment-variables";
import { HttpError } from "@presentation/errors/http-errors/http-error";
import { InternalServerError } from "@presentation/errors/http-errors/internal-server-error";

@singleton()
export class LambdaInvokeHandler {
  constructor(
    @inject("EnvironmentVariables")
    private readonly environmentVariables: EnvironmentVariables
  ) {}

  async perform(
    event: APIGatewayProxyEvent,
    lambda: () => Promise<unknown>,
    context?: Context
  ) {
    console.log(`requestId: ${context?.awsRequestId}`);
    console.log(`funcName: ${context?.functionName}`);

    try {
      this.environmentVariables.setStageToEnv(event.stageVariables);
      return lambda();
    } catch (error) {
      console.error(JSON.stringify(error, ["message", "stack"]));
      if (!(error instanceof HttpError)) {
        const internalError = new InternalServerError();
        return internalError.toResponse();
      }
      return error.toResponse();
    }
  }
}
