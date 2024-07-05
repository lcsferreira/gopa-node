import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { PutUserDTO } from "../../dtos/PutUserDTO";
import { AppError } from "../../../../errors/AppError";

export class PutUserUseCase {
  async execute({
    id,
    name,
    email,
    institution,
    isAdmin,
    isActive,
  }: PutUserDTO): Promise<User> {
    // Regras de negócio
    // Se o usuário já existe
    const userDontExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userDontExists) {
      throw new AppError("User don't exists", 404);
    }

    //VERIFY IF EMAIL IS CHANGED
    if (email !== userDontExists?.email) {
      const emailAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (emailAlreadyExists) {
        throw new AppError("Email already exists", 400);
      }

      const validEmail = email.includes("@");

      if (!validEmail) {
        throw new AppError("Invalid email", 400);
      }
    }

    //editar usuário
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        institution,
        isAdmin,
        isActive,
      },
    });

    return user;
  }
}
