import { Label, Textarea } from "@/components/ui";
import type { UseFormRegister } from "react-hook-form";
import type { FieldErrors, FieldValues, Path } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
}

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  errors,
  className,
}: Props<T>) {
  const error = errors[name];

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={twMerge(error ? "border-rose-800" : "", className)}
      />
      {error && (
        <p className="text-sm text-rose-800">{error.message as string}</p>
      )}
    </div>
  );
}
