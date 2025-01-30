import { Request, Response } from "express";
import { AuthorizerUseCase } from "./AuthorizerUseCase";

export class AuthorizerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.cookies.gopaAuth;

    const authorizerUseCase = new AuthorizerUseCase();

    const result = await authorizerUseCase.execute(token);

    return response.status(200).json(result);
  }
}
