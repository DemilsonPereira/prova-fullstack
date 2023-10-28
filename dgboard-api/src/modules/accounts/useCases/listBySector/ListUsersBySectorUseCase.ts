import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ISectorsRepository } from "@modules/sectors/repositories/ISectorsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersBySectorUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("SectorsRepository")
    private sectorsRepository: ISectorsRepository
  ) {}

  async execute(sectorId: string): Promise<User[]> {
    const sectorExists = await this.sectorsRepository.findById(sectorId);

    if (!sectorExists) {
      throw new Error("Sector not found!");
    }

    const users = await this.usersRepository.listBySector(sectorId);

    return users;
  }
}

export { ListUsersBySectorUseCase };
