import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { Request, Response } from "express";

export class GetUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getUserByIdUseCase = new GetUserByIdUseCase();

    const user = await getUserByIdUseCase.execute(id);

    return response.status(200).json(user);
  }
}
