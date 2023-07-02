/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Context } from "aws-lambda";

export default class AWSContext implements Context {
  awsRequestId: string;
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  logGroupName: string;
  logStreamName: string;
  memoryLimitInMB: string;
  done(_error?: Error, _result?: unknown): void {}
  fail(_error: Error | string): void {}
  getRemainingTimeInMillis(): number {
    return 0;
  }
  succeed(messageOrObject: never): void;
  succeed(message: string, object: unknown): void;
  succeed(_messageOrObject: unknown, _object?: unknown): void {}
}
