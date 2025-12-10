import type { createCompanySchema, createWorkAreaSchema } from "../schema";
import type { z } from "zod";

export type CreateCompanyForm = z.infer<typeof createCompanySchema>;
export type CreateWorkAreaForm = z.infer<typeof createWorkAreaSchema>;

