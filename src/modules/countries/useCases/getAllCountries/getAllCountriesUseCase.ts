import { Country } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetAllCountriesUseCase {
  async execute(): Promise<Country[]> {
    const countries = await prisma.country.findMany();

    if (!countries) {
      throw new AppError("Countries not found");
    }

    return countries;
  }
}
