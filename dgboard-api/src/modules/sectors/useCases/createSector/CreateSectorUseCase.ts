import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISectorsRepository } from "@modules/sectors/repositories/ISectorsRepository";
import { ICreateSectorDTO } from "@modules/sectors/dtos/ICreateSectorDTO";

@injectable()
class CreateSectorUseCase {
  constructor(
    @inject("SectorsRepository")
    private sectorsRepository: ISectorsRepository
  ) {}

  async execute({ name }: ICreateSectorDTO): Promise<void> {
    const sectorAlreadyExists = await this.sectorsRepository.findByName(name);

    if (sectorAlreadyExists) {
      throw new AppError("Sector already exists");
    }

    await this.sectorsRepository.create({
      name,
    });
  }
}

export { CreateSectorUseCase };
