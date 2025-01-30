import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secret = process.env.JWT_SECRET || "";

// Define o DTO para o usuário
interface UserDTO {
  name: string;
  email: string;
  institution: string;
}

export class LoginUseCase {
  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new AppError("Incorrect email", 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Incorrect password", 401);
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "30d",
      });

      const userDTO: UserDTO = {
        name: user.name,
        email: user.email,
        institution: user.institution,
      };

      return { token, user: userDTO };
    } catch (error: any) {
      // Se o erro já for uma instância de AppError, relance o erro
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(error.message, 500);
    }
  }
}
