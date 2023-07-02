import "reflect-metadata";

import { makeMockInputHandler } from "test/mocks/makeMockInputHandler";

import FeesBankDataService from "@application/services/proposal/fees-bank-data.service";
import { main } from "@presentation/routes/proposal/fees-bank-data-post";
import { FeesBankDataRequestValidator } from "@presentation/validators/proposal/fees-bank-data-request.validator";

describe("post-fees-bank-data handler tests", () => {
  let feesBankDataService;

  beforeEach(() => {
    feesBankDataService = jest.spyOn(FeesBankDataService.prototype, "execute");
  });

  afterEach(() => {
    feesBankDataService.mockReset();
  });

  it("should be defined", async () => {
    expect(main).toBeDefined();
  });

  it.skip("given information, register should return 200", async () => {
    feesBankDataService.mockImplementation(
      new FeesBankDataRequestValidator({
        id: "62b6913c-9848-4c9a-bc05-f423efdc9e49",
        idAnticipationRate: "62b6913c-9848-4c9a-bc05-f423efdc9e49",
        isAfinz: true,
        bank: {
          bankNumber: 123456,
          bankName: "Itau",
          bankAccountType: "corrente",
          bankAccountNumber: 1,
          bankAccountAgency: 1,
        },
      })
    );

    const { request, context } = makeMockInputHandler({
      httpMethod: "POST",
      body: {
        id: "62b6913c-9848-4c9a-bc05-f423efdc9e49",
        idAnticipationRate: "62b6913c-9848-4c9a-bc05-f423efdc9e49",
        isAfinz: false,
        bank: {
          bankNumber: 123456,
          bankName: "Itau",
          bankAccountType: "corrente",
          bankAccountNumber: 1,
          bankAccountAgency: 1,
        },
      },
    });

    const response = await main(request, context);

    expect(response.statusCode).toBe(500);
  });

  it("given an invalid body, request should fail", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "POST",
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(500);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(98);
  });

  it("given an invalid method, request should fail", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "GET",
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(95);
  });
});
