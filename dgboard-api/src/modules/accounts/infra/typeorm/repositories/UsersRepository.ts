import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Repository, getRepository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUSerDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    cpf,
    position_id,
    sector_id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      cpf,
      position_id,
      sector_id,
    });

    await this.repository.save(user);
  }

  async findByCpf(cpf: string): Promise<User> {
    const cpfExists = await this.repository.findOne({ cpf });

    return cpfExists;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async listBySector(sector_id: string): Promise<User[]> {
    const usersBySector = await this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.position", "position")
      .leftJoinAndSelect("user.sector", "sector")
      .select([
        "user.id as id",
        "user.name as name",
        "user.cpf as cpf",
        "position.name as position",
        "sector.name as sector",
      ])
      .where("user.sector_id = :sector_id", { sector_id })
      .getRawMany();

    return usersBySector;
  }

  async listByPosition(position_id: string): Promise<User[]> {
    const usersByPosition = await this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.position", "position")
      .leftJoinAndSelect("user.sector", "sector")
      .select([
        "user.id as id",
        "user.name as name",
        "user.cpf as cpf",
        "position.name as position",
        "sector.name as sector",
      ])
      .where("user.position_id = :position_id", { position_id })
      .getRawMany();

    return usersByPosition;
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.repository.findOne(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.repository.delete(id);
  }

  async update(
    id: string,
    name: string,
    cpf: string,
    position_id: string,
    sector_id: string
  ): Promise<void> {
    const userExists = await this.repository.findOne(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.repository.update(id, { name, cpf, position_id, sector_id });
  }

  async list(): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.position", "position")
      .leftJoinAndSelect("user.sector", "sector")
      .where("user.isAdmin = :isAdmin", { isAdmin: false })
      .select([
        "user.id as id",
        "user.name as name",
        "user.cpf as cpf",
        "position.name as position",
        "sector.name as sector",
      ])
      .getRawMany();

    return users;
  }
}

export { UsersRepository };
