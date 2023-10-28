import { ICreateSectorDTO } from "../dtos/ICreateSectorDTO";
import { Sector } from "../infra/typeorm/entities/Sector";

interface ISectorsRepository {
  create(data: ICreateSectorDTO): Promise<Sector>;
  findByName(name: string): Promise<Sector>;
  findById(id: string): Promise<Sector>;
  list(): Promise<Sector[]>;
}

export { ISectorsRepository };
