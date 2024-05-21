import { GetUserByEmailUseCase } from "./GetUserByEmailUseCase";
import { Request, Response } from "express";

export class GetUserByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;
    const getUserByEmailUseCase = new GetUserByEmailUseCase();

    const user = await getUserByEmailUseCase.execute(email);

    return response.status(200).json(user);
  }
}
