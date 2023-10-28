import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IPositionsRepository } from "@modules/positions/repositories/IPositionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersByPositionUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("PositionsRepository")
    private positionsRepository: IPositionsRepository
  ) {}

  async execute(positionId: string): Promise<User[]> {
    const positionExists = await this.positionsRepository.findById(positionId);

    if (!positionExists) {
      throw new Error("Position not found!");
    }

    const users = await this.usersRepository.listByPosition(positionId);

    return users;
  }
}

export { ListUsersByPositionUseCase };
