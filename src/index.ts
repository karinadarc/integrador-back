import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import userRouter from "./router/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});
