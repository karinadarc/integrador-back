import express from "express";
import { UserController } from "../controller/userController";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.userSignup);

export default userRouter;
