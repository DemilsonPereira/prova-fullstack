import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPositionUseCase } from "./ListSectorUseCase";

class ListPositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPositionUseCase = container.resolve(ListPositionUseCase);

    const allPositions = await listPositionUseCase.execute();

    return response.json(allPositions);
  }
}

export { ListPositionController };
