import { ICreateSectorDTO } from "@modules/sectors/dtos/ICreateSectorDTO";
import { Repository, getRepository } from "typeorm";
import { Position } from "../entities/Position";
import { IPositionsRepository } from "@modules/positions/repositories/IPositionsRepository";

class PositionsRepository implements IPositionsRepository {
  private repository: Repository<Position>;

  constructor() {
    this.repository = getRepository(Position);
  }

  async create({ name }: ICreateSectorDTO): Promise<Position> {
    const position = this.repository.create({
      name,
    });

    await this.repository.save(position);

    return position;
  }

  async findByName(name: string): Promise<Position> {
    const position = await this.repository.findOne({ name });

    return position;
  }

  async list(): Promise<Position[]> {
    const positions = await this.repository.find();
    return positions;
  }

  async findById(id: string): Promise<Position> {
    const position = await this.repository.findOne(id);

    return position;
  }
}

export { PositionsRepository };
