import { z } from "zod";
import { CreateReminderSchema } from "../schemas";

export type CreateReminderFormData = z.infer<typeof CreateReminderSchema>;
