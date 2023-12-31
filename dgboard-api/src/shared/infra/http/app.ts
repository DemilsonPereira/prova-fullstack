  import "reflect-metadata";
  import "dotenv/config";
  import express, { NextFunction, Request, Response } from "express";
  import "express-async-errors";

  import "@shared/container";
  import { AppError } from "@shared/errors/AppError";
  import createConnection from "@shared/infra/typeorm";
  import cors from "cors";

  import { router } from "./routes";

  createConnection();
  const app = express();

  const API_PREFIX = "/api";

  app.use(cors());

  app.use(express.json());

  app.use(API_PREFIX, router);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
      });
    }
  );

  export { app };
