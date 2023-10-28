import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, cpf, password, "isAdmin", created_at)
        values('${id}', 'admin', '151.151.151-11', '${password}', true, 'now()')
        `
  );

  await connection.close();
}

create().then(() => {
  console.log("User admin created!");
});
