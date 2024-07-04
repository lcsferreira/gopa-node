import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetUsersByCountryNameUseCase {
  async execute(countryName: string): Promise<User[]> {
    const countryId = await prisma.country.findFirst({
      where: {
        name: countryName,
      },
      select: {
        id: true,
      },
    });

    if (!countryId) {
      throw new Error("Country not found");
    }

    const usersIds = await prisma.userCountry.findMany({
      where: {
        countryId: countryId.id,
      },
      select: {
        user: true,
      },
    });

    const users = usersIds.map((user) => user.user);

    return users;
  }
}
