import { Request, Response } from "express";
import { CreateCountryUseCase } from "./CreateCountryUseCase";

export class CreateCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      capital,
      region,
      hasTranslation,
      countryCardsStep,
      indicatorsStep,
      translationStep,
      countryCardsTranslatedStep,
    } = request.body;

    const createUserUseCase = new CreateCountryUseCase();

    const result = await createUserUseCase.execute({
      name,
      capital,
      region,
      hasTranslation,
      countryCardsStep,
      indicatorsStep,
      translationStep,
      countryCardsTranslatedStep,
    });

    return response.status(201).json(result);
  }
}
