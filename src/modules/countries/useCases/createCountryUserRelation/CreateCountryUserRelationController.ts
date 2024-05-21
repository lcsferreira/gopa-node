import { Request, Response } from "express";
import { CreateCountryUserRelationUseCase } from "./CreateCountryUserRelationUseCase";

export class CreateCountryUserRelationController {
  async handle(request: Request, response: Response) {
    const { userId, countryId } = request.body;

    const createCountryUserRelationUseCase =
      new CreateCountryUserRelationUseCase();

    const result = await createCountryUserRelationUseCase.execute({
      userId,
      countryId,
    });

    return response.status(201).json(result);
  }
}
