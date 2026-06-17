import { z } from "zod";

export const contractSchema = z
  .object({
    client_name: z.string().trim().min(1, "El cliente o empresa es requerido"),
    company: z.string().trim().optional(),
    responsible: z.string().trim().optional(),
    document: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    address: z.string().trim().optional(),
    follow_up: z.string().optional(),
    plan: z.string().trim().optional(),
    contract_type: z.string().optional(),
    space_name: z.string().trim().optional(),
    rent_reference_start: z.string().optional(),
    start_date: z.string().min(1, "El inicio del contrato es requerido"),
    end_date: z.string().min(1, "El término del contrato es requerido"),
    rent_amount: z.string().optional(),
    monthly_payment: z.string().optional(),
    invoice_number: z.string().trim().optional(),
    wifi: z.string().trim().optional(),
    locker_ref: z.string().trim().optional(),
    num_users: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.start_date || !data.end_date || data.end_date >= data.start_date,
    { message: "El término no puede ser anterior al inicio", path: ["end_date"] }
  );

export type ContractForm = z.infer<typeof contractSchema>;

export const paySchema = z.object({
  amount: z.string().min(1, "Ingresa un monto"),
  note: z.string().trim().optional(),
});

export type PayForm = z.infer<typeof paySchema>;
