import { Sector } from "@modules/sectors/infra/typeorm/entities/Sector";
import { ISectorsRepository } from "@modules/sectors/repositories/ISectorsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSectorUseCase {
  constructor(
    @inject("SectorsRepository")
    private sectorsRepository: ISectorsRepository
  ) {}

  async execute(): Promise<Sector[]> {
    const sectors = await this.sectorsRepository.list();

    return sectors;
  }
}

export { ListSectorUseCase };
