import { PostBussiness } from "../../../src/business/PostBusiness";
import { LikeDeslikePostSchema } from "../../../src/dtos/post/like.dto";
import { ForbidenError, NotFoundError } from "../../../src/errors";
import { Post } from "../../../src/models/Post";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
import { createUser } from "../../utils";

describe("Testando Like & Dislike", () => {
  const spyIncreaseLikes = jest.spyOn(Post.prototype, "increaseLikes");
  const spyIncreaseDislikes = jest.spyOn(Post.prototype, "increaseDislikes");
  const spyDecreaseLikes = jest.spyOn(Post.prototype, "decreaseLikes");
  const spyDecreaseDislikes = jest.spyOn(Post.prototype, "decreaseDislikes");

  const postDatabase = new PostDatabaseMock();
  const spyUpdateAdd = jest.spyOn(postDatabase, "updatePostandAddLikeDislike");
  const spyUpdateRemove = jest.spyOn(
    postDatabase,
    "updatePostAndRemoveLikeDislike"
  );
  const spyUpdateReplace = jest.spyOn(
    postDatabase,
    "updatePostAndReplaceLikeDislike"
  );

  const postBussiness = new PostBussiness(postDatabase, new IdServiceMock());

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Like em post inexistente lança erro", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: true,
    });
    const user = createUser();

    await expect(
      postBussiness.likeDeslike("not-found", input, user)
    ).rejects.toThrow(NotFoundError);
  });

  test("Like em próprio post lança erro", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: true,
    });
    const user = createUser();

    await expect(
      postBussiness.likeDeslike(
        "00000000-0000-0000-0000-000000000000",
        input,
        user
      )
    ).rejects.toThrow(ForbidenError);
  });

  test("Novo like funciona", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: true,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike(
      "like-not-found",
      input,
      user
    );

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(1);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(1);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(0);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(0);
  });

  test("Novo dislike funciona", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: false,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike(
      "like-not-found",
      input,
      user
    );

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(1);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(1);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(0);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(0);
  });

  test("Remove like existente", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: true,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike("liked", input, user);

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(1);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(0);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(1);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(0);
  });

  test("Remove dislike existente", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: false,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike("disliked", input, user);

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(1);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(0);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(1);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(0);
  });

  test("Replace dislike by like", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: true,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike("disliked", input, user);

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(1);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(1);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(0);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(0);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(1);
  });

  test("Replace like by dislike", async () => {
    const input = LikeDeslikePostSchema.parse({
      like: false,
    });
    const user = createUser("22222222-2222-2222-2222-222222222222");

    const output = await postBussiness.likeDeslike("liked", input, user);

    expect(output).toBeUndefined();
    expect(spyIncreaseLikes).toHaveBeenCalledTimes(0);
    expect(spyIncreaseDislikes).toHaveBeenCalledTimes(1);
    expect(spyDecreaseLikes).toHaveBeenCalledTimes(1);
    expect(spyDecreaseDislikes).toHaveBeenCalledTimes(0);
    expect(spyUpdateAdd).toHaveBeenCalledTimes(0);
    expect(spyUpdateRemove).toHaveBeenCalledTimes(0);
    expect(spyUpdateReplace).toHaveBeenCalledTimes(1);
  });
});
