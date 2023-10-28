import { ICreateUserDTO } from "../dtos/ICreateUSerDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByCpf(cpf: string): Promise<User>;
  findById(id: string): Promise<User>;
  listBySector(sector_id: string): Promise<User[]>;
  listByPosition(position_id: string): Promise<User[]>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    name: string,
    cpf: string,
    positionId: string,
    sectorId: string
  ): Promise<void>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
