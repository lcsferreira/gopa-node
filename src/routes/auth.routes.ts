import { Router } from "express";
import { LoginController } from "../modules/auth/useCases/Login/LoginController";

const loginController = new LoginController();

const authRoutes = Router();

authRoutes.post("/login", loginController.handle);

export { authRoutes };
