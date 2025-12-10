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
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import type { EditVisitorFormData } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { editVisitorSchema } from "../../schemas";
import { twMerge } from "tailwind-merge";
import { getSpacesRequest, getUsers } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editVisitor } from "../../services";
import { DateTimePicker } from "../../../../components";
import { toast } from "sonner";
import type { Visitor } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

interface Props {
  defaultValues: Visitor;
}

export const VisitorForm: React.FC<Props> = ({ defaultValues }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditVisitorFormData>({
    resolver: zodResolver(editVisitorSchema),
    defaultValues: {
      first_name: defaultValues.first_name,
      last_name: defaultValues.last_name,
      email: defaultValues.email,
      phone: defaultValues.phone,
      dni: defaultValues.dni,
      entry_time: defaultValues.entry_time,
      exit_time: defaultValues.exit_time,
      client_id: defaultValues.user.id,
      space_id: defaultValues.space.id,
    },
  });

  const onSuccessEditVisitor = () => {
    toast.success("Visitante editado correctamente", {
      description: `El visitante ${watch("first_name")} ${watch("last_name")} se ha editado correctamente.`,
    });
    queryClient.invalidateQueries({ queryKey: ["visitors"] });
    navigate(ROUTES.Admin.ViewVisitors);
  };
  const onErrorEditVisitor = (error: Error) => {
    toast.error("Error al editar el visitante", {
      description: error.message,
    });
  };

  const { mutate: editVisitorMutation, isPending: isLoadingEditVisitor } =
    useMutation({
      mutationFn: (data: EditVisitorFormData) =>
        editVisitor(defaultValues.id, data),
      onSuccess: onSuccessEditVisitor,
      onError: onErrorEditVisitor,
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

  const onSubmit = (data: EditVisitorFormData) => {
    editVisitorMutation(data);
  };

  useEffect(() => {
    if (defaultValues) {
      setValue("first_name", defaultValues.first_name);
      setValue("last_name", defaultValues.last_name);
      setValue("email", defaultValues.email);
      setValue("phone", defaultValues.phone);
      setValue("dni", defaultValues.dni);
      setValue("entry_time", defaultValues.entry_time);
      setValue("exit_time", defaultValues.exit_time);
      setValue("client_id", defaultValues.user.id);
      setValue("space_id", defaultValues.space.id);
    }
  }, [defaultValues, setValue]);

  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end justify-between mb-8">
          <CustomHeader title="Editar visitante" to="/admin/visitors" />
          <Button
            type="submit"
            disabled={isLoadingEditVisitor}
            className="min-w-[200px]"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoadingEditVisitor ? "Editando..." : "Editar visitante"}
          </Button>
        </div>

        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Información del Visitante
              </CardTitle>
              <CardDescription>
                Completa los datos del visitante
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
                <div>
                  <Label htmlFor="phone" className="block mb-2">
                    Teléfono
                  </Label>
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
