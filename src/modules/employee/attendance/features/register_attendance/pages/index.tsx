import {
  AsyncBoundary,
  Card,
  CardContent,
  CustomHeader,
  Pagination,
} from "@/components/ui";
import { useEffect, useMemo, useState } from "react";
import { getAttendance, registerAttendance } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Attendance, AttendanceDay } from "../types";
import {
  CardButton,
  EmptyState,
  ErrorState,
  LoadingState,
  TableAttendance,
} from "../components";
import { toast } from "sonner";
import { useTitle } from "@/hooks";
import { getDayName } from "@/utilities/";
import { FireIcon } from "@heroicons/react/24/solid";

export default function ViewReservationPage() {
  const { changeTitle } = useTitle();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const {
    data: attendance,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["attendance", page],
    queryFn: () => getAttendance(page),
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["attendance"] });
    toast.success("Asistencia registrada correctamente", {
      description:
        "La asistencia se ha registrado correctamente, gracias por asistir.",
    });
  };

  const onError = () => {
    toast.error("Error al registrar asistencia", {
      description: "Recuerda no marcar dos veces el mismo tipo de asistencia.",
    });
  };

  const { mutate: registerAttendanceMutation, isPending: isRegistering } =
    useMutation({
      mutationFn: registerAttendance,
      onSuccess,
      onError,
    });

  const handleRegisterAttendance = (type: "exit" | "entry") => {
    registerAttendanceMutation({ type });
  };

  const attendanceHistory = useMemo(() => {
    if (!attendance?.attendances) return [];

    const groupedByDate = attendance.attendances.reduce(
      (acc: Record<string, AttendanceDay>, record: Attendance) => {
        const date = record.date;
        if (!acc[date]) {
          acc[date] = {
            date,
            dayName: getDayName(date),
            records: [],
          };
        }
        acc[date].records.push({
          time: record.check_time.substring(0, 5),
          type: record.type,
        });
        return acc;
      },
      {}
    );

    return Object.values(groupedByDate).sort(
      (a: AttendanceDay, b: AttendanceDay) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [attendance]);

  useEffect(() => {
    changeTitle("Asistencias - La base");
  }, [changeTitle]);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <CustomHeader title="Asistencias" />

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CardButton
            handleRegisterAttendance={handleRegisterAttendance}
            isRegistering={isRegistering}
            type="entry"
          />
          <CardButton
            handleRegisterAttendance={handleRegisterAttendance}
            isRegistering={isRegistering}
            type="exit"
          />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-serif text-stone-900 font-bold mb-6">
            Historial de asistencias
          </h2>

          <Card className="mb-4">
            <CardContent>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4 ">
                  <div className="rounded-full bg-orange-500/20 p-4">
                    <FireIcon className="size-10 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-stone-900 font-bold">
                      2 días
                    </h2>
                    <p className="text-sm text-stone-500">
                      Llevas trabajando 2 días consecutivos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-stone-100 p-4 rounded-lg">
                    <h2 className="text-2xl font-serif text-stone-900 font-bold text-center">
                      14
                    </h2>
                    <p className="text-sm text-stone-500 text-center">
                      Racha más larga
                    </p>
                  </div>
                  <div className="bg-stone-100 p-4 rounded-lg">
                    <h2 className="text-2xl font-serif text-stone-900 font-bold text-center">
                      100
                    </h2>
                    <p className="text-sm text-stone-500 text-center">
                      Total de asistencias
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AsyncBoundary
            isLoading={isLoading}
            isError={isError}
            data={attendanceHistory}
            LoadingComponent={<LoadingState />}
            ErrorComponent={<ErrorState />}
            EmptyComponent={<EmptyState />}
          >
            {(attendanceData) => (
              <>
                <TableAttendance attendanceData={attendanceData} />
                <Pagination
                  page={page}
                  totalPages={attendance?.pagination.total_pages ?? 1}
                  onPageChange={(page) => setPage(page)}
                />
              </>
            )}
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}
