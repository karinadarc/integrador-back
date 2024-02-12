import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDataBase";
import { IdService } from "../services/IdService";
import { PasswordService } from "../services/PasswordService";
import { TokenService } from "../services/TokenService";

const userRouter = express.Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdService(),
    new TokenService(),
    new PasswordService()
  )
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

export default userRouter;
