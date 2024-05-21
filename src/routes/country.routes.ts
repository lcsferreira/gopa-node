import { Router } from "express";
import { CreateCountryController } from "../modules/countries/useCases/createCountry/CreateCountryController";
import { CreateCountryUserRelationController } from "../modules/countries/useCases/createCountryUserRelation/CreateCountryUserRelationController";
import { GetAllCountriesController } from "../modules/countries/useCases/getAllCountries/getAllCountriesController";

const createCountryController = new CreateCountryController();
const createCounrtysUserRelationController =
  new CreateCountryUserRelationController();
const getAllCountriesController = new GetAllCountriesController();
const countryRoutes = Router();

countryRoutes.get("/", getAllCountriesController.handle);
countryRoutes.post("/", createCountryController.handle);
countryRoutes.post("/relation", createCounrtysUserRelationController.handle);

export { countryRoutes };
