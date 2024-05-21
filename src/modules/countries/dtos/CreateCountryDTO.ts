export interface CreateCountryDTO {
  name: string;
  capital: string;
  region: string;
  hasTranslation: boolean;
  indicatorsStep: number;
  translationStep: number;
  countryCardsTranslatedStep: number;
  countryCardsStep: number;
}
