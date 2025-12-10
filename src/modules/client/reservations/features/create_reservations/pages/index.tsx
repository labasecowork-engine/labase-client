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
} from "../components";
import type { ReservationFormData } from "../types";
import { reservationSchema } from "../schemas";
import { convertTimeToISO } from "@/utilities";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import type { Space } from "@/types/spaces";
import { useQuery } from "@tanstack/react-query";
import { getSpacesRequest } from "@/services";
import { useCheckAvailability } from "../hooks/use_check_availability";
import { useCreateReservation } from "../hooks/use_create_reservation";

export default function CreateReservationPage() {
  const { changeTitle } = useTitle();
  const { data: spacesData, isLoading: isLoadingSpaces } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpacesRequest,
  });

  const { handleCheckAvailability, isChecking } = useCheckAvailability();
  const { handleCreateReservation, isCreating } = useCreateReservation();

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
      start_time: "",
      end_time: "",
      date: undefined,
    },
  });

  const watchedValues = watch();
  const selectedSpace =
    spacesData?.find((space: Space) => space.id === watchedValues.space_id) ||
    null;

  const onSubmit = (data: ReservationFormData) => {
    if (!data.date || !data.start_time || !data.end_time || !data.space_id) {
      toast.error("Datos incompletos", {
        description: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    const availabilityData = {
      space_id: data.space_id,
      start_time: convertTimeToISO(data.date, data.start_time),
      end_time: convertTimeToISO(data.date, data.end_time),
      people: data.people,
      full_room: data.full_room,
    };
    handleCheckAvailability(availabilityData, data, {
      onSuccess: (_, availabilityData, formData) => {
        handleCreateReservation(availabilityData, formData);
      },
    });
  };

  useEffect(() => {
    console.log(watchedValues);
  }, [watchedValues]);

  useEffect(() => {
    changeTitle("Crear reserva - La base");
  }, [changeTitle]);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header isChecking={isChecking} isCreating={isCreating} />

        <div className="w-full  justify-between">
          <div>
            <SpaceSelector
              spaces={spacesData || []}
              isLoading={isLoadingSpaces}
              selectedSpace={watchedValues.space_id || null}
              onSpaceSelect={(spaceId) => setValue("space_id", spaceId)}
              error={errors.space_id?.message}
            />

            <Card className="mb-24">
              <CardHeader>
                <CardTitle>Selecciona tu horario</CardTitle>
                <CardDescription>
                  Selecciona la hora que mejor se adapte a tu reserva. Si
                  prefieres un plan personalizado, puedes contactarnos a través
                  de nuestra página web.
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
