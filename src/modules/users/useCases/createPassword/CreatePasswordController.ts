import { Request, Response } from "express";
import { CreatePasswordUseCase } from "./CreatePasswordUseCase";

export class CreatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { id } = request.params;

    const createPasswordUseCase = new CreatePasswordUseCase();

    const result = await createPasswordUseCase.execute(id, password);

    return response.status(200).json(result);
  }
}
