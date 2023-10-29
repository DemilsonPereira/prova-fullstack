import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersBySectorController } from "@modules/accounts/useCases/listBySector/ListUsersBySectorController";
import { ListUsersByPositionController } from "@modules/accounts/useCases/listByPosition/ListUsersByPositionController";
import { RemoveUserController } from "@modules/accounts/useCases/removeUser/RemoveUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ListUserController } from "@modules/accounts/useCases/listUser/ListUserController";
import { ListUserByIdController } from "@modules/accounts/useCases/listUserById/ListUserByIdController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersBySectorController = new ListUsersBySectorController();
const listUsersByPositionController = new ListUsersByPositionController();
const removeUserController = new RemoveUserController();
const updateUserController = new UpdateUserController();
const listUserController = new ListUserController();
const listUserByIdController = new ListUserByIdController();

usersRoutes.get("/:id", ensureAuthenticated, listUserByIdController.handle);

usersRoutes.get("/", ensureAuthenticated, listUserController.handle);

usersRoutes.post("/", ensureAuthenticated, createUserController.handle);

usersRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);

usersRoutes.delete("/:id", ensureAuthenticated, removeUserController.handle);

usersRoutes.get("/sector/:sectorId", listUsersBySectorController.handle);

usersRoutes.get("/position/:positionId", listUsersByPositionController.handle);

export { usersRoutes };
