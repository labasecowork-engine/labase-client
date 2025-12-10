import { z } from "zod";
import { createEmployeeSchema } from "../schema";

export type CreateEmployeeForm = z.infer<typeof createEmployeeSchema>;
