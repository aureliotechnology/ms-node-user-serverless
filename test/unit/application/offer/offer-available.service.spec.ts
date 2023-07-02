import { IOfferAvailableRequest } from "@application/interfaces/offer/offerAvailable.request.interface";
import { OfferAvailableService } from "@application/services/offer/offer-available.service";
import { CompanyEntity } from "@domain/entities/company-entity";
import { OfferAvailableEntity } from "@domain/entities/offer-available-entity";
import {
  HttpResponse,
  IHttpClientService,
} from "@infrastructure/adapter/http-client/http-client-interface";
import { NotFoundError } from "@presentation/errors/http-errors/not-found-error";
import { OfferAvailableValidator } from "@presentation/validators/offer/offer-available.validator";

describe("OfferAvailableService", () => {
  let offerAvailableService: OfferAvailableService;
  let httpClientService: IHttpClientService;

  beforeEach(() => {
    httpClientService = {
      get: jest.fn(),
    };
    offerAvailableService = new OfferAvailableService(httpClientService);
  });

  describe("execute", () => {
    it("should throw NotFoundError if offer data is not found", async () => {
      const offerAvailableRequest: IOfferAvailableRequest =
        new OfferAvailableValidator("34861167000169");

      const mockHttpResponse: HttpResponse = {
        status: 404,
        data: null,
        statusText: "",
      };

      (httpClientService.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(mockHttpResponse)
      );

      await expect(
        offerAvailableService.execute(offerAvailableRequest)
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw NotFoundError if company data is not found", async () => {
      const offerAvailableRequest = new OfferAvailableValidator(
        "34861167000169"
      );

      const mockOfferHttpResponse: HttpResponse = {
        status: 204,
        data: null,
        statusText: "",
      };
      const mockCompanyHttpResponse: HttpResponse = {
        status: 400,
        data: null,
        statusText: "",
      };

      (httpClientService.get as jest.Mock)
        .mockResolvedValueOnce(mockOfferHttpResponse)
        .mockResolvedValueOnce(mockCompanyHttpResponse);

      await expect(
        offerAvailableService.execute(offerAvailableRequest)
      ).rejects.toThrow(NotFoundError);
    });

    it("should return an instance of OfferAvailableEntity", async () => {
      const offerAvailableRequest = new OfferAvailableValidator(
        "34861167000169"
      );

      const companyData = new CompanyEntity(
        "b7bb32f9-0026-4ade-80eb-58f95bfbcb77",
        "Example company",
        "Example company",
        "34861167000169"
      );

      const mockOfferHttpResponse: HttpResponse = {
        status: 200,
        data: null,
        statusText: "",
      };
      const mockCompanyHttpResponse: HttpResponse = {
        status: 200,
        data: { data: companyData },
        statusText: "",
      };

      (httpClientService.get as jest.Mock)
        .mockResolvedValueOnce(mockOfferHttpResponse)
        .mockResolvedValueOnce(mockCompanyHttpResponse);

      const result = await offerAvailableService.execute(offerAvailableRequest);

      expect(result).toBeInstanceOf(OfferAvailableEntity);
    });
  });
});
