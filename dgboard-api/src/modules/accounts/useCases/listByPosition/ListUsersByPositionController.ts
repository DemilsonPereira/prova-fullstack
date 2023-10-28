import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersByPositionUseCase } from "./ListUsersByPositionUseCase";

class ListUsersByPositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { positionId } = request.params;

      const listUsersByPositionUseCase = container.resolve(
        ListUsersByPositionUseCase
      );

      const users = await listUsersByPositionUseCase.execute(positionId);

      return response.json(users);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}

export { ListUsersByPositionController };
