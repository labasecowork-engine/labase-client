import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormInput,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/utilities";
import { RotateCcw, Save } from "lucide-react";
import { contractSchema, type ContractForm as ContractFormValues } from "../../schema";
import {
  CONTRACT_TYPE_OPTIONS,
  FOLLOW_UP_OPTIONS,
  todayStr,
} from "../../constants";
import { useCreateContract, useUpdateContract } from "../../hooks";
import type { Contract, ContractInput } from "../../types";

interface Props {
  planSuggestions: string[];
  initialContract?: Contract | null;
  onSuccess?: () => void;
}

const buildDefaults = (contract?: Contract | null): ContractFormValues =>
  contract
    ? {
        client_name: contract.client_name,
        company: contract.company ?? "",
        responsible: contract.responsible ?? "",
        document: contract.document ?? "",
        phone: contract.phone ?? "",
        address: contract.address ?? "",
        follow_up: contract.follow_up ?? "",
        plan: contract.plan ?? "",
        contract_type: contract.contract_type ?? "",
        space_name: contract.space_name ?? "",
        rent_reference_start: contract.rent_reference_start ?? "",
        start_date: contract.start_date,
        end_date: contract.end_date,
        rent_amount: String(contract.rent_amount),
        monthly_payment:
          contract.monthly_payment != null ? String(contract.monthly_payment) : "",
        invoice_number: contract.invoice_number ?? "",
        wifi: contract.wifi ?? "",
        locker_ref: contract.locker_ref ?? "",
        num_users: contract.num_users != null ? String(contract.num_users) : "",
      }
    : {
        client_name: "",
        company: "",
        responsible: "",
        document: "",
        phone: "",
        address: "",
        follow_up: "",
        plan: "",
        contract_type: "",
        space_name: "",
        rent_reference_start: "",
        start_date: todayStr(),
        end_date: "",
        rent_amount: "",
        monthly_payment: "",
        invoice_number: "",
        wifi: "",
        locker_ref: "",
        num_users: "",
      };

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
    {children}
  </h3>
);

export const ContractForm = ({
  planSuggestions,
  initialContract,
  onSuccess,
}: Props) => {
  const isEdit = !!initialContract;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: buildDefaults(initialContract),
  });

  const resetForm = () => reset(buildDefaults());

  const { createContract, isCreating } = useCreateContract(() => {
    resetForm();
    onSuccess?.();
  });
  const { updateContract, isUpdating } = useUpdateContract(() => onSuccess?.());
  const isPending = isCreating || isUpdating;

  const onSubmit = (form: ContractFormValues) => {
    const input: ContractInput = {
      client_name: form.client_name,
      company: form.company?.trim() || null,
      responsible: form.responsible?.trim() || null,
      document: form.document?.trim() || null,
      phone: form.phone?.trim() || null,
      address: form.address?.trim() || null,
      follow_up: form.follow_up || null,
      plan: form.plan?.trim() || null,
      contract_type: form.contract_type || null,
      space_name: form.space_name?.trim() || null,
      rent_reference_start: form.rent_reference_start || null,
      start_date: form.start_date,
      end_date: form.end_date,
      rent_amount: Number(form.rent_amount) || 0,
      monthly_payment: form.monthly_payment ? Number(form.monthly_payment) : null,
      invoice_number: form.invoice_number?.trim() || null,
      wifi: form.wifi?.trim() || null,
      locker_ref: form.locker_ref?.trim() || null,
      num_users: form.num_users ? Number(form.num_users) : null,
    };
    if (initialContract) updateContract({ id: initialContract.id, input });
    else createContract(input);
  };

  const followUp = watch("follow_up");
  const contractType = watch("contract_type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Datos del cliente */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Datos del cliente</SectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Cliente / Empresa"
            name="client_name"
            register={register}
            errors={errors}
            placeholder="Nombre del cliente o empresa"
          />
          <FormInput
            label="Responsable"
            name="responsible"
            register={register}
            errors={errors}
            placeholder="Nombre del responsable"
          />
          <FormInput
            label="DNI o RUC"
            name="document"
            register={register}
            errors={errors}
            placeholder="DNI (8) o RUC (11)"
          />
          <FormInput
            label="Celular"
            name="phone"
            register={register}
            errors={errors}
            placeholder="9 dígitos"
          />
          <FormInput
            label="Dirección"
            name="address"
            register={register}
            errors={errors}
            placeholder="Dirección completa"
          />
          <div className="space-y-2">
            <Label htmlFor="follow_up">Seguimiento</Label>
            <Select
              value={followUp || undefined}
              onValueChange={(value) => setValue("follow_up", value)}
            >
              <SelectTrigger id="follow_up" className="w-full">
                <SelectValue placeholder="— Seleccionar —" />
              </SelectTrigger>
              <SelectContent>
                {FOLLOW_UP_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Datos del contrato */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Datos del contrato</SectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Plan con autocomplete */}
          <div className="space-y-2">
            <Label htmlFor="plan">Plan</Label>
            <Input
              id="plan"
              list="contract-plan-options"
              {...register("plan")}
              placeholder="Ej: Mensual Flexible, Premium…"
            />
            <datalist id="contract-plan-options">
              {planSuggestions.map((plan) => (
                <option key={plan} value={plan} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract_type">Tipo de contrato</Label>
            <Select
              value={contractType || undefined}
              onValueChange={(value) => setValue("contract_type", value)}
            >
              <SelectTrigger id="contract_type" className="w-full">
                <SelectValue placeholder="— Seleccionar —" />
              </SelectTrigger>
              <SelectContent>
                {CONTRACT_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormInput
            label="Inicio de referencia de renta"
            name="rent_reference_start"
            type="date"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Inicio del contrato"
            name="start_date"
            type="date"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Término del contrato"
            name="end_date"
            type="date"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Monto de la renta (S/.)"
            name="rent_amount"
            type="number"
            register={register}
            errors={errors}
            placeholder="0.00"
          />
          <FormInput
            label="Pago mensual (S/.)"
            name="monthly_payment"
            type="number"
            register={register}
            errors={errors}
            placeholder="0.00"
          />
          <FormInput
            label="Empresa (badge)"
            name="company"
            register={register}
            errors={errors}
            placeholder="Vacío = Persona Natural"
          />
          <FormInput
            label="N° de factura"
            name="invoice_number"
            register={register}
            errors={errors}
            placeholder="Número de factura"
          />
          <FormInput
            label="WiFi"
            name="wifi"
            register={register}
            errors={errors}
            placeholder="Nombre de red WiFi"
          />
          <FormInput
            label="Locker asignado"
            name="locker_ref"
            register={register}
            errors={errors}
            placeholder="Ej: L-01"
          />
          <FormInput
            label="Número de usuarios"
            name="num_users"
            type="number"
            register={register}
            errors={errors}
            placeholder="Ej: 3"
          />
          <FormInput
            label="Espacio"
            name="space_name"
            register={register}
            errors={errors}
            placeholder="Ej: Base Operativa"
          />
        </div>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" disabled={isPending} className="sm:flex-1">
          <Save className="size-4" />
          {isPending
            ? "Guardando…"
            : isEdit
              ? "Guardar cambios"
              : "Guardar contrato"}
        </Button>
        {!isEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className={cn(isPending && "pointer-events-none opacity-50")}
          >
            <RotateCcw className="size-4" />
            Limpiar
          </Button>
        )}
      </div>
    </form>
  );
};
