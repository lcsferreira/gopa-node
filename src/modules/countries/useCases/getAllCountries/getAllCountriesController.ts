import { Request, Response } from "express";
import { GetAllCountriesUseCase } from "./getAllCountriesUseCase";

export class GetAllCountriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllCountriesUseCase = new GetAllCountriesUseCase();

    const countries = await getAllCountriesUseCase.execute();

    return response.status(200).json(countries);
  }
}
