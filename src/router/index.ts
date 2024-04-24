import { Express } from "express";
import { UserDatabase } from "../database/UserDataBase";
import { AuthMiddleware } from "../middleware";
import { TokenService } from "../services/TokenService";
import { authCommentRouter } from "./commentRouter";
import { authPostRouter } from "./postRouter";
import userRouter from "./userRouter";

const addRoutes = (app: Express) => {
  const tokenService = new TokenService();
  const userDatabase = new UserDatabase();
  const middleware = new AuthMiddleware(tokenService, userDatabase);

  app.use("/users", userRouter);
  app.use("/posts", authPostRouter(middleware));
  app.use("/postcomments", authCommentRouter(middleware));
};

export { addRoutes };
