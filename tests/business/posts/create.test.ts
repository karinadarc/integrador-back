import { PostBussiness } from "../../../src/business/PostBusiness";
import { CreatePostSchema } from "../../../src/dtos/post/create.dto";
import { UserModel } from "../../../src/models/User";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
describe("Testando criação de posts", () => {
  const postBussiness = new PostBussiness(
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Cria novo post", async () => {
    const input = CreatePostSchema.parse({
      content: "Lorem ipsum post qualquer",
    });
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    const output = await postBussiness.createPost(input, user);

    expect(output).toHaveProperty("id");
    expect(output.id).toBe("00000000-0000-0000-0000-000000000000");
  });
});
