import { PostBussiness } from "../../../src/business/PostBusiness";
import { ForbidenError, NotFoundError } from "../../../src/errors";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
import { createUser } from "../../utils";
describe("Testando Remoção de posts", () => {
  const postBussiness = new PostBussiness(
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  test("Remove post com sucesso", async () => {
    const user = createUser();

    const output = await postBussiness.deletePost("found", user);

    expect(output).toBeUndefined();
  });

  test("Remove post inexistente lança erro", async () => {
    const user = createUser();

    await expect(postBussiness.deletePost("not-found", user)).rejects.toThrow(
      NotFoundError
    );
  });

  test("Remover post de outro usuário lança erro", async () => {
    const user = createUser("22222222-2222-2222-2222-222222222222");
    await expect(
      postBussiness.deletePost("00000000-0000-0000-0000-000000000000", user)
    ).rejects.toThrow(new ForbidenError("Sem permissoes para remover o post"));
  });
});
