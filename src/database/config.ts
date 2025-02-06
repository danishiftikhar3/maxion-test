import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({ path: path.join(__dirname, `../../.env`) });

const isProd = process.env.NODE_ENV === "production";
const entitiesPath = !isProd ? "src/entities/*.ts" : "dist/entities/*.entity.js";
const migrationsPath = !isProd ? "src/migrations/*.ts" : "dist/migrations/*.js";

const config: ConnectionOptions = {
  type: "postgres",
  name: "default",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
  namingStrategy: new SnakeNamingStrategy(),
  ssl: false,
};

export = config;
