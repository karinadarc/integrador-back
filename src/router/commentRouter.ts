import express, { Router } from "express";
import { CommentBussiness } from "../business/CommentBussiness";
import { CommentController } from "../controller/CommentController";
import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { AuthMiddleware } from "../middleware";
import { IdService } from "../services/IdService";

export const authCommentRouter = (authMiddleware: AuthMiddleware): Router => {
  const commentRouter = express.Router();
  commentRouter.use(authMiddleware.handle);

  const controller = new CommentController(
    new CommentBussiness(
      new CommentsDatabase(),
      new PostDatabase(),
      new IdService()
    )
  );

  commentRouter.get("/:id", controller.all);
  commentRouter.post("/:id", controller.create);
  commentRouter.put("/:id/like", controller.likeDislike);

  return commentRouter;
};
