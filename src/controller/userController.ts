import { Request, Response } from "express";

export class UserController {
  public userSignup = async (req: Request, res: Response) => {
    console.log("testeeeeeeeeee");
    res.send(" qualquer");
  };
}
