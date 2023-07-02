import { settlementBankList } from "test/mocks/service/general/settlementBankList";

import {
  HttpClientService,
  HttpResponse,
} from "@adapter/http-client/http-client.service";
import { ISettlementBank } from "@application/interfaces/general/settlement-bank.interface";
import { GeneralService } from "@application/services/general/general-service";
import { InternalServerError } from "@presentation/errors/http-errors/internal-server-error";

describe("General Service test's", () => {
  let service: GeneralService;
  const httpGet = jest.spyOn(HttpClientService.prototype, "get");
  beforeEach(() => {
    httpGet.mockReset();
    service = new GeneralService();
  });

  it("should return an array of instance of ISettlementBank", async () => {
    const response: HttpResponse = {
      data: settlementBankList,
      status: 200,
      statusText: "Sucess",
    };
    httpGet.mockResolvedValueOnce(response);
    const result = await service.settlementBankList();
    expect(result).toBeInstanceOf(Array<ISettlementBank>);
  });

  it.skip("should throw Exception", async () => {
    const response: HttpResponse = {
      data: "Internal Error",
      status: 500,
      statusText: "Error",
    };
    httpGet.mockResolvedValueOnce(response);
    expect(await service.settlementBankList()).rejects.toThrowError(
      InternalServerError
    );
  });
});
