import { Router } from "express";
import { CreateCountryController } from "../modules/countries/useCases/createCountry/CreateCountryController";
import { CreateCountryUserRelationController } from "../modules/countries/useCases/createCountryUserRelation/CreateCountryUserRelationController";
import { GetAllCountriesController } from "../modules/countries/useCases/getAllCountries/getAllCountriesController";
import { GetUsersByCountryNameController } from "../modules/countries/useCases/getUsersByCountryName/GetUsersByCountryNameController";

const createCountryController = new CreateCountryController();
const createCountryUserRelationController =
  new CreateCountryUserRelationController();
const getAllCountriesController = new GetAllCountriesController();
const getUsersByCountryNameController = new GetUsersByCountryNameController();
const countryRoutes = Router();

//Gets
countryRoutes.get("/", getAllCountriesController.handle);
countryRoutes.get(
  "/relation/:name/users",
  getUsersByCountryNameController.handle
);

//Posts
countryRoutes.post("/", createCountryController.handle);
countryRoutes.post("/relation", createCountryUserRelationController.handle);

export { countryRoutes };
