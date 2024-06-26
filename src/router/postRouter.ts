import express, { Router } from "express";
import { PostBussiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { AuthMiddleware } from "../middleware";
import { IdService } from "../services/IdService";

export const authPostRouter = (authMiddleware: AuthMiddleware): Router => {
  const postRouter = express.Router();
  postRouter.use(authMiddleware.handle);

  const controller = new PostController(
    new PostBussiness(new PostDatabase(), new IdService())
  );

  postRouter.get("/", controller.getPosts);
  postRouter.get("/:id", controller.getPost);
  postRouter.post("/", controller.create);
  postRouter.put("/:id", controller.updatePost);
  postRouter.delete("/:id", controller.deletePost);
  postRouter.put("/:id/like", controller.like);

  return postRouter;
};
