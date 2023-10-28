import { ICreateSectorDTO } from "@modules/sectors/dtos/ICreateSectorDTO";
import { ISectorsRepository } from "@modules/sectors/repositories/ISectorsRepository";
import { Repository, getRepository } from "typeorm";
import { Sector } from "@modules/sectors/infra/typeorm/entities/Sector";

class SectorsRepository implements ISectorsRepository {
  private repository: Repository<Sector>;

  constructor() {
    this.repository = getRepository(Sector);
  }

  async create({ name }: ICreateSectorDTO): Promise<Sector> {
    const sector = this.repository.create({
      name,
    });

    await this.repository.save(sector);

    return sector;
  }

  async findByName(name: string): Promise<Sector> {
    const sector = await this.repository.findOne({ name });

    return sector;
  }

  async list(): Promise<Sector[]> {
    const sectors = await this.repository.find();
    return sectors;
  }

  async findById(id: string): Promise<Sector> {
    const sector = await this.repository.findOne(id);

    return sector;
  }
}

export { SectorsRepository };
