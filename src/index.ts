import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./router/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

app.use("/users", userRouter);
