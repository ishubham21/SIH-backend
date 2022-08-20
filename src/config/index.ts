import { config } from "dotenv";
config();

export const {
  NODE_ENV,
  PORT,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,
  DATABASE_URL,
  SHADOW_DATABASE_URL,
  JWT_ACCESS_TOKEN_SECRET,
} = process.env;
