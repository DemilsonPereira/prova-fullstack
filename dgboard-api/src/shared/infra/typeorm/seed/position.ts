import { v4 as uuidV4 } from "uuid";
import createConnection from "../index";
import { Position } from "@modules/positions/infra/typeorm/entities/Position";

async function create() {
  const connection = await createConnection("localhost");

  await connection.query(`DELETE FROM positions`);

  const positions = [
    { name: "Diretor" },
    { name: "Gerente" },
    { name: "Coordenador" },
    { name: "Supervisor" },
    { name: "Analista" },
    { name: "Assistente" },
    { name: "Auxiliar" },
    { name: "Desenvolvedor FullStack" },
    { name: "Suporte de T.I" },
  ];

  for (const positionData of positions) {
    const position = new Position();
    position.id = uuidV4();
    position.name = positionData.name;

    await connection.manager.save(position);
  }

  await connection.close();
}

create().then(() => {
  console.log("Positions created!");
});
