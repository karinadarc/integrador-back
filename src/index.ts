import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware";
import { addRoutes } from "./router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

addRoutes(app);

app.use(errorHandler);

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

app.get("/health", (req, res) => {
  res.send("ok");
});
