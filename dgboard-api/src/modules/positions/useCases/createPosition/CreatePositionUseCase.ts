import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IPositionsRepository } from "../../repositories/IPositionsRepository";
import { ICreatePositionDTO } from "../../dtos/ICreatePositionDTO";

@injectable()
class CreatePositionUseCase {
  constructor(
    @inject("PositionsRepository")
    private positionsRepository: IPositionsRepository
  ) {}

  async execute({ name }: ICreatePositionDTO) {
    const positionAlreadyExists = await this.positionsRepository.findByName(
      name
    );

    if (positionAlreadyExists) {
      throw new AppError("Position already exists");
    }

    await this.positionsRepository.create({
      name,
    });
  }
}

export { CreatePositionUseCase };
