import { container } from "tsyringe";
import "@shared/container/providers";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { ISectorsRepository } from "@modules/sectors/repositories/ISectorsRepository";
import { SectorsRepository } from "@modules/sectors/infra/typeorm/repositories/SectorsRepository";
import { IPositionsRepository } from "@modules/positions/repositories/IPositionsRepository";
import { PositionsRepository } from "@modules/positions/infra/typeorm/repositories/PositionsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ISectorsRepository>(
  "SectorsRepository",
  SectorsRepository
);

container.registerSingleton<IPositionsRepository>(
  "PositionsRepository",
  PositionsRepository
);
