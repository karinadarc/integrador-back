import { PostBussiness } from "../../../src/business/PostBusiness";
import { NotFoundError } from "../../../src/errors";
import { UserModel } from "../../../src/models/User";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
describe("Testando recuperação de posts", () => {
  const postBussiness = new PostBussiness(
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Obter todos os posts", async () => {
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    const output = await postBussiness.getPosts(user);
    const expected = {
      content: "content",
      createdAt: "2024-02-12T01:03:03.080Z",
      creator: {
        creatorId: "11111111-1111-1111-1111-111111111111",
        creatorName: "Fulano",
      },
      dislikes: 0,
      id: "a7102751-26c4-4606-bbf4-b4d97dae37c2",
      likes: 0,
      updatedAt: "2024-02-12T01:03:03.080Z",
      comments: 0,
    };

    expect(output).toContainEqual(expected);
  });

  test("Obter um post", async () => {
    const id = "99999999-9999-9999-9999-999999999999";
    const output = await postBussiness.getPost(id);
    const expected = {
      content: "content",
      createdAt: "2024-02-12T01:03:03.080Z",
      creator: {
        creatorId: "11111111-1111-1111-1111-111111111111",
        creatorName: "Fulano",
      },
      dislikes: 0,
      id,
      likes: 0,
      updatedAt: "2024-02-12T01:03:03.080Z",
      comments: 0,
    };

    expect(output).toEqual(expected);
  });

  test("Get post inexistente lança erro", async () => {
    const id = "not-found";
    await expect(postBussiness.getPost(id)).rejects.toThrow(NotFoundError);
  });
});
