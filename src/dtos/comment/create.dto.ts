import z from "zod";

export interface CreateCommentInputDTO {
  content: string;
}

export interface CreateCommentOutputDTO {
  id: string;
}

export const CreateCommentSchema = z
  .object({
    content: z.string().min(8),
  })
  .transform((data) => data as CreateCommentInputDTO);
