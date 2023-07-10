import "reflect-metadata"
import { APIGatewayProxyEvent } from "aws-lambda";

import { SuccessResponse } from "@adapter/responses";
import { LambdaHandler } from "@infrastructure/middleware/lambda";
import { middyfy } from "@resources/lambda";
import { Inject } from "@infrastructure/config/inject";
import UserController from "@presentation/controllers/user-controller";
import { TYPES } from "@infrastructure/config/type-injector";

const lambdaHandler = Inject.getClass<LambdaHandler>(TYPES.LambdaHandler);

const listUserUpdate = async (event: APIGatewayProxyEvent) =>
  lambdaHandler.perform(event, "GET", async () => {
   
    const controller = new UserController();
    return new SuccessResponse(await controller.list());
  });

export const main = middyfy(listUserUpdate);
