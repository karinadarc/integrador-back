import { PostDbModel } from "../../src/models/Post";
import { BaseDatabaseMock } from "./BaseDatabaseMock";

export class PostDatabaseMock extends BaseDatabaseMock {
  public addPost = async (post: PostDbModel): Promise<string> => {
    return post.id;
  };
}
