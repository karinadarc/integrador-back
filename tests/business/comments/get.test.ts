import { CommentBussiness } from "../../../src/business/CommentBussiness";
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
describe("Testando criação de commentários", () => {
  const commentBussiness = new CommentBussiness(
    new CommentDatabaseMock(),
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Obter todos os comentários", async () => {
    const postId = "22222222-2222-2222-2222-222222222222";
    const expected = {
      content: "content",
      created_at: "2024-02-12T01:03:03.080Z",
      creator_name: "Fulano",
      dislikes: 0,
      id: "a7102751-26c4-4606-bbf4-b4d97dae37c2",
      likes: 0,
      post_id: postId,
      user_id: "11111111-1111-1111-1111-111111111111",
    };

    const output = await commentBussiness.getComments(postId);
    expect(output).toContainEqual(expected);
  });
});
