import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CustomHeader,
  AsyncSelect,
  FormInput,
} from "@/components/ui";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import type { CreateVisitorFormData, SearchVisitorResponse } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVisitorSchema } from "../../schemas";
import { SearchDNI } from "../search_dni";
import { twMerge } from "tailwind-merge";
import { getSpacesRequest, getUsers } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVisitor } from "../../services";
import { DateTimePicker } from "../../../../components/datetime_picker";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const VisitorForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateVisitorFormData>({
    resolver: zodResolver(createVisitorSchema),
  });

  const onSuccessCreateVisitor = () => {
    toast.success("Visitante creado correctamente", {
      description: `El visitante ${watch("first_name")} ${watch("last_name")} se ha creado correctamente.`,
    });
    queryClient.invalidateQueries({ queryKey: ["visitors"] });
    navigate(ROUTES.Admin.ViewVisitors);
  };
  const onErrorCreateVisitor = (error: Error) => {
    toast.error("Error al crear el visitante", {
      description: error.message,
    });
  };

  const { mutate: createVisitorMutation, isPending: isLoadingCreateVisitor } =
    useMutation({
      mutationFn: (data: CreateVisitorFormData) => createVisitor(data),
      onSuccess: onSuccessCreateVisitor,
      onError: onErrorCreateVisitor,
    });

  const {
    data: spacesData,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpacesRequest(),
  });

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const onSearchDNI = (data: SearchVisitorResponse) => {
    setValue("first_name", data.first_name);
    setValue("last_name", data.last_name);
    setValue("dni", data.dni);
  };

  const onSubmit = (data: CreateVisitorFormData) => {
    createVisitorMutation(data);
  };

  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between mb-8">
          <CustomHeader title="Crear visitante" to="/admin/visitors" />
          <Button
            type="submit"
            disabled={isLoadingCreateVisitor}
            className="min-w-[200px]"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isLoadingCreateVisitor ? "Creando..." : "Crear visitante"}
          </Button>
        </div>

        <div className="space-y-6 mb-8">
          <SearchDNI onSearchDNI={onSearchDNI} />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Información del Visitante
              </CardTitle>
              <CardDescription>
                Completa los datos del nuevo visitante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Nombre"
                  name="first_name"
                  placeholder="Ej. María"
                  register={register}
                  errors={errors}
                />
                <FormInput
                  label="Apellido"
                  name="last_name"
                  placeholder="Ej. González López"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Correo electrónico"
                  name="email"
                  placeholder="Ej. ejemplo@email.com"
                  type="email"
                  register={register}
                  errors={errors}
                />
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="flex items-center">
                    <span
                      className={twMerge(
                        "text-sm text-stone-500 h-[38px] px-3 bg-stone-100 border-t border-b border-l rounded-l-sm flex items-center justify-center",
                        errors.phone ? "border-rose-800" : "border-stone-200"
                      )}
                    >
                      +51
                    </span>
                    <Input
                      id="phone"
                      placeholder="Ej. 1234567890"
                      {...register("phone")}
                      className={twMerge(
                        "rounded-l-none h-[38px] border-t border-b border-r",
                        errors.phone ? "border-rose-800" : "border-stone-200"
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-rose-800">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <FormInput
                label="DNI (documento de identidad)"
                name="dni"
                placeholder="Ej. 77331155"
                type="number"
                register={register}
                errors={errors}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateTimePicker
                  label="Fecha y hora de entrada"
                  value={
                    watch("entry_time")
                      ? new Date(watch("entry_time"))
                      : undefined
                  }
                  onChange={(date) =>
                    setValue("entry_time", date ? date.toISOString() : "")
                  }
                  error={errors.entry_time?.message}
                />
                <DateTimePicker
                  label="Fecha y hora de salida"
                  value={
                    watch("exit_time")
                      ? new Date(watch("exit_time"))
                      : undefined
                  }
                  onChange={(date) =>
                    setValue("exit_time", date ? date.toISOString() : "")
                  }
                  error={errors.exit_time?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                  <AsyncSelect
                    label="Cliente"
                    onChange={(value) => setValue("client_id", value || "")}
                    value={watch("client_id") || undefined}
                    placeholder="Seleccionar cliente"
                    className="w-full"
                    options={
                      usersData?.users.map((user) => ({
                        id: user.id,
                        name: user.first_name + " " + user.last_name,
                      })) || []
                    }
                    isLoading={isLoadingUsers}
                    isError={isErrorUsers}
                    showAllOption={false}
                  />
                </div>

                <div className="w-full">
                  <AsyncSelect
                    label="Espacio"
                    onChange={(value) => setValue("space_id", value || "")}
                    value={watch("space_id") || undefined}
                    placeholder="Seleccionar espacio"
                    className="w-full"
                    options={spacesData || []}
                    isLoading={isLoadingSpaces}
                    isError={isErrorSpaces}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};
