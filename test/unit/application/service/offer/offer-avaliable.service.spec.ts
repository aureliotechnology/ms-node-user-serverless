import "reflect-metadata";
import { offerAvailable } from "test/mocks/service/offer/offer-available.mock";

import {
  HttpClientService,
  HttpResponse,
} from "@adapter/http-client/http-client.service";
import { OfferAvailableService } from "@application/services/offer/offer-available.service";
import { Inject } from "@infrastructure/config/inject";
import { InternalServerError } from "@presentation/errors/http-errors/internal-server-error";

describe("Offer test's", () => {
  let service: OfferAvailableService;
  const httpGetMachine = jest.spyOn(
    OfferAvailableService.prototype,
    "getMachines"
  );
  const httpGetAnticipation = jest.spyOn(
    OfferAvailableService.prototype,
    "getAnticipations"
  );
  const httpGetRates = jest.spyOn(OfferAvailableService.prototype, "getRates");
  const httpGetOffer = jest.spyOn(OfferAvailableService.prototype, "getOffer");

  beforeEach(() => {
    httpGetMachine.mockReset();
    httpGetAnticipation.mockReset();
    httpGetRates.mockReset();
    httpGetOffer.mockReset();
    service = new OfferAvailableService(Inject.getClass(HttpClientService));
  });

  it("should return an instance of IOfferDetails", async () => {
    const responseBase: HttpResponse = {
      data: offerAvailable.data.machine,
      status: 200,
      statusText: "Sucess",
    };

    const responseMachine = { ...responseBase };
    responseMachine.data = offerAvailable.data.machine;
    httpGetMachine.mockReturnValue(Promise.resolve(responseMachine));

    const responseAnticipation = { ...responseBase };
    responseAnticipation.data = offerAvailable.data.anticipations.concat(
      offerAvailable.data.anticipationsAfinz
    );
    httpGetAnticipation.mockReturnValue(Promise.resolve(responseAnticipation));

    const responseRate = { ...responseBase };
    responseRate.data = offerAvailable.data.rates;
    httpGetRates.mockReturnValue(Promise.resolve(responseRate));

    const responseOffer = { ...responseBase };
    responseOffer.data = offerAvailable.data.offer;
    httpGetOffer.mockReturnValue(Promise.resolve(responseOffer));

    const result = await service.getOfferById(offerAvailable.data.offer.id);
    expect(result).toEqual(offerAvailable.data);
  });

  it("should return an exception in comunication of company service", async () => {
    const responseBase: HttpResponse = {
      data: "Internal Error",
      status: 500,
      statusText: "Error",
    };

    const responseMachine = { ...responseBase };
    httpGetMachine.mockReturnValue(Promise.resolve(responseMachine));

    const responseAnticipation = { ...responseBase };
    httpGetAnticipation.mockReturnValue(Promise.resolve(responseAnticipation));

    const responseRate = { ...responseBase };
    httpGetRates.mockReturnValue(Promise.resolve(responseRate));

    const responseOffer = { ...responseBase };
    httpGetOffer.mockReturnValue(Promise.resolve(responseOffer));

    expect(service.getOfferById(offerAvailable.data.offer.id)).rejects.toThrow(
      InternalServerError
    );
  });
});
