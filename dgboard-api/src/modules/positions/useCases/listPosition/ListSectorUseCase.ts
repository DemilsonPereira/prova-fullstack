import { Position } from "@modules/positions/infra/typeorm/entities/Position";
import { IPositionsRepository } from "@modules/positions/repositories/IPositionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListPositionUseCase {
  constructor(
    @inject("PositionsRepository")
    private positionsRepository: IPositionsRepository
  ) {}

  async execute(): Promise<Position[]> {
    const sectors = await this.positionsRepository.list();

    return sectors;
  }
}

export { ListPositionUseCase };
