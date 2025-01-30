import jwt from "jsonwebtoken";

export class AuthorizerUseCase {
  async execute(token: string): Promise<boolean> {
    if (!token) {
      throw new Error("Not authenticated");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (!decoded) {
        throw new Error("Invalid token");
      }

      return true;
    } catch (err) {
      throw new Error("Not authenticated");
    }
  }
}
