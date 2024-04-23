import { CommentDbModel, CommentDbModelComplete } from "../models/Comment";
import { BaseDatabase } from "./BaseDataBase";

export class CommentsDatabase extends BaseDatabase {
  public addComment = async (comment: CommentDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(comment)
      .into(this.TABLE_COMMENTS)
      .returning("id");

    return result.id as string;
  };

  public getCommentsByPostId = async (
    postId: string
  ): Promise<CommentDbModelComplete[]> => {
    const result: CommentDbModelComplete[] = await BaseDatabase.connection
      .select(
        `${this.TABLE_COMMENTS}.id`,
        `${this.TABLE_COMMENTS}.user_id`,
        `${this.TABLE_COMMENTS}.post_id`,
        `${this.TABLE_COMMENTS}.content`,
        `${this.TABLE_COMMENTS}.created_at`,
        BaseDatabase.connection(this.TABLE_LIKES_DISLIKES_COMMENTS)
          .count("*")
          .whereRaw("?? = ?? and like = true", [
            `${this.TABLE_COMMENTS}.id`,
            `${this.TABLE_LIKES_DISLIKES_COMMENTS}.comment_id`,
          ])
          .as("likes"),
        BaseDatabase.connection(this.TABLE_LIKES_DISLIKES_COMMENTS)
          .count("*")
          .whereRaw("?? = ?? and like = false", [
            `${this.TABLE_COMMENTS}.id`,
            `${this.TABLE_LIKES_DISLIKES_COMMENTS}.comment_id`,
          ])
          .as("dislikes"),
        `${this.TABLE_USERS}.apelido AS creator_name`
      )
      .from<CommentDbModelComplete>(this.TABLE_COMMENTS)
      .join(
        this.TABLE_USERS,
        `${this.TABLE_COMMENTS}.user_id`,
        "=",
        `${this.TABLE_USERS}.id`
      )
      .where(`${this.TABLE_COMMENTS}.post_id`, postId);

    return result;
  };
}
