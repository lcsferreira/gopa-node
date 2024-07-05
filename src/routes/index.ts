import { Router } from "express";
import { userRoutes } from "./user.routes";
import { countryRoutes } from "./country.routes";
import { authRoutes } from "./auth.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/countries", countryRoutes);
routes.use("/auth", authRoutes);

export { routes };
