import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  SpaceSelector,
  DateSelector,
  PeopleCountInput,
  FullSpaceSwitch,
  ReservationSummary,
  DurationSelector,
  Header,
  SelectUser,
} from "../components";
import type { ReservationFormData } from "../types";
import { reservationSchema } from "../schemas";
import { convertTimeToISO } from "@/utilities";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import type { Space } from "@/types/spaces";
import { useQuery } from "@tanstack/react-query";
import { getSpacesRequest } from "@/services";
import { useCreateReservation, useCheckAvailability } from "../hooks";

export default function CreateReservationPage() {
  const { changeTitle } = useTitle();
  const { handleCreateReservation, isCreating } = useCreateReservation();
  const { handleCheckAvailability, isChecking } = useCheckAvailability();
  const { data: spacesData, isLoading: isLoadingSpaces } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpacesRequest,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema(spacesData || [])),
    defaultValues: {
      space_id: "",
      people: 1,
      full_room: false,
      user_id: "",
      start_time: "",
      end_time: "",
      date: new Date(),
    },
  });

  const watchedValues = watch();
  const selectedSpace =
    spacesData?.find((space: Space) => space.id === watchedValues.space_id) ||
    null;

  const onSubmit = (data: ReservationFormData) => {
    if (
      !data.date ||
      !data.start_time ||
      !data.end_time ||
      !data.space_id ||
      !data.user_id
    ) {
      toast.error("Datos incompletos", {
        description: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    const availabilityData = {
      space_id: data.space_id,
      start_time: convertTimeToISO(data.date, data.start_time),
      end_time: convertTimeToISO(data.date, data.end_time),
    };

    handleCheckAvailability(availabilityData, data, {
      onSuccess: (_, availabilityData, formData) => {
        handleCreateReservation(availabilityData, formData);
      },
    });
  };

  useEffect(() => {
    changeTitle("Crear reserva - La base");
  }, [changeTitle]);

  useEffect(() => {
    if (!watchedValues.date) {
      setValue("date", new Date());
    }
  }, [setValue, watchedValues.date]);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header isChecking={isChecking} isCreating={isCreating} />

        <div className="w-full justify-between">
          <div>
            <SelectUser
              watchedValues={watchedValues}
              setValue={(name, value) =>
                setValue(name as keyof ReservationFormData, value)
              }
            />

            <SpaceSelector
              spaces={spacesData || []}
              isLoading={isLoadingSpaces}
              selectedSpace={watchedValues.space_id || null}
              onSpaceSelect={(spaceId) => setValue("space_id", spaceId)}
              error={errors.space_id?.message}
            />

            <Card className="mb-24">
              <CardHeader>
                <CardTitle>Selecciona el horario</CardTitle>
                <CardDescription>
                  Selecciona la fecha y la hora de la reserva para el usuario.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6  items-start gap-4 grid grid-cols-1 lg:grid-cols-2">
                  <DateSelector
                    date={watchedValues.date}
                    onDateChange={(date) => setValue("date", date as Date)}
                    error={errors.date?.message}
                  />

                  <PeopleCountInput
                    value={watchedValues.people || 1}
                    onChange={(value) => setValue("people", value)}
                    minCapacity={selectedSpace?.capacity_min}
                    maxCapacity={selectedSpace?.capacity_max}
                    error={errors.people?.message}
                  />
                </div>

                <DurationSelector
                  date={watchedValues.date || null}
                  startTime={watchedValues.start_time || null}
                  endTime={watchedValues.end_time || null}
                  onStartTimeChange={(time) => setValue("start_time", time)}
                  onEndTimeChange={(time) => setValue("end_time", time)}
                  startTimeError={errors.start_time?.message}
                  endTimeError={errors.end_time?.message}
                />

                <FullSpaceSwitch
                  checked={watchedValues.full_room || false}
                  onCheckedChange={(checked) => setValue("full_room", checked)}
                  selectedSpace={selectedSpace}
                  peopleCount={watchedValues.people || 1}
                  error={errors.full_room?.message}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      <ReservationSummary
        selectedSpace={selectedSpace}
        date={watchedValues.date}
        startTime={watchedValues.start_time || null}
        endTime={watchedValues.end_time || null}
        personCount={watchedValues.people || 1}
        isFullSpace={watchedValues.full_room || false}
      />
    </div>
  );
}
