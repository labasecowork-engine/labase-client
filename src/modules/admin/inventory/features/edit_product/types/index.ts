import { z } from "zod";
import { editProductSchema } from "../schema";

export type EditProductFormData = z.infer<typeof editProductSchema>;
