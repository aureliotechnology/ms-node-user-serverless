import "reflect-metadata"
import { APIGatewayProxyEvent } from "aws-lambda";

import { SuccessResponse } from "@adapter/responses";
import { LambdaHandler } from "@infrastructure/middleware/lambda";
import { middyfy } from "@resources/lambda";
import { Inject } from "@infrastructure/config/inject";
import UserController from "@presentation/controllers/user-controller";
import { TYPES } from "@infrastructure/config/type-injector";

const lambdaHandler = Inject.getClass<LambdaHandler>(TYPES.LambdaHandler);

const postUserSave = async (event: APIGatewayProxyEvent) =>
  lambdaHandler.perform(event, "POST", async () => {
   
    const controller = new UserController();
    return new SuccessResponse(await controller.save(event.body));
  });

export const main = middyfy(postUserSave);
