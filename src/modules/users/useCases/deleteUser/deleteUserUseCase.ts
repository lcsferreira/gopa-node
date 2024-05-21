import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUserUseCase {
  async execute(id: string): Promise<void> {
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

    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
