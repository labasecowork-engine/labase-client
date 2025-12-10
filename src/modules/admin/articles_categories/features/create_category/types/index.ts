import { z } from "zod";
import type { createCategorySchema } from "../schemas";
import type { ArticleCategory } from "../../../types";

export type CreateCategoryData = z.infer<typeof createCategorySchema>;

export interface CreateCategoryApiPayload {
  name: string;
  description: string;
}

export interface CreateCategoryResponse {
  category: ArticleCategory;
}
