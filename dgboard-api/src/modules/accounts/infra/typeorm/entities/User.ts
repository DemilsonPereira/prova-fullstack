import { Position } from "@modules/positions/infra/typeorm/entities/Position";
import { Sector } from "@modules/sectors/infra/typeorm/entities/Sector";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as UUIDV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @ManyToOne(() => Position)
  @JoinColumn({ name: "position_id" })
  position: Position;

  @Column()
  position_id: string;

  @ManyToOne(() => Sector)
  @JoinColumn({ name: "sector_id" })
  sector: Sector;

  @Column()
  sector_id: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = UUIDV4();
    }
  }
}

export { User };
