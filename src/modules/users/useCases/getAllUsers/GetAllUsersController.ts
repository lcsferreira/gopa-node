import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

export class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllUsersUseCase = new GetAllUsersUseCase();

    const users = await getAllUsersUseCase.execute();

    return response.status(200).json(users);
  }
}
