export interface LikeDislikeCommentDbModel {
  user_id: string;
  comment_id: string;
  like: number;
}

export class LikeDeslikeComment {
  constructor(
    private readonly userId: string,
    private readonly commentId: string,
    private readonly like: boolean
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getCommentId(): string {
    return this.commentId;
  }

  getLike(): boolean {
    return this.like;
  }

  toDatabaseModel(): LikeDislikeCommentDbModel {
    return {
      user_id: this.userId,
      comment_id: this.commentId,
      like: this.like ? 1 : 0,
    };
  }

  static fromDatabaseModel(
    data: LikeDislikeCommentDbModel
  ): LikeDeslikeComment {
    return new LikeDeslikeComment(
      data.user_id,
      data.comment_id,
      data.like === 1 ? true : false
    );
  }
}
