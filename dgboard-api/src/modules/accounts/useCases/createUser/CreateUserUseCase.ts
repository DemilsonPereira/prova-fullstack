import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUSerDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    cpf,
    sector_id,
    position_id,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByCpf(cpf);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.usersRepository.create({
      name,
      cpf,
      sector_id,
      position_id,
    });
  }
}

export { CreateUserUseCase };
