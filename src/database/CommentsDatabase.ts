import { CommentDbModel } from "../models/Comment";
import { BaseDatabase } from "./BaseDataBase";

export class CommentsDatabase extends BaseDatabase {
  public addComment = async (comment: CommentDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(comment)
      .into(this.TABLE_COMMENTS)
      .returning("id");

    return result.id as string;
  };
}
