import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldErrors,
  type FieldError,
} from "react-hook-form";
import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui";

interface Option {
  id: string;
  name: string;
}

interface IconButtonProps {
  onClick: () => void;
  icon: React.ElementType;
}
export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon: Icon,
}) => {
  return (
    <Button
      className="px-3 flex h-full bg-white shadow-sm border border-stone-200 rounded-lg hover:bg-stone-100"
      role="button"
      type="button"
      onClick={onClick}
    >
      <Icon className="w-4 h-4 text-stone-700" />
    </Button>
  );
};

interface FormSelectWithActionsProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  errors: FieldErrors<T>;

  options?: Option[];
  isLoading?: boolean;
  isError?: boolean;

  /** Actions */
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export function FormSelectWithActions<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  errors,
  options = [],
  isLoading = false,
  isError = false,
  onCreate,
  onUpdate,
  onDelete,
}: FormSelectWithActionsProps<T>) {
  const error = errors[name] as FieldError | undefined;
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`w-full ${error ? "border-rose-800" : ""}`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {isError && (
                    <SelectItem
                      value="error"
                      disabled
                      className="text-rose-800 bg-rose-50 flex items-center gap-2"
                    >
                      <ExclamationTriangleIcon className="size-5 text-rose-800" />
                      Error al cargar los datos
                    </SelectItem>
                  )}
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  ) : options.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No hay registros
                    </SelectItem>
                  ) : (
                    options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {onCreate && <IconButton onClick={onCreate} icon={PlusIcon} />}
              {field.value && onUpdate && (
                <IconButton onClick={onUpdate} icon={PencilIcon} />
              )}
              {field.value && onDelete && (
                <IconButton onClick={onDelete} icon={Trash2Icon} />
              )}
            </>
          )}
        />
      </div>
      {error?.message && (
        <p className="text-sm text-rose-800">{error.message}</p>
      )}
    </div>
  );
}
