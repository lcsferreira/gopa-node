import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUserUseCase {
  async execute(id: string): Promise<void> {
    // Regras de negócio
    // Se o usuário não existe
    const userDontExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userDontExists) {
      throw new AppError("User don't exists", 404);
    }

    //delete all country user relations
    await prisma.userCountry.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
