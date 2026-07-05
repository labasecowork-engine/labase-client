import { useEffect, useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useDebounce } from "@/hooks";
import { cn } from "@/utilities";
import { CarFront, Loader2, RotateCcw, SearchIcon, Zap } from "lucide-react";
import { registerEntrySchema, type RegisterEntryForm } from "../../schema";
import { searchPeople } from "../../../../services";
import { useRegisterEntry } from "../../../../hooks";
import type { ParkingPerson, ParkingSpace } from "../../../../types";

interface Props {
  freeSpaces: ParkingSpace[];
  preselectedSpaceId?: string;
  onReset?: () => void;
}

const pad = (n: number): string => String(n).padStart(2, "0");
const todayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const nowStr = (): string => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const buildDefaults = (spaceId?: string): RegisterEntryForm => ({
  client_name: "",
  company: "",
  plate: "",
  space_id: spaceId ?? "",
  date: todayStr(),
  entry_time: nowStr(),
  observations: "",
});

export const RegisterForm = ({
  freeSpaces,
  preselectedSpaceId,
  onReset,
}: Props) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<ParkingPerson | null>(null);
  const debouncedQuery = useDebounce(query, 400);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterEntryForm>({
    resolver: zodResolver(registerEntrySchema),
    defaultValues: buildDefaults(preselectedSpaceId),
  });

  const resetForm = () => {
    reset(buildDefaults());
    setQuery("");
    setSelectedPerson(null);
    onReset?.();
  };

  const { registerEntry, isRegistering } = useRegisterEntry(resetForm);

  const { data: people = [], isFetching } = useQuery({
    queryKey: ["parking", "people", debouncedQuery],
    queryFn: () => searchPeople(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0 && !selectedPerson,
  });

  // Preselecciona el espacio al hacer clic en el panel.
  useEffect(() => {
    if (preselectedSpaceId) {
      setValue("space_id", preselectedSpaceId, { shouldValidate: true });
    }
  }, [preselectedSpaceId, setValue]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedPerson(null);
    setValue("client_name", value, { shouldValidate: true });
    setValue("company", "");
  };

  const handleSelectPerson = (person: ParkingPerson) => {
    setSelectedPerson(person);
    setQuery(person.name);
    setValue("client_name", person.name, { shouldValidate: true });
    setValue("company", person.company ?? "");
  };

  const onSubmit = (form: RegisterEntryForm) => {
    registerEntry({
      user_id: selectedPerson?.id,
      client_name: form.client_name,
      company: form.company?.trim() ? form.company.trim() : null,
      plate: form.plate.trim().toUpperCase(),
      space_id: form.space_id,
      date: form.date,
      entry_time: form.entry_time,
      observations: form.observations?.trim() ? form.observations.trim() : null,
    });
  };

  const spaceId = watch("space_id");
  const dateValue = watch("date");
  const showResults = !selectedPerson && debouncedQuery.trim().length > 0;

  return (
    <section className="rounded-lg bg-stone-50 p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Fecha con Calendar de shadcn */}
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <DatePicker
              id="date"
              value={dateValue}
              onChange={(value) =>
                setValue("date", value, { shouldValidate: true })
              }
              error={!!errors.date}
            />
            {errors.date && (
              <p className="text-sm text-rose-800">{errors.date.message}</p>
            )}
          </div>

          {/* Cliente con autocompletado */}
          <div className="space-y-2">
            <Label htmlFor="client-search">Cliente</Label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <Input
                id="client-search"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Nombre del cliente…"
                autoComplete="off"
                className={cn("pl-9", errors.client_name && "border-rose-800")}
              />
              {showResults && (
                <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-md">
                  {isFetching && (
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500">
                      <Loader2 className="size-4 animate-spin" /> Buscando…
                    </div>
                  )}
                  {!isFetching && people.length === 0 && (
                    <p className="px-3 py-2 text-sm text-stone-500">
                      Sin resultados. Puedes registrar con el nombre escrito.
                    </p>
                  )}
                  {people.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => handleSelectPerson(person)}
                      className="flex w-full flex-col items-start px-3 py-2 text-left transition-colors hover:bg-stone-100"
                    >
                      <span className="text-sm font-medium text-stone-900">
                        {person.name}
                      </span>
                      <span className="text-xs text-stone-500">
                        {person.document ?? "Sin documento"}
                        {person.company ? ` · ${person.company}` : ""}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.client_name && (
              <p className="text-sm text-rose-800">{errors.client_name.message}</p>
            )}
          </div>

          <FormInput
            label="N° de placa"
            name="plate"
            register={register}
            errors={errors}
            placeholder="Ej. ABC-123"
            className="uppercase"
          />

          {/* Espacio */}
          <div className="space-y-2">
            <Label htmlFor="space-select">Espacio</Label>
            <Select
              value={spaceId || undefined}
              onValueChange={(value) =>
                setValue("space_id", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                id="space-select"
                className={cn("w-full", errors.space_id && "border-rose-800")}
              >
                <SelectValue placeholder="Seleccionar espacio" />
              </SelectTrigger>
              <SelectContent>
                {freeSpaces.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    {space.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.space_id && (
              <p className="text-sm text-rose-800">{errors.space_id.message}</p>
            )}
          </div>

          {/* Hora de ingreso + AUTO */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="entry_time">Hora de ingreso</Label>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <Zap className="size-3" /> AUTO
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
            <CarFront className="size-4" />
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
