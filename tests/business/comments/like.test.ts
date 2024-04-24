import { CommentBussiness } from "../../../src/business/CommentBussiness";
import { LikeDeslikeCommentSchema } from "../../../src/dtos/comment/like.dto";
import { NotFoundError } from "../../../src/errors";
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock";
import { IdServiceMock } from "../../mocks/IdServiceMock";
import { PostDatabaseMock } from "../../mocks/PostDabataseMock";
import { createUser } from "../../utils";
describe("Testando like e dislike de comentarios", () => {
  const commentDatabase = new CommentDatabaseMock();

  const spyGetComment = jest.spyOn(
    commentDatabase,
    "getCommentlikeDeslikeByUser"
  );
  const spyAddLikeDislike = jest.spyOn(commentDatabase, "addLikeDislike");
  const spyRemoveLikeDislike = jest.spyOn(commentDatabase, "removeLikeDislike");
  const spyInvertLikeDislike = jest.spyOn(commentDatabase, "invertLikeDislike");

  const commentBussiness = new CommentBussiness(
    commentDatabase,
    new PostDatabaseMock(),
    new IdServiceMock()
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Curtir Comentario inexistente gera erro", async () => {
    const input = LikeDeslikeCommentSchema.parse({
      like: true,
    });

    const user = createUser();

    await expect(
      commentBussiness.likeDeslike("not-found", input, user)
    ).rejects.toThrow(NotFoundError);

    expect(spyGetComment).toHaveBeenCalledTimes(0);
    expect(spyAddLikeDislike).toHaveBeenCalledTimes(0);
    expect(spyRemoveLikeDislike).toHaveBeenCalledTimes(0);
    expect(spyInvertLikeDislike).toHaveBeenCalledTimes(0);
  });

  it.each([true, false])(
    "Novo like dislike quando like = %s",
    async (isLike: boolean) => {
      const userId = "88888888-8888-8888-8888-888888888888";
      const commentId = "like-not-found";
      const input = LikeDeslikeCommentSchema.parse({
        like: isLike,
      });
      const user = createUser(userId);
      const likeDeslike = {
        user_id: userId,
        comment_id: commentId,
        like: isLike ? 1 : 0,
      };

      const output = await commentBussiness.likeDeslike(commentId, input, user);

      expect(output).toBeUndefined();
      expect(spyGetComment).toHaveBeenCalledTimes(1);
      expect(spyGetComment).toHaveBeenCalledWith(commentId, userId);
      expect(spyAddLikeDislike).toHaveBeenCalledTimes(1);
      expect(spyAddLikeDislike).toHaveBeenCalledWith(likeDeslike);
      expect(spyRemoveLikeDislike).toHaveBeenCalledTimes(0);
      expect(spyInvertLikeDislike).toHaveBeenCalledTimes(0);
    }
  );

  it.each([true, false])(
    "Remove like/dislike quando like = %s",
    async (isLike: boolean) => {
      const userId = "88888888-8888-8888-8888-888888888888";
      const commentId = isLike ? "liked" : "notLiked";
      const input = LikeDeslikeCommentSchema.parse({
        like: isLike,
      });
      const user = createUser(userId);
      const likeDeslike = {
        user_id: userId,
        comment_id: commentId,
        like: isLike ? 1 : 0,
      };

      const output = await commentBussiness.likeDeslike(commentId, input, user);

      expect(output).toBeUndefined();
      expect(spyGetComment).toHaveBeenCalledTimes(1);
      expect(spyGetComment).toHaveBeenCalledWith(commentId, userId);
      expect(spyAddLikeDislike).toHaveBeenCalledTimes(0);
      expect(spyRemoveLikeDislike).toHaveBeenCalledTimes(1);
      expect(spyRemoveLikeDislike).toHaveBeenCalledWith(likeDeslike);
      expect(spyInvertLikeDislike).toHaveBeenCalledTimes(0);
    }
  );

  it.each([true, false])(
    "Invert like/dislike quando like = %s",
    async (isLike: boolean) => {
      const userId = "88888888-8888-8888-8888-888888888888";
      const commentId = isLike ? "Notliked" : "liked";
      const input = LikeDeslikeCommentSchema.parse({
        like: isLike,
      });
      const user = createUser(userId);
      const oldLikeDislike = {
        user_id: userId,
        comment_id: commentId,
        like: isLike ? 0 : 1,
      };
      const newLikeDislike = {
        ...oldLikeDislike,
        like: isLike ? 1 : 0,
      };

      const output = await commentBussiness.likeDeslike(commentId, input, user);

      expect(output).toBeUndefined();
      expect(spyGetComment).toHaveBeenCalledTimes(1);
      expect(spyGetComment).toHaveBeenCalledWith(commentId, userId);
      expect(spyAddLikeDislike).toHaveBeenCalledTimes(0);
      expect(spyRemoveLikeDislike).toHaveBeenCalledTimes(0);
      expect(spyInvertLikeDislike).toHaveBeenCalledTimes(1);
      expect(spyInvertLikeDislike).toHaveBeenCalledWith(
        oldLikeDislike,
        newLikeDislike
      );
    }
  );
});
