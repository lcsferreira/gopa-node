import { Router } from "express";
import { LoginController } from "../modules/auth/useCases/Login/LoginController";
import { ForgotPasswordController } from "../modules/auth/useCases/ForgotPassword/ForgotPasswordController";

const loginController = new LoginController();
const forgotPasswordController = new ForgotPasswordController();

const authRoutes = Router();

authRoutes.post("/login", loginController.handle);
authRoutes.post("/forgot-password", forgotPasswordController.handle);

export { authRoutes };
