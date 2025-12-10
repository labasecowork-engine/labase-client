import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Textarea,
  Button,
} from "@/components/ui";
import { FormInput } from "@/components/ui";
import { Label } from "@/components/ui";
import { Input } from "@/components/ui";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui";
import { Calendar } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useState } from "react";
import type { CreateReminderFormData } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReminderSchema } from "../../schemas";
import {
  REMINDER_FREQUENCY_DAILY,
  REMINDER_FREQUENCY_MONTHLY,
  REMINDER_FREQUENCY_WEEKLY,
  REMINDER_FREQUENCY_YEARLY,
} from "@/types";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  onSubmit: (data: CreateReminderFormData) => void;
  initialData?: Partial<CreateReminderFormData>;
}

export const ReminderForm = forwardRef<HTMLFormElement, Props>(
  ({ onSubmit, initialData }, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      control,
      trigger,
      formState: { errors },
    } = useForm<CreateReminderFormData>({
      resolver: zodResolver(CreateReminderSchema),
      defaultValues: {
        name: initialData?.name || "",
        phone_number: initialData?.phone_number || "",
        send_date: initialData?.send_date || "",
        frequency: initialData?.frequency || "",
        message: initialData?.message || "",
      },
    });
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
    );

    const handleDateChange = (date: Date | undefined) => {
      setSelectedDate(date);
      if (date) {
        setValue("send_date", date.toISOString());
        trigger("send_date");
      }
    };
    return (
      <Card>
        <CardHeader>
          <CardTitle>Información del recordatorio</CardTitle>
          <CardDescription>
            Completa los campos para crear un nuevo recordatorio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormInput
                label="Nombre del recordatorio"
                name="name"
                placeholder="Ej. Recordatorio de pago"
                register={register}
                errors={errors}
              />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="flex items-center">
                  <span
                    className={twMerge(
                      "text-sm text-stone-500 h-[38px] px-3 bg-stone-100 border-t border-b border-l rounded-l-sm flex items-center justify-center",
                      errors.phone_number
                        ? "border-rose-800"
                        : "border-stone-200"
                    )}
                  >
                    +51
                  </span>
                  <Input
                    id="phone"
                    placeholder="Ej. 1234567890"
                    {...register("phone_number")}
                    className={twMerge(
                      "rounded-l-none h-[38px] border-t border-b border-r",
                      errors.phone_number
                        ? "border-rose-800"
                        : "border-stone-200"
                    )}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-sm text-rose-800">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <Label htmlFor="date-picker">Fecha de envío</Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      type="button"
                      className={twMerge(
                        "justify-between hover:bg-stone-100 px-4 font-normal h-[38px] rounded-lg bg-white border border-stone-200",
                        errors.send_date
                          ? "border-rose-800"
                          : "border-stone-200",
                        !selectedDate ? "text-stone-500" : "text-stone-700"
                      )}
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Seleccionar fecha"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        handleDateChange(date);
                        setDatePickerOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.send_date && (
                  <p className="text-sm text-rose-800">
                    {errors.send_date.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <Label htmlFor="frequency">Frecuencia</Label>
                <Controller
                  name="frequency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={twMerge(
                          "w-full",
                          errors.frequency
                            ? "border-rose-800"
                            : "border-stone-200"
                        )}
                      >
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={REMINDER_FREQUENCY_DAILY}>
                          Diario
                        </SelectItem>
                        <SelectItem value={REMINDER_FREQUENCY_WEEKLY}>
                          Semanal
                        </SelectItem>
                        <SelectItem value={REMINDER_FREQUENCY_MONTHLY}>
                          Mensual
                        </SelectItem>
                        <SelectItem value={REMINDER_FREQUENCY_YEARLY}>
                          Anual
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.frequency && (
                  <p className="text-sm text-rose-800">
                    {errors.frequency.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Ej. Recordatorio de pago"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-rose-800">
                  {errors.message.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
);
