import { ICreatePositionDTO } from "../dtos/ICreatePositionDTO";
import { Position } from "../infra/typeorm/entities/Position";

interface IPositionsRepository {
  create(data: ICreatePositionDTO): Promise<Position>;
  findByName(name: string): Promise<Position>;
  findById(id: string): Promise<Position>;
  list(): Promise<Position[]>;
}

export { IPositionsRepository };
