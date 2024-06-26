export interface LikeDislikeDbModel {
  user_id: string;
  post_id: string;
  like: number;
}

export class LikeDeslike {
  constructor(
    private readonly userId: string,
    private readonly postId: string,
    private readonly like: boolean
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getPostId(): string {
    return this.postId;
  }

  getLike(): boolean {
    return this.like;
  }

  toDatabaseModel(): LikeDislikeDbModel {
    return {
      user_id: this.userId,
      post_id: this.postId,
      like: this.like ? 1 : 0,
    };
  }

  static fromDatabaseModel(data: LikeDislikeDbModel): LikeDeslike {
    return new LikeDeslike(
      data.user_id,
      data.post_id,
      data.like === 1 ? true : false
    );
  }
}
