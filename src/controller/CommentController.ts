import { NextFunction, Request, Response } from "express";
import { CommentBussiness } from "../business/CommentBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { CreateCommentSchema } from "../dtos/comment/create.dto";
import { LikeDeslikeCommentSchema } from "../dtos/comment/like.dto";
import { UUIDSchema } from "../dtos/uuid.dto";
import { UserModel } from "../models/User";

export class CommentController {
  constructor(private commentBussisnes: CommentBussiness) {}

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createInput = CreateCommentSchema.parse({
        content: req.body.content,
      });
      const id = req.params.id;

      const output = await this.commentBussisnes.createComment(
        id,
        createInput,
        req.loggedUser as UserModel
      );
      console.info("INFO: post criado: %s", output.id);
      return res.status(HTTP_STATUS.CREATED).send(output);
    } catch (error) {
      next(error);
    }
  };

  public all = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const output = await this.commentBussisnes.getComments(id);
      return res.send(output);
    } catch (error) {
      next(error);
    }
  };

  public likeDislike = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = UUIDSchema.parse(req.params.id);
      const likeInput = LikeDeslikeCommentSchema.parse({
        like: req.body.like,
      });
      const output = await this.commentBussisnes.likeDeslike(
        id,
        likeInput,
        req.loggedUser as UserModel
      );
      console.info("INFO: Like %s atualizado para comment", id);
      res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
