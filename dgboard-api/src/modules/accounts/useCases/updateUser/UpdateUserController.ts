import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cpf, position_id, sector_id } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id,
      name,
      cpf,
      position_id,
      sector_id,
    });

    return response.status(200).json({ message: "User updated successfully" });
  }
}

export { UpdateUserController };
