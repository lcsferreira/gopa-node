import { UserCountry } from "@prisma/client";
import { CreateCountryUserRelationDTO } from "../../dtos/CreateCountryUserRelationDTO";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class CreateCountryUserRelationUseCase {
  async execute({
    userId,
    countryId,
  }: CreateCountryUserRelationDTO): Promise<UserCountry> {
    const relationAlreadyExists = await prisma.userCountry.findFirst({
      where: {
        userId,
        countryId,
      },
    });

    if (relationAlreadyExists) {
      throw new AppError("Relation already exists");
    }

    const relation = await prisma.userCountry.create({
      data: {
        userId,
        countryId,
      },
    });

    return relation;
  }
}
