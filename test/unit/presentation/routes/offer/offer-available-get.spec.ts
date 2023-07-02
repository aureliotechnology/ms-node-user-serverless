import { makeMockInputHandler } from "test/mocks/makeMockInputHandler";

import { OfferAvailableService } from "@application/services/offer/offer-available.service";
import { main } from "@presentation/routes/offer/offer-available-get";

describe("get-offer-inquiry-available handler tests", () => {
  let officerAvailableAppService;

  beforeAll(() => {
    officerAvailableAppService = jest.spyOn(
      OfferAvailableService.prototype,
      "execute"
    );
  });

  beforeEach(() => {
    officerAvailableAppService.mockReset();
  });

  it("should be defined", async () => {
    expect(main).toBeDefined();
  });

  it.skip("shold be a success response ", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {
        cnpj: "34861167000169",
      },
    });
    const response = await main(request, context);

    // TODO ajustar
    expect(response.statusCode).toBe(200);
  });

  it("should return a 400 error for cnpj validation error", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {
        cnpj: "35564845999999",
      },
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(1);
  });

  it("should return a 400 error for empty parameter", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {
        cnpj: "",
      },
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(1);
  });

  it("should return a 400 error due to missing parameter", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {},
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(1);
  });

  it("should return a 400 error for method identification error", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "POST",
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(95);
  });
});
