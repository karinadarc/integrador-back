export interface CommentDbModel {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
}

export interface CommentDbModelComplete extends CommentDbModel {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  likes: number;
  dislikes: number;
  creator_name: string;
}

export interface CommentModel {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  likes: number;
  dislikes: number;
  creator_name?: string;
}

export class Comment {
  constructor(
    private id: string,
    private userId: string,
    private postId: string,
    private content: string,
    private createdAt: string,
    private likes: number,
    private dislikes: number,
    private creatorName: string | undefined
  ) {}

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getPostId(): string {
    return this.postId;
  }

  setPostId(id: string): void {
    this.postId = id;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  getLikes(): number {
    return this.likes;
  }

  setLikes(likes: number): void {
    this.likes = likes;
  }

  getDislikes(): number {
    return this.dislikes;
  }

  setDislikes(dislikes: number): void {
    this.dislikes = dislikes;
  }

  public getCreatorName(): string | undefined {
    return this.creatorName;
  }

  public setCreatorName(name: string): void {
    this.creatorName = name;
  }

  toInsertDatabaseModel(): CommentDbModel {
    return {
      id: this.getId(),
      user_id: this.getUserId(),
      post_id: this.getPostId(),
      content: this.getContent(),
      created_at: this.getCreatedAt(),
    };
  }

  toBusinessModel(): CommentModel {
    return {
      id: this.getId(),
      user_id: this.getUserId(),
      post_id: this.getPostId(),
      content: this.getContent(),
      created_at: this.getCreatedAt(),
      likes: this.getLikes(),
      dislikes: this.getDislikes(),
      creator_name: this.getCreatorName(),
    };
  }

  static fromDatabaseModel(comment: CommentDbModelComplete): Comment {
    return new Comment(
      comment.id,
      comment.user_id,
      comment.post_id,
      comment.content,
      comment.created_at,
      comment.likes,
      comment.dislikes,
      comment.creator_name
    );
  }
}
