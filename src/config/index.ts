import { config } from "dotenv";
config();

export const {
  NODE_ENV,
  SERVER_PORT,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,
  DATABASE_URL,
  SHADOW_DATABASE_URL,
} = process.env;
