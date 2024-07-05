import { Request, Response } from "express";
import { PutUserUseCase } from "./PutUserUseCase";

export class PutUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, institution, isAdmin, isActive } = request.body;
    const { id } = request.params;

    const putUserUseCase = new PutUserUseCase();

    const result = await putUserUseCase.execute({
      id,
      name,
      email,
      institution,
      isAdmin,
      isActive,
    });

    return response.status(200).json(result);
  }
}
