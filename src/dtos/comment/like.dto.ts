import { z } from "zod";

export interface LikeDeslikeCommentPostInputDTO {
  like: boolean;
}

export const LikeDeslikeCommentSchema = z
  .object({
    like: z.boolean(),
  })
  .transform((data) => data as LikeDeslikeCommentPostInputDTO);
