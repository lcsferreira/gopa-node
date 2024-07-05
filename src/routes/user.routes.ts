import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUsersController } from "../modules/users/useCases/getAllUsers/GetAllUsersController";
import { GetUserByIdController } from "../modules/users/useCases/getUserById/GetUserByIdController";
import { PutUserController } from "../modules/users/useCases/putUser/PutUserController";
import { DeleteUserController } from "../modules/users/useCases/deleteUser/deleteUserController";
import { CreatePasswordController } from "../modules/users/useCases/createPassword/CreatePasswordController";
import { authenticate } from "../middleware/authenticate";

const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const putUserController = new PutUserController();
const deleteUserController = new DeleteUserController();
const createPasswordController = new CreatePasswordController();
const userRoutes = Router();

userRoutes.post("/", authenticate, createUserController.handle);
userRoutes.get("/", getAllUsersController.handle);
userRoutes.get("/:id", authenticate, getUserByIdController.handle);
userRoutes.put("/:id", authenticate, putUserController.handle);
userRoutes.delete("/:id", authenticate, deleteUserController.handle);
userRoutes.put("/:id/createPassword", createPasswordController.handle);

export { userRoutes };
