import { Request, Response } from "express";
import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

export class ForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPassword = new ForgotPasswordUseCase();

    const result = await forgotPassword.execute(email);

    return response.status(200).json({ result });
  }
}
