import { z } from "zod";
import { editEmployeeSchema } from "../schema";

export type EditEmployeeForm = z.infer<typeof editEmployeeSchema>;

