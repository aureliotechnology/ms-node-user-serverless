/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventBase,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventMultiValueHeaders,
  APIGatewayProxyEventMultiValueQueryStringParameters,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyEventStageVariables,
} from "aws-lambda";

export default class Request implements APIGatewayProxyEventBase<any> {
  body: string | null;
  headers: APIGatewayProxyEventHeaders;
  multiValueHeaders: APIGatewayProxyEventMultiValueHeaders;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: APIGatewayProxyEventPathParameters | null;
  queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;
  multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters | null;
  stageVariables: APIGatewayProxyEventStageVariables | null;
  requestContext: APIGatewayEventRequestContextWithAuthorizer<any>;
  rawBody: string;
  resource: string;

  constructor(fakeProps: {
    httpMethod: string;
    body?: string;
    pathParameters?: APIGatewayProxyEventPathParameters;
    queryStringParameters?: APIGatewayProxyEventQueryStringParameters;
  }) {
    this.httpMethod = fakeProps.httpMethod;
    this.body = fakeProps.body ?? null;
    this.rawBody = fakeProps.body ?? null;
    this.headers = { "Content-Type": "application/json" };
    this.multiValueHeaders = null;
    this.isBase64Encoded = null;
    this.path = null;
    this.pathParameters = fakeProps.pathParameters ?? null;
    this.queryStringParameters = fakeProps.queryStringParameters ?? null;
    this.multiValueQueryStringParameters = null;
    this.stageVariables = null;
    this.requestContext = null;
    this.resource = null;
  }
}
