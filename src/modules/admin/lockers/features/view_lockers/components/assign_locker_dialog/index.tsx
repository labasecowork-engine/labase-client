import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormInput,
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
import { Loader2, SearchIcon, X } from "lucide-react";
import { deliverKeySchema, type DeliverKeyForm } from "../../schema";
import { searchPeople } from "../../services";
import { useDeliverKey } from "../../hooks";
import { DeliveryTypeToggle } from "../delivery_type_toggle";
import type { Locker, LockerPerson } from "../../../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  freeLockers: Locker[];
  preselectedLocker: number | null;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export const AssignLockerDialog = ({
  open,
  onOpenChange,
  freeLockers,
  preselectedLocker,
}: Props) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<LockerPerson | null>(
    null
  );
  const debouncedQuery = useDebounce(query, 400);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DeliverKeyForm>({
    resolver: zodResolver(deliverKeySchema),
    defaultValues: { is_vip: false },
  });

  const { deliver, isDelivering } = useDeliverKey(() => onOpenChange(false));

  const { data: people = [], isFetching } = useQuery({
    queryKey: ["lockers", "people", debouncedQuery],
    queryFn: () => searchPeople(debouncedQuery),
    enabled: open && debouncedQuery.trim().length > 0 && !selectedPerson,
  });

  // Reinicia el formulario cada vez que se abre el diálogo, respetando el
  // locker preseleccionado al hacer clic en el mapa.
  useEffect(() => {
    if (open) {
      reset({
        person_name: "",
        document: "",
        company: "",
        locker_number: preselectedLocker ?? undefined,
        is_vip: false,
        observations: "",
      });
      setQuery("");
      setSelectedPerson(null);
    }
  }, [open, preselectedLocker, reset]);

  const handleSelectPerson = (person: LockerPerson) => {
    setSelectedPerson(person);
    setValue("person_name", person.name, { shouldValidate: true });
    setValue("document", person.document ?? "");
    setValue("company", person.company ?? "");
  };

  const handleClearPerson = () => {
    setSelectedPerson(null);
    setQuery("");
    setValue("person_name", "");
    setValue("document", "");
    setValue("company", "");
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedPerson(null);
    setValue("person_name", value, { shouldValidate: true });
  };

  const onSubmit = (form: DeliverKeyForm) => {
    deliver({
      locker_number: form.locker_number,
      user_id: selectedPerson?.id,
      person_name: form.person_name,
      document: form.document?.trim() ? form.document.trim() : null,
      company: form.company?.trim() ? form.company.trim() : null,
      is_vip: form.is_vip,
      observations: form.observations?.trim() ? form.observations.trim() : null,
    });
  };

  const lockerNumber = watch("locker_number");
  const isVip = watch("is_vip");
  const showResults = !selectedPerson && debouncedQuery.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Entregar llave</DialogTitle>
          <DialogDescription>
            Busca a la persona, asigna un locker disponible y registra la
            entrega.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Persona: tarjeta cuando ya está seleccionada, búsqueda si no */}
          <div className="space-y-2">
            <Label htmlFor="person-search">Persona</Label>

            {selectedPerson ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                    {getInitials(selectedPerson.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {selectedPerson.name}
                    </p>
                    <p className="truncate text-xs text-stone-500">
                      {selectedPerson.document ?? "Sin documento"}
                      {selectedPerson.company
                        ? ` · ${selectedPerson.company}`
                        : ""}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClearPerson}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                  aria-label="Cambiar persona"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <Input
                  id="person-search"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Ej. Juan Pérez, DNI o empresa…"
                  autoComplete="off"
                  className={cn("pl-9", errors.person_name && "border-rose-800")}
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
                        Sin resultados. Puedes registrar la entrega con el nombre
                        escrito.
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
            )}
            {errors.person_name && (
              <p className="text-sm text-rose-800">
                {errors.person_name.message}
              </p>
            )}
          </div>

          {/* Datos manuales solo cuando la persona no viene de la búsqueda */}
          {!selectedPerson && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="DNI / Celular"
                name="document"
                register={register}
                errors={errors}
                placeholder="Opcional"
              />
              <FormInput
                label="Empresa"
                name="company"
                register={register}
                errors={errors}
                placeholder="Opcional"
              />
            </div>
          )}

          {/* Locker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="locker-select">Locker</Label>
              <span className="text-xs text-stone-500">
                {freeLockers.length} disponibles
              </span>
            </div>
            <Select
              value={lockerNumber ? String(lockerNumber) : undefined}
              onValueChange={(value) =>
                setValue("locker_number", Number(value), {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="locker-select"
                className={cn(
                  "w-full",
                  errors.locker_number && "border-rose-800"
                )}
              >
                <SelectValue placeholder="Selecciona un locker" />
              </SelectTrigger>
              <SelectContent>
                {freeLockers.map((locker) => (
                  <SelectItem key={locker.id} value={String(locker.number)}>
                    Locker #{locker.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.locker_number && (
              <p className="text-sm text-rose-800">
                {errors.locker_number.message}
              </p>
            )}
          </div>

          <DeliveryTypeToggle
            isVip={isVip}
            onChange={(checked) => setValue("is_vip", checked)}
          />

          <FormInput
            label="Observaciones"
            name="observations"
            register={register}
            errors={errors}
            placeholder="Opcional"
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isDelivering}>
              {isDelivering ? "Entregando…" : "Entregar llave"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
