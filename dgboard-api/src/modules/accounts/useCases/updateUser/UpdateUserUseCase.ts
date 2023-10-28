import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  position_id: string;
  sector_id: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    name,
    cpf,
    position_id,
    sector_id,
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.usersRepository.update(id, name, cpf, position_id, sector_id);
  }
}

export { UpdateUserUseCase };
