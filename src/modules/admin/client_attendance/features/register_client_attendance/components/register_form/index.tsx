import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  FormInput,
  FormTextarea,
  Input,
  Label,
} from "@/components/ui";
import { useDebounce } from "@/hooks";
import { cn } from "@/utilities";
import { Loader2, LogIn, RotateCcw, SearchIcon, Wifi } from "lucide-react";
import {
  registerAttendanceSchema,
  type RegisterAttendanceForm,
} from "../../../../schema";
import { searchClients } from "../../../../services";
import { useRegisterEntry } from "../../../../hooks";
import type { AttendanceSource, ClientSearchResult } from "../../../../types";

const pad = (n: number): string => String(n).padStart(2, "0");
const todayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const nowStr = (): string => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const buildDefaults = (): RegisterAttendanceForm => ({
  client_name: "",
  company: "",
  date: todayStr(),
  entry_time: nowStr(),
  limit_time: "",
  locker_ref: "",
  observations: "",
});

export const RegisterForm = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ClientSearchResult | null>(null);
  const [source, setSource] = useState<AttendanceSource>("contract");
  const debouncedQuery = useDebounce(query, 400);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterAttendanceForm>({
    resolver: zodResolver(registerAttendanceSchema),
    defaultValues: buildDefaults(),
  });

  const resetForm = () => {
    reset(buildDefaults());
    setQuery("");
    setSelected(null);
    setSource("contract");
  };

  const { registerEntry, isRegistering } = useRegisterEntry(resetForm);

  const { data: clients = [], isFetching } = useQuery({
    queryKey: ["client-attendance", "clients", debouncedQuery],
    queryFn: () => searchClients(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0 && !selected,
  });

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelected(null);
    setSource("contract");
  };

  const handleSelect = (client: ClientSearchResult) => {
    setSelected(client);
    setQuery(client.name);
    setSource(client.source);
    setValue("client_name", client.name, { shouldValidate: true });
    setValue("company", client.company ?? "");
    setValue("limit_time", client.limit_time ?? "");
  };

  const onSubmit = (form: RegisterAttendanceForm) => {
    registerEntry({
      user_id: selected?.user_id,
      client_name: form.client_name,
      company: form.company?.trim() ? form.company.trim() : null,
      date: form.date,
      entry_time: form.entry_time,
      limit_time: form.limit_time?.trim() ? form.limit_time : null,
      locker_ref: form.locker_ref?.trim() ? form.locker_ref.trim() : null,
      source,
      observations: form.observations?.trim() ? form.observations.trim() : null,
    });
  };

  const showResults = !selected && debouncedQuery.trim().length > 0;

  return (
    <section className="rounded-lg bg-stone-50 p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Buscar cliente (contrato o reserva activa) */}
        <div className="space-y-2">
          <Label htmlFor="client-search">
            Buscar cliente (contrato o reserva activa)
          </Label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              id="client-search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Nombre, empresa, DNI/RUC…"
              autoComplete="off"
              className="pl-9"
            />
            {showResults && (
              <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-md">
                {isFetching && (
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500">
                    <Loader2 className="size-4 animate-spin" /> Buscando…
                  </div>
                )}
                {!isFetching && clients.length === 0 && (
                  <p className="px-3 py-2 text-sm text-stone-500">
                    Sin resultados. Puedes registrar con los datos escritos abajo.
                  </p>
                )}
                {clients.map((client) => (
                  <button
                    key={client.user_id}
                    type="button"
                    onClick={() => handleSelect(client)}
                    className="flex w-full flex-col items-start px-3 py-2 text-left transition-colors hover:bg-stone-100"
                  >
                    <span className="text-sm font-medium text-stone-900">
                      {client.name}
                    </span>
                    <span className="text-xs text-stone-500">
                      {client.company ?? "Sin empresa"}
                      {client.document ? ` · ${client.document}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Nombre"
            name="client_name"
            register={register}
            errors={errors}
            placeholder="Nombre del cliente"
          />
          <FormInput
            label="Empresa"
            name="company"
            register={register}
            errors={errors}
            placeholder="Empresa"
          />
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <DatePicker
              id="date"
              value={watch("date")}
              onChange={(value) =>
                setValue("date", value, { shouldValidate: true })
              }
              error={!!errors.date}
            />
            {errors.date && (
              <p className="text-sm text-rose-800">{errors.date.message}</p>
            )}
          </div>

          {/* Hora de ingreso + EN VIVO */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="entry_time">Hora de ingreso</Label>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <Wifi className="size-3" /> EN VIVO
              </span>
            </div>
            <Input
              id="entry_time"
              type="time"
              {...register("entry_time")}
              className={cn(errors.entry_time && "border-rose-800")}
            />
            {errors.entry_time && (
              <p className="text-sm text-rose-800">{errors.entry_time.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit_time">Hora límite (auto)</Label>
            <Input id="limit_time" type="time" {...register("limit_time")} />
          </div>

          <FormInput
            label="Locker / N° (opcional)"
            name="locker_ref"
            register={register}
            errors={errors}
            placeholder="Ej: 5 o L-05 (1 a 49)"
          />
        </div>

        <FormTextarea
          label="Observaciones"
          name="observations"
          register={register}
          errors={errors}
          placeholder="Notas…"
        />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" disabled={isRegistering} className="sm:flex-1">
            <LogIn className="size-4" />
            {isRegistering ? "Registrando…" : "Registrar Ingreso"}
          </Button>
          <Button type="button" variant="outline" onClick={resetForm}>
            <RotateCcw className="size-4" />
            Limpiar
          </Button>
        </div>
      </form>
    </section>
  );
};
