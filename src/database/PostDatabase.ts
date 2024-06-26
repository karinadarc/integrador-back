import { LikeDislikeDbModel } from "../models/LikeDislike";
import { PostDbModel, PostWithCreatorDbModel } from "../models/Post";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {
  public addPost = async (post: PostDbModel): Promise<string> => {
    const [result] = await BaseDatabase.connection
      .insert(post)
      .into(this.TABLE_POSTS)
      .returning("id");

    return result.id as string;
  };

  public getPostById = async (id: string): Promise<PostDbModel | undefined> => {
    return await BaseDatabase.connection
      .select()
      .from<PostDbModel>(this.TABLE_POSTS)
      .where({ id })
      .first();
  };

  public getPostByIdCompleto = async (
    id: string
  ): Promise<PostWithCreatorDbModel | undefined> => {
    const result: PostWithCreatorDbModel = await BaseDatabase.connection
      .select(
        `${this.TABLE_POSTS}.id`,
        `${this.TABLE_POSTS}.creator_id`,
        `${this.TABLE_POSTS}.content`,
        `${this.TABLE_POSTS}.likes`,
        `${this.TABLE_POSTS}.dislikes`,
        `${this.TABLE_POSTS}.created_at`,
        `${this.TABLE_POSTS}.updated_at`,
        `${this.TABLE_USERS}.apelido AS creator_name`,
        BaseDatabase.connection(this.TABLE_COMMENTS)
          .count("*")
          .whereRaw("?? = ??", [
            `${this.TABLE_COMMENTS}.post_id`,
            `${this.TABLE_POSTS}.id`,
          ])
          .as("comments")
      )
      .from<PostWithCreatorDbModel>(this.TABLE_POSTS)
      .join(
        this.TABLE_USERS,
        `${this.TABLE_POSTS}.creator_id`,
        "=",
        `${this.TABLE_USERS}.id`
      )
      .where(`${this.TABLE_POSTS}.id`, id)
      .first();

    return result;
  };

  public getAllPosts = async (): Promise<PostWithCreatorDbModel[]> => {
    const result: PostWithCreatorDbModel[] = await BaseDatabase.connection
      .select(
        `${this.TABLE_POSTS}.id`,
        `${this.TABLE_POSTS}.creator_id`,
        `${this.TABLE_POSTS}.content`,
        `${this.TABLE_POSTS}.likes`,
        `${this.TABLE_POSTS}.dislikes`,
        `${this.TABLE_POSTS}.created_at`,
        `${this.TABLE_POSTS}.updated_at`,
        `${this.TABLE_USERS}.apelido AS creator_name`,
        BaseDatabase.connection(this.TABLE_COMMENTS)
          .count("*")
          .whereRaw("?? = ??", [
            `${this.TABLE_COMMENTS}.post_id`,
            `${this.TABLE_POSTS}.id`,
          ])
          .as("comments")
      )
      .from<PostWithCreatorDbModel>(this.TABLE_POSTS)
      .join(
        this.TABLE_USERS,
        `${this.TABLE_POSTS}.creator_id`,
        "=",
        `${this.TABLE_USERS}.id`
      )
      .orderBy(`${this.TABLE_POSTS}.created_at`, "desc");

    return result;
  };

  public updatePost = async (post: PostDbModel): Promise<void> => {
    await BaseDatabase.connection
      .update(post)
      .into(this.TABLE_POSTS)
      .where("id", post.id);
  };

  public deletePost = async (post: PostDbModel): Promise<void> => {
    await BaseDatabase.connection
      .delete()
      .from(this.TABLE_POSTS)
      .where("id", post.id);
  };

  public async getPostlikeDeslikeByUser(
    postId: string,
    userId: string
  ): Promise<LikeDislikeDbModel | undefined> {
    return await BaseDatabase.connection
      .select()
      .from<LikeDislikeDbModel>(this.TABLE_LIKES_DISLIKES)
      .where({
        post_id: postId,
        user_id: userId,
      })
      .first();
  }

  public async updatePostandAddLikeDislike(
    post: PostDbModel,
    likeDislike: LikeDislikeDbModel
  ): Promise<void> {
    await BaseDatabase.connection.transaction(async (transaction) => {
      await transaction.insert(likeDislike).into(this.TABLE_LIKES_DISLIKES);

      await transaction
        .update(post)
        .into(this.TABLE_POSTS)
        .where("id", post.id);
    });
  }

  public async updatePostAndRemoveLikeDislike(
    post: PostDbModel,
    likeDislike: LikeDislikeDbModel
  ): Promise<void> {
    await BaseDatabase.connection.transaction(async (transaction) => {
      await transaction
        .delete()
        .from(this.TABLE_LIKES_DISLIKES)
        .where(likeDislike);

      await transaction
        .update(post)
        .into(this.TABLE_POSTS)
        .where("id", post.id);
    });
  }

  public async updatePostAndReplaceLikeDislike(
    post: PostDbModel,
    newLikeDislike: LikeDislikeDbModel,
    oldLikeDislike: LikeDislikeDbModel
  ): Promise<void> {
    await BaseDatabase.connection.transaction(async (transaction) => {
      await transaction
        .delete()
        .from(this.TABLE_LIKES_DISLIKES)
        .where(oldLikeDislike);

      await transaction.insert(newLikeDislike).into(this.TABLE_LIKES_DISLIKES);

      await transaction
        .update(post)
        .into(this.TABLE_POSTS)
        .where("id", post.id);
    });
  }
}
