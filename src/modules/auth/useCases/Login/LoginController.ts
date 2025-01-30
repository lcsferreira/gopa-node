import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginUseCase = new LoginUseCase();

    const result = await loginUseCase.execute(email, password);

    response.cookie("gopaAuth", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return response.status(200).json(result.user);
  }
}
