import { PostBussiness } from "../../../src/business/PostBusiness";
import { UpdatePostSchema } from "../../../src/dtos/post/update.dto";
import { ForbidenError, NotFoundError } from "../../../src/errors";
import { UserModel } from "../../../src/models/User";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
describe("Testando Atualização de posts", () => {
  const postBussiness = new PostBussiness(
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Atualiza post com sucesso", async () => {
    const input = UpdatePostSchema.parse({
      content: "Lorem ipsum post qualquer",
    });
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    const output = await postBussiness.updatePost("found", input, user);

    expect(output).toBeUndefined();
  });

  test("Atualiza post inexistente lança erro", async () => {
    const input = UpdatePostSchema.parse({
      content: "Lorem ipsum post qualquer",
    });
    const user: UserModel = {
      id: "11111111-1111-1111-1111-111111111111",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    await expect(
      postBussiness.updatePost("not-found", input, user)
    ).rejects.toThrow(NotFoundError);
  });

  test("Atualiza post de outro usuário lança erro", async () => {
    const input = UpdatePostSchema.parse({
      content: "Lorem ipsum post qualquer",
    });
    const user: UserModel = {
      id: "22222222-2222-2222-2222-222222222222",
      apelido: "Fulano",
      email: "fulano@email.com",
      createdAt: new Date().toISOString(),
    };

    await expect(
      postBussiness.updatePost(
        "00000000-0000-0000-0000-000000000000",
        input,
        user
      )
    ).rejects.toThrow(new ForbidenError("Somente o autor pode editar o post"));
  });
});
