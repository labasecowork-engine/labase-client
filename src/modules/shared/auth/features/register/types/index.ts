import { z } from "zod";
import type { registerSchema } from "../schemas";

export type RegisterData = z.infer<typeof registerSchema>;
