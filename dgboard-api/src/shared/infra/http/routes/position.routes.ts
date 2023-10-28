import { CreatePositionController } from "@modules/positions/useCases/createPosition/CreatePositionController";
import { ListPositionController } from "@modules/positions/useCases/listPosition/ListSectorController";
import { Router } from "express";

const positionsRoutes = Router();

const createPositionController = new CreatePositionController();
const listPositionController = new ListPositionController();

positionsRoutes.post("/", createPositionController.handle);
positionsRoutes.get("/", (request, response) => {
  listPositionController.handle(request, response);
});

export { positionsRoutes };
