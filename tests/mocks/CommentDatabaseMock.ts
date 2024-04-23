import {
  CommentDbModel,
  CommentDbModelComplete,
} from "../../src/models/Comment";
import { BaseDatabaseMock } from "./BaseDatabaseMock";

export class CommentDatabaseMock extends BaseDatabaseMock {
  public addComment = async (comment: CommentDbModel): Promise<string> => {
    return comment.id;
  };

  public getCommentsByPostId = async (
    id: string
  ): Promise<CommentDbModelComplete[]> => {
    return [
      {
        post_id: id,
        id: "a7102751-26c4-4606-bbf4-b4d97dae37c2",
        content: "content",
        likes: 0,
        dislikes: 0,
        created_at: "2024-02-12T01:03:03.080Z",
        user_id: "11111111-1111-1111-1111-111111111111",
        creator_name: "Fulano",
      },
    ];
  };
}
