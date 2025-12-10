import { z } from "zod";
import type { forgotPasswordSchema } from "../schemas";

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
