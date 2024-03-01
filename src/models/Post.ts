export interface PostDbModel {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface PostWithCreatorDbModel extends PostDbModel {
  creator_name: string;
  comments: Number;
}

export interface PostModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  comments: Number;
  creator: {
    creatorId: string;
    creatorName?: string;
  };
}

export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorName?: string | undefined,
    private comments?: Number | undefined
  ) {}

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getCreatorId(): string {
    return this.creatorId;
  }

  setCreatorId(creatorId: string): void {
    this.creatorId = creatorId;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }

  getLikes(): number {
    return this.likes;
  }

  setLikes(likes: number): void {
    this.likes = likes;
  }

  increaseLikes(): void {
    this.setLikes(this.getLikes() + 1);
  }

  decreaseLikes(): void {
    if (this.getLikes() <= 0) {
      throw new Error("Não é possível ter likes negativos");
    }
    this.setLikes(this.getLikes() - 1);
  }

  getDislikes(): number {
    return this.dislikes;
  }

  setDislikes(dislikes: number): void {
    this.dislikes = dislikes;
  }

  increaseDislikes(): void {
    this.setDislikes(this.getDislikes() + 1);
  }

  decreaseDislikes(): void {
    if (this.getDislikes() <= 0) {
      throw new Error("Não é possível ter Dislikes negativos");
    }
    this.setDislikes(this.getDislikes() - 1);
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  setCreatedAt(createdAt: string): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: string): void {
    this.updatedAt = updatedAt;
  }

  public getCreatorName(): string | undefined {
    return this.creatorName;
  }

  public setCreatorName(name: string): void {
    this.creatorName = name;
  }

  public getComments(): Number {
    return this.comments || 0;
  }

  public setComments(total: Number) {
    this.comments = total;
  }

  toDatabaseModel(): PostDbModel {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  public static fromDatabaseModel(
    model: PostDbModel | PostWithCreatorDbModel
  ): Post {
    const post = new Post(
      model.id,
      model.creator_id,
      model.content,
      model.likes,
      model.dislikes,
      model.created_at,
      model.updated_at
    );

    if ("creator_name" in model) {
      post.setCreatorName(model.creator_name);
    }

    if ("comments" in model) {
      post.setComments(model.comments);
    }

    return post;
  }

  public toBusinessModel(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      comments: this.comments || 0,
      creator: {
        creatorId: this.creatorId,
        creatorName: this.creatorName,
      },
    };
  }
}
