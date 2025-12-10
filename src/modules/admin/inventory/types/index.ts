import type { createBrandSchema } from "../schema";
import type { z } from "zod";

export type CreateBrandForm = z.infer<typeof createBrandSchema>;
