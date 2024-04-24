import { CommentBussiness } from "../../../src/business/CommentBussiness";
import { CreateCommentSchema } from "../../../src/dtos/comment/create.dto";
import { NotFoundError } from "../../../src/errors";
import { UserModel } from "../../../src/models/User";
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
describe("Testando criação de commentários", () => {
  const commentBussiness = new CommentBussiness(
    new CommentDatabaseMock(),
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Cria novo comentario", async () => {
    const input = CreateCommentSchema.parse({
      content: "Lorem ipsum post qualquer",
    });

    const postId = "22222222-2222-2222-2222-222222222222";
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    const output = await commentBussiness.createComment(postId, input, user);

    expect(output).toHaveProperty("id");
    expect(output.id).toBe("00000000-0000-0000-0000-000000000000");
  });

  test("Cria novo comentario em post inexistente lança erro", async () => {
    const input = CreateCommentSchema.parse({
      content: "Lorem ipsum post qualquer",
    });

    const postId = "not-found";
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    await expect(
      commentBussiness.createComment(postId, input, user)
    ).rejects.toThrow(NotFoundError);
  });
});
