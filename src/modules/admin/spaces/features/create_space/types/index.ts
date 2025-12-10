import { z } from "zod";
import type { createSpaceSchema } from "../schemas";

export type CreateSpaceData = z.infer<typeof createSpaceSchema>;
