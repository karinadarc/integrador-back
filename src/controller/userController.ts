import { NextFunction, Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { LoginSchema } from "../dtos/user/login.dto";
import { SignupSchema } from "../dtos/user/signup.dto";

export class UserController {
  constructor(private userBussiness: UserBusiness) {}

  public signup = async (req: Request, res: Response, next: NextFunction) => {
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

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginInput = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBussiness.login(loginInput);
      console.info("INFO: Login efetuado: %s", loginInput.email);
      return res.status(HTTP_STATUS.OK).send(output);
    } catch (error) {
      next(error);
    }
  };
}
