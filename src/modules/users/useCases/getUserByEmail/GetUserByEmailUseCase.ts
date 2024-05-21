import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetUserByEmailUseCase {
  async execute(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }
}
