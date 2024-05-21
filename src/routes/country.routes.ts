import { Router } from "express";
import { CreateCountryController } from "../modules/countries/useCases/createCountry/CreateCountryController";
import { CreateCountryUserRelationController } from "../modules/countries/useCases/createCountryUserRelation/CreateCountryUserRelationController";

const createCountryController = new CreateCountryController();
const createCounrtysUserRelationController =
  new CreateCountryUserRelationController();
const countryRoutes = Router();

countryRoutes.post("/", createCountryController.handle);
countryRoutes.post("/relation", createCounrtysUserRelationController.handle);

export { countryRoutes };
