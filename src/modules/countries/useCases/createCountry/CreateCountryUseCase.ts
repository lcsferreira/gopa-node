import { Country } from "@prisma/client";
import { CreateCountryDTO } from "../../dtos/CreateCountryDTO";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class CreateCountryUseCase {
  async execute({
    name,
    capital,
    region,
    hasTranslation,
    countryCardsStep,
    indicatorsStep,
    translationStep,
    countryCardsTranslatedStep,
  }: CreateCountryDTO): Promise<Country> {
    const countryAlreadyExists = await prisma.country.findUnique({
      where: {
        name, // Replace 'capital' with the appropriate property that represents the unique identifier of the country
      },
    });

    if (countryAlreadyExists) {
      throw new AppError("Country already exists");
    }

    const country = await prisma.country.create({
      data: {
        name,
        capital,
        region,
        hasTranslation,
        countryCardsStep,
        indicatorsStep,
        translationStep,
        countryCardsTranslatedStep,
      },
    });

    return country;
  }
}
