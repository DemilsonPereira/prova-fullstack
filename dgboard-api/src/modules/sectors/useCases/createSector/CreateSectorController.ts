import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSectorUseCase } from "./CreateSectorUseCase";

class CreateSectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSectorUseCase = container.resolve(CreateSectorUseCase);

    await createSectorUseCase.execute({
      name,
    });

    return response.status(201).send();
  }
}

export { CreateSectorController };
