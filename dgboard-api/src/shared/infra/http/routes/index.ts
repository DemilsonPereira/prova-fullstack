import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { sectorsRoutes } from "./sector.routes";
import { positionsRoutes } from "./position.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sectors", sectorsRoutes);
router.use("/positions", positionsRoutes);
router.use(authenticateRoutes);

export { router };
