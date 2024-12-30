import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sequelize, testConnection } from "./sequelize";
import router from './routes/routes';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors<Request>());
app.use(helmet());

app.use("/", router);

// test database connection
testConnection();

// general error handling validation
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ success: false, message: message });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});