import { z } from "zod";
import { EditReminderSchema } from "../schemas";

export type EditReminderFormData = z.infer<typeof EditReminderSchema>;
