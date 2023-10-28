import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersBySectorUseCase } from "./ListUsersBySectorUseCase";

class ListUsersBySectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { sectorId } = request.params;

      const listUsersBySectorUseCase = container.resolve(
        ListUsersBySectorUseCase
      );

      const users = await listUsersBySectorUseCase.execute(sectorId);

      return response.json(users);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export { ListUsersBySectorController };
