import "reflect-metadata";

import { makeMockInputHandler } from "test/mocks/makeMockInputHandler";

import { PointSalesAppService } from "@application/services/company/point-sales-app.service";
import { PointSalesEntity } from "@domain/entities/point-sales-entity";
import { InternalServerError } from "@presentation/errors/http-errors/internal-server-error";
import { main } from "@presentation/routes/company/point-of-sales-put";

describe.skip("put-point-of-sales handler tests", () => {
  let pointSalesAppService;

  beforeEach(() => {
    pointSalesAppService = jest.spyOn(
      PointSalesAppService.prototype,
      "execute"
    );
  });

  afterEach(() => {
    pointSalesAppService.mockReset();
  });

  it("should be defined", async () => {
    expect(main).toBeDefined();
  });

  it("register point of sales valid, point of sales should return 200", async () => {
    pointSalesAppService.mockImplementation(
      async () =>
        new PointSalesEntity(
          "Fuston LDa",
          "90.292.521/0001-52",
          "93.211.084/0006-06",
          {
            postalCode: "79117-970",
            street: "sapu2",
            number: 12345,
            complement: "	São Paulo",
            referencePoint: "	São Paulo",
            neighborhood: "	São Paulo",
            city: "	São Paulo",
            state: "Luanda",
          }
        )
    );

    const { request, context } = makeMockInputHandler({
      httpMethod: "PUT",
      body: {
        name: "Raul Inacio",
        cnpj: "90.292.521/0001-52",
        branchCnpj: "93.211.084/0006-01",
        address: {
          postalCode: "79117-970",
          street: "sapu2",
          number: 12345,
          complement: "nfjfnf",
          referencePoint: "vghjbknmmfngf",
          neighborhood: "jdhjfhffff",
          city: "nmfdbmnfgbgf",
          state: "Luanda",
        },
      },
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(200);
  });

  it("given an invalid point of sales, point of sales validation should fail", async () => {
    pointSalesAppService.mockResolvedValue(new InternalServerError());

    const { request, context } = makeMockInputHandler({
      httpMethod: "PUT",
      body: {
        name: "Raul Inacio",
        cnpj: "90.292.521/0001-52",
        branchCnpj: "93.211.084/0006-01",
        address: {
          postalCode: "79117-970",
          street: "sapu2",
          number: 12345,
          complement: "nfjfnf",
          referencePoint: "vghjbknmmfngf",
          neighborhood: "jdhjfhffff",
          city: "nmfdbmnfgbgf",
          state: "Luanda",
        },
      },
    });

    const response = await main(request, context);
    console.log(response);
    expect(response.statusCode).toBe(500);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(98);
  });

  it("given an invalid body, request should fail", async () => {
    const { request, context } = makeMockInputHandler({
      httpMethod: "PUT",
    });
    const response = await main(request, context);

    expect(response.statusCode).toBe(400);

    const json = JSON.parse(response.body);

    expect(json.code).toBe(1);
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
