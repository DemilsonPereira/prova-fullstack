import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByIdUseCase } from "./ListUserByIdUseCase";

class ListUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUserUseCase = container.resolve(ListUserByIdUseCase);

    const Users = await listUserUseCase.execute(id);

    return response.json(Users);
  }
}

export { ListUserByIdController };
