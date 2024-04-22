import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comment/create.dto";
import { NotFoundError } from "../errors";
import { Comment } from "../models/Comment";
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
}
