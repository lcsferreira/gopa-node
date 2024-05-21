import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUserByIdController } from "../modules/users/useCases/getUserById/GetUserByIdController";
import { PutUserController } from "../modules/users/useCases/putUser/PutUserController";

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const putUserController = new PutUserController();
const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", getAllUsersController.handle);
userRoutes.get("/:id", getUserByIdController.handle);
userRoutes.put("/:id", putUserController.handle);

export { userRoutes };
