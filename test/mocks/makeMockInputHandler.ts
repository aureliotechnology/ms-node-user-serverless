import Context from "./context";
import Request from "./request";

export const makeMockInputHandler = (event: {
  httpMethod: string;
  body?: object | string;
  pathParameters?: {
    [name: string]: string;
  };
  queryStringParameters?: {
    [name: string]: string;
  };
}) => {
  return {
    request: new Request({
      body: JSON.stringify(event.body),
      httpMethod: event.httpMethod,
      pathParameters: event?.pathParameters,
      queryStringParameters: event?.queryStringParameters,
    }),
    context: new Context(),
  };
};
