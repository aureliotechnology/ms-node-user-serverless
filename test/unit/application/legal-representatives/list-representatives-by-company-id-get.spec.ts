import { makeMockInputHandler } from "test/mocks/makeMockInputHandler";

import { ListRepresentativesByCompanyIdService } from "@application/services/legal-representatives/list-representatives-by-company-id.service";
import { main } from "@presentation/routes/offer/offer-available-get";

describe("legal-representatives service tests", () => {
  let listRepresentativesByCompanyIdService;

  beforeAll(() => {
    listRepresentativesByCompanyIdService = jest.spyOn(
      ListRepresentativesByCompanyIdService.prototype,
      "execute"
    );
  });

  beforeEach(() => {
    listRepresentativesByCompanyIdService.mockReset();
  });

  it("should be defined", async () => {
    expect(main).toBeDefined();
  });

  it.skip("shold be a success response ", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {
        id: "d807b5d8-4b48-40d0-ad4b-816874588c8d",
      },
    });
    const response = await main(request, context);

    // TODO ajustar
    expect(response.statusCode).toBe(200);
  });

  it("should return a 400 error for companyId validation error", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
      pathParameters: {
        id: "d807b5d8-4b48-40d0-ad4b-816874588c8d",
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
        id: "",
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
