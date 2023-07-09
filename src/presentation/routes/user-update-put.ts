import "reflect-metadata"
import { APIGatewayProxyEvent } from "aws-lambda";

import { SuccessResponse } from "@adapter/responses";
import { LambdaHandler } from "@infrastructure/middleware/lambda";
import { middyfy } from "@resources/lambda";
import { Inject } from "@infrastructure/config/inject";
import UserController from "@presentation/controllers/user-controller";
import { TYPES } from "@infrastructure/config/type-injector";

const lambdaHandler = Inject.getClass<LambdaHandler>(TYPES.LambdaHandler);

const putUserUpdate = async (event: APIGatewayProxyEvent) =>
  lambdaHandler.perform(event, "PUT", async () => {
   
    const controller = new UserController();
    let input:any = event.body
    input.id = event.pathParameters.id
    return new SuccessResponse(await controller.update(input));
  });

export const main = middyfy(putUserUpdate);
