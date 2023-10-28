import { v4 as uuidV4 } from "uuid";
import createConnection from "../index";
import { Sector } from "@modules/sectors/infra/typeorm/entities/Sector";

async function create() {
  const connection = await createConnection("localhost");

  await connection.query(`DELETE FROM sectors`);

  const sectors = [
    { name: "Administração" },
    { name: "Recursos Humanos " },
    { name: "Tecnologia da Informação" },
    { name: "Desenvolvimento e Programação" },
    { name: "Financeiro" },
    { name: "Contábil" },
    { name: "Marketing e Vendas" },
    { name: "Produção" },
    { name: "Logística" },
    { name: "Jurídico" },
    { name: "Compras" },
    { name: "Almoxarifado " },
    { name: "Atendimento ao Cliente " },
  ];

  for (const sectorData of sectors) {
    const sector = new Sector();
    sector.id = uuidV4();
    sector.name = sectorData.name;

    await connection.manager.save(sector);
  }

  await connection.close();
}

create().then(() => {
  console.log("Sectors created!");
});
