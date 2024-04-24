import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comment/create.dto";
import { LikeDeslikeCommentPostInputDTO } from "../dtos/comment/like.dto";
import { NotFoundError } from "../errors";
import { Comment, CommentModel } from "../models/Comment";
import { LikeDeslikeComment } from "../models/LikeDislikeComment";
import { UserModel } from "../models/User";
import { IdService } from "../services/IdService";

export class CommentBussiness {
  constructor(
    private commentsDatabase: CommentsDatabase,
    private postDatabase: PostDatabase,
    private idService: IdService
  ) {}

  public createComment = async (
    postId: string,
    input: CreateCommentInputDTO,
    user: UserModel
  ): Promise<CreateCommentOutputDTO> => {
    const result = await this.postDatabase.getPostById(postId);

    if (!result) {
      throw new NotFoundError("Post não encontrado.");
    }

    const comment = new Comment(
      this.idService.newId(),
      user.id,
      postId,
      input.content,
      new Date().toISOString(),
      0,
      0,
      undefined
    );

    const id = await this.commentsDatabase.addComment(
      comment.toInsertDatabaseModel()
    );
    return { id };
  };

  public async getComments(postId: string): Promise<CommentModel[]> {
    const result = await this.commentsDatabase.getCommentsByPostId(postId);

    return result.map((comment) =>
      Comment.fromDatabaseModel(comment).toBusinessModel()
    );
  }

  public async likeDeslike(
    commentId: string,
    input: LikeDeslikeCommentPostInputDTO,
    user: UserModel
  ): Promise<void> {
    const databaseComment = await this.commentsDatabase.getCommentById(
      commentId
    );
    if (!databaseComment) {
      throw new NotFoundError("Comentário não encontrado.");
    }

    const comment = Comment.fromDatabaseModel(databaseComment);

    const oldLikeDislike =
      await this.commentsDatabase.getCommentlikeDeslikeByUser(
        comment.getId(),
        user.id
      );

    const newLikeDislike = new LikeDeslikeComment(
      user.id,
      comment.getId(),
      input.like
    );

    if (!oldLikeDislike) {
      return await this.commentsDatabase.addLikeDislike(
        newLikeDislike.toDatabaseModel()
      );
    }

    if (oldLikeDislike.like === newLikeDislike.toDatabaseModel().like) {
      return await this.commentsDatabase.removeLikeDislike(oldLikeDislike);
    }

    return await this.commentsDatabase.invertLikeDislike(
      oldLikeDislike,
      newLikeDislike.toDatabaseModel()
    );
  }
}
