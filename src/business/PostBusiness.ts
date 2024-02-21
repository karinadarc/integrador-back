import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/create.dto";
import { GetPostsOutputDTO } from "../dtos/post/get.dto";
import { Post } from "../models/Post";
import { UserModel } from "../models/User";
import { IdService } from "../services/IdService";

export class PostBussiness {
  constructor(
    private postDatabase: PostDatabase,
    private idService: IdService
  ) {}

  public createPost = async (
    input: CreatePostInputDTO,
    user: UserModel
  ): Promise<CreatePostOutputDTO> => {
    const now = new Date().toISOString();
    const post = new Post(
      this.idService.newId(),
      user.id,
      input.content,
      0,
      0,
      now,
      now
    );

    const id = await this.postDatabase.addPost(post.toDatabaseModel());
    return { id };
  };

  public getPosts = async (user: UserModel): Promise<GetPostsOutputDTO> => {
    const result = await this.postDatabase.getAllPosts();

    return result.map((post) => Post.fromDatabaseModel(post).toBusinessModel());
  };
}
