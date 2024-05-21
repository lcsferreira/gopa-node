import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    // Regras de negócio
    // Se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const validEmail = email.includes("@");

    if (!validEmail) {
      throw new AppError("Invalid email", 400);
    }

    const validPassword = password.length >= 6;

    if (!validPassword) {
      throw new AppError("Invalid password", 400);
    }

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    //criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
