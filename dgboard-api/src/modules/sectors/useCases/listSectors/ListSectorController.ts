import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSectorUseCase } from "./ListSectorUseCase";

class ListSectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSectorUseCase = container.resolve(ListSectorUseCase);

    const allSectors = await listSectorUseCase.execute();

    return response.json(allSectors);
  }
}

export { ListSectorController };
