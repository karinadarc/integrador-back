import { PostDbModel } from "../models/Post";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {
  public addPost = async (post: PostDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(post)
      .into(this.TABLE_POSTS)
      .returning("id");

    return result.id as string;
  };
}
