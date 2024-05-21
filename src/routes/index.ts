import { Router } from "express";
import { userRoutes } from "./user.routes";
import { countryRoutes } from "./country.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/countries", countryRoutes);

export { routes };
