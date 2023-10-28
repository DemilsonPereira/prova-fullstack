import { CreateSectorController } from "@modules/sectors/useCases/createSector/CreateSectorController";
import { ListSectorController } from "@modules/sectors/useCases/listSectors/ListSectorController";
import { Router } from "express";

const sectorsRoutes = Router();

const createSectorController = new CreateSectorController();
const listSectorController = new ListSectorController();

sectorsRoutes.post("/", createSectorController.handle);
sectorsRoutes.get("/", (request, response) => {
  listSectorController.handle(request, response);
});

export { sectorsRoutes };
