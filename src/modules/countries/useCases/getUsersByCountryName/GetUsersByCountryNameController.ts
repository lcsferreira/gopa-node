import { Request, Response } from "express";
import { GetUsersByCountryNameUseCase } from "./GetUsersByCountryNameUseCase";

export class GetUsersByCountryNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const getUsersByCountryNameUseCase = new GetUsersByCountryNameUseCase();

    const users = await getUsersByCountryNameUseCase.execute(name);

    return response.json(users);
  }
}
