import { Sequelize } from "sequelize-typescript";
import { Repo } from "../Models/RepoModel";

import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  dialect: "mysql",
  models: [Repo],
});

async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { sequelize, testConnection };
