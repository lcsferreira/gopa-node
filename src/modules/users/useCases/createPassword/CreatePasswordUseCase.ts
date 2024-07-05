import { prisma } from "../../../../prisma/client";
import * as bcrypt from "bcrypt";
import { AppError } from "../../../../errors/AppError";

export class CreatePasswordUseCase {
  async execute(id: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const hasPassword = user.password !== null;

    if (hasPassword) {
      throw new AppError("Password already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { result: "Password created successfully" };
  }
}
