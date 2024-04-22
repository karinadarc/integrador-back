import { CommentDbModel } from "../../src/models/Comment";
import { BaseDatabaseMock } from "./BaseDatabaseMock";

export class CommentDatabaseMock extends BaseDatabaseMock {
  public addComment = async (comment: CommentDbModel): Promise<string> => {
    return comment.id;
  };
}
