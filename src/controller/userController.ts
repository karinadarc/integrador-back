import { NextFunction, Request, Response } from "express";
import { UserBussiness } from "../bussiness/UserBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { SignupSchema } from "../dtos/user/signup.dto";

export class UserController {
  constructor(private userBussiness: UserBussiness) {}

  public userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const signupInput = SignupSchema.parse({
        apelido: req.body.apelido,
        email: req.body.email,
        password: req.body.password,
      });

      const response = await this.userBussiness.signup(signupInput);
      return res.status(HTTP_STATUS.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  };
}
