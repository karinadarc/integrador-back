import { LikeDislikeDbModel } from "../../src/models/LikeDislike";
import { PostDbModel, PostWithCreatorDbModel } from "../../src/models/Post";
import { BaseDatabaseMock } from "./BaseDatabaseMock";

export class PostDatabaseMock extends BaseDatabaseMock {
  public addPost = async (post: PostDbModel): Promise<string> => {
    return post.id;
  };

  public getAllPosts = async (): Promise<PostWithCreatorDbModel[]> => {
    return [
      {
        id: "a7102751-26c4-4606-bbf4-b4d97dae37c2",
        content: "content",
        likes: 0,
        dislikes: 0,
        created_at: "2024-02-12T01:03:03.080Z",
        updated_at: "2024-02-12T01:03:03.080Z",
        creator_id: "11111111-1111-1111-1111-111111111111",
        creator_name: "Fulano",
        comments: 0,
      },
    ];
  };

  public getPostByIdCompleto = async (
    id: string
  ): Promise<PostWithCreatorDbModel | undefined> => {
    if (id === "not-found") {
      return undefined;
    }
    return {
      id,
      content: "content",
      likes: 0,
      dislikes: 0,
      created_at: "2024-02-12T01:03:03.080Z",
      updated_at: "2024-02-12T01:03:03.080Z",
      creator_id: "11111111-1111-1111-1111-111111111111",
      creator_name: "Fulano",
      comments: 0,
    };
  };

  public getPostById = async (id: string): Promise<PostDbModel | undefined> => {
    if (id === "not-found") {
      return undefined;
    }
    return {
      id,
      content: "content",
      likes: 1,
      dislikes: 1,
      created_at: "2024-02-12T01:03:03.080Z",
      updated_at: "2024-02-12T01:03:03.080Z",
      creator_id: "11111111-1111-1111-1111-111111111111",
    };
  };

  public updatePost = async (post: PostDbModel): Promise<void> => {};

  public deletePost = async (post: PostDbModel): Promise<void> => {};

  public async getPostlikeDeslikeByUser(
    postId: string,
    userId: string
  ): Promise<LikeDislikeDbModel | undefined> {
    if (postId === "like-not-found") {
      return undefined;
    }
    return {
      user_id: "11111111-1111-1111-1111-111111111111",
      post_id: postId,
      like: Number(postId === "liked"),
    };
  }

  public async updatePostandAddLikeDislike(
    post: PostDbModel,
    likeDislike: LikeDislikeDbModel
  ): Promise<void> {}

  public async updatePostAndRemoveLikeDislike(
    post: PostDbModel,
    likeDislike: LikeDislikeDbModel
  ): Promise<void> {}

  public async updatePostAndReplaceLikeDislike(
    post: PostDbModel,
    newLikeDislike: LikeDislikeDbModel,
    oldLikeDislike: LikeDislikeDbModel
  ): Promise<void> {}
}
