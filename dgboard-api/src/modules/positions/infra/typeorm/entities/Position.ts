import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as UUIDV4 } from "uuid";

@Entity("positions")
class Position {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  constructor() {
    if (!this.id) {
      this.id = UUIDV4();
    }
  }
}

export { Position };
