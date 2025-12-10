import {
  Card,
  CardContent,
  FormInput,
  FormSelectWithActions,
  Input,
  Label,
} from "@/components/ui";
import { type UseFormWatch, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useMemo } from "react";
import { ROUTES } from "@/routes/routes";
import { type EditEmployeeForm } from "../types";
import { type CreateEmployeeForm } from "../../create_employee/types";
import { editEmployeeSchema } from "../schema";
import { editEmployee, getEmployee } from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "@/hooks";
import { DialogManager, FormDatePicker, FormSelect } from "../../../components";
import { EmptyState, ErrorState, Header, LoadingState } from "../components";
import { useCompanyManager, useWorkAreaManager } from "../../../hooks";
import {
  USER_GENDER_FEMALE,
  USER_GENDER_MALE,
  USER_GENDER_UNSPECIFIED,
} from "@/types";
import { twMerge } from "tailwind-merge";

export default function EditEmployeePage() {
  const [originalValues, setOriginalValues] = useState<EditEmployeeForm | null>(
    null
  );
  const params = useParams();
  const navigate = useNavigate();
  const { changeTitle } = useTitle();
  const {
    areas,
    isPendingAreas,
    isErrorAreas,
    isOpenWorkArea,
    setIsOpenWorkArea,
    isDeleteWorkArea,
    setIsDeleteWorkArea,
    isOpenUpdateWorkArea,
    setIsOpenUpdateWorkArea,
    onDeleteWorkArea,
    isPendingDeleteWorkArea,
  } = useWorkAreaManager();

  const {
    companies,
    isPendingCompanies,
    isErrorCompanies,
    isOpenCompany,
    setIsOpenCompany,
    isOpenUpdateCompany,
    setIsOpenUpdateCompany,
    isDeleteCompany,
    setIsDeleteCompany,
    onDeleteCompany,
    isPendingDeleteCompany,
  } = useCompanyManager();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<EditEmployeeForm>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      birth_date: new Date(),
      gender: USER_GENDER_MALE,
      company_id: "",
      work_area_id: "",
    },
  });

  const watchedValues = useWatch({ control });

  const hasChanges = useMemo(() => {
    if (!originalValues || !watchedValues) return false;

    const fieldsToCompare: (keyof EditEmployeeForm)[] = [
      "first_name",
      "last_name",
      "email",
      "password",
      "phone",
      "birth_date",
      "gender",
      "company_id",
      "work_area_id",
    ];

    return fieldsToCompare.some((field) => {
      const currentValue = watchedValues[field];
      const originalValue = originalValues[field];

      if (field === "birth_date") {
        const currentDate =
          currentValue instanceof Date ? currentValue.getTime() : null;
        const originalDate =
          originalValue instanceof Date ? originalValue.getTime() : null;
        return currentDate !== originalDate;
      }

      return currentValue !== originalValue;
    });
  }, [originalValues, watchedValues]);

  const {
    data: employee,
    isLoading: isLoadingEmployee,
    isError,
  } = useQuery({
    queryKey: ["employee", params.id],
    queryFn: () => getEmployee(params.id as string),
    enabled: !!params.id,
  });

  const { mutate: editEmployeeMutation, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditEmployeeForm }) =>
      editEmployee(id, data),
  });

  const onSubmit = async (data: EditEmployeeForm) => {
    const employeeData = {
      ...data,
      profile_image:
        "https://portfolio-harvey.netlify.app/images/photo-harvey.png",
      user_type: "employee",
    };

    editEmployeeMutation(
      {
        id: params.id as string,
        data: employeeData,
      },
      {
        onSuccess,
        onError,
      }
    );
  };

  const onSuccess = () => {
    toast.success("Empleado editado correctamente", {
      description:
        "El empleado se ha editado correctamente, puedes verlo en la lista de empleados.",
    });
    navigate(ROUTES.Admin.ViewEmployees);
  };

  const onError = (error: Error) => {
    toast.error("Error al editar empleado", {
      description: error.message,
    });
  };

  useEffect(() => {
    changeTitle("Editar empleado - La base");
  }, [changeTitle]);

  useEffect(() => {
    if (employee) {
      const employeeData = {
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        password: "",
        phone: employee.phone || "",
        birth_date: new Date(employee.birth_date),
        gender: employee.gender as
          | typeof USER_GENDER_MALE
          | typeof USER_GENDER_FEMALE
          | typeof USER_GENDER_UNSPECIFIED,
        company_id: employee.company_id,
        work_area_id: employee.work_area_id,
      };

      reset(employeeData);
      setOriginalValues(employeeData);
    }
  }, [employee, reset]);

  if (!params.id) return <EmptyState />;
  if (isError) return <ErrorState />;
  if (isLoadingEmployee) return <LoadingState />;

  return (
    <>
      <div className="mx-auto max-w-4xl w-full px-4 mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header isPending={isPending} hasChanges={hasChanges} />

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  register={register}
                  name="first_name"
                  label="Nombre"
                  placeholder="Ej. Juan"
                  errors={errors}
                />

                <FormInput
                  register={register}
                  name="last_name"
                  label="Apellido"
                  placeholder="Ej. Perez"
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  register={register}
                  name="email"
                  label="Correo electrónico"
                  placeholder="Ej. ejemplo@labase.com"
                  errors={errors}
                />

                <FormInput
                  register={register}
                  name="password"
                  label="Contraseña"
                  placeholder="Ej. gsbXaST15%!"
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                      type="tel"
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
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                <FormDatePicker
                  control={control}
                  name="birth_date"
                  label="Fecha de nacimiento"
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelectWithActions
                  key={`company-${watch("company_id")}-${
                    companies?.length || 0
                  }`}
                  name="company_id"
                  control={control}
                  label="Empresa"
                  placeholder="Selecciona la empresa"
                  errors={errors}
                  options={companies}
                  isLoading={isPendingCompanies}
                  isError={isErrorCompanies}
                  onCreate={() => setIsOpenCompany(true)}
                  onUpdate={
                    watch("company_id")
                      ? () => setIsOpenUpdateCompany(true)
                      : undefined
                  }
                  onDelete={
                    watch("company_id")
                      ? () => setIsDeleteCompany(true)
                      : undefined
                  }
                />

                <FormSelectWithActions
                  key={`work-area-${watch("work_area_id")}-${
                    areas?.length || 0
                  }`}
                  name="work_area_id"
                  control={control}
                  label="Área de trabajo"
                  placeholder="Selecciona el área de trabajo"
                  errors={errors}
                  options={areas}
                  isLoading={isPendingAreas}
                  isError={isErrorAreas}
                  onCreate={() => setIsOpenWorkArea(true)}
                  onUpdate={
                    watch("work_area_id")
                      ? () => setIsOpenUpdateWorkArea(true)
                      : undefined
                  }
                  onDelete={
                    watch("work_area_id")
                      ? () => setIsDeleteWorkArea(true)
                      : undefined
                  }
                />
              </div>

              <FormSelect
                key={`gender-${watch("gender")}`}
                name="gender"
                control={control}
                label="Género"
                placeholder="Selecciona el género"
                options={[
                  { value: USER_GENDER_MALE, label: "Masculino" },
                  { value: USER_GENDER_FEMALE, label: "Femenino" },
                  { value: USER_GENDER_UNSPECIFIED, label: "No especificado" },
                ]}
                errors={errors}
              />
            </CardContent>
          </Card>
        </form>
      </div>
      <DialogManager
        isOpenCompany={isOpenCompany}
        setIsOpenCompany={setIsOpenCompany}
        isOpenWorkArea={isOpenWorkArea}
        setIsOpenWorkArea={setIsOpenWorkArea}
        isOpenUpdateWorkArea={isOpenUpdateWorkArea}
        setIsOpenUpdateWorkArea={setIsOpenUpdateWorkArea}
        isOpenUpdateCompany={isOpenUpdateCompany}
        setIsOpenUpdateCompany={setIsOpenUpdateCompany}
        isDeleteCompany={isDeleteCompany}
        setIsDeleteCompany={setIsDeleteCompany}
        isDeleteWorkArea={isDeleteWorkArea}
        setIsDeleteWorkArea={setIsDeleteWorkArea}
        isPendingDeleteCompany={isPendingDeleteCompany}
        isPendingDeleteWorkArea={isPendingDeleteWorkArea}
        onDeleteCompany={onDeleteCompany}
        onDeleteWorkArea={onDeleteWorkArea}
        watch={watch as UseFormWatch<CreateEmployeeForm | EditEmployeeForm>}
        areas={areas ?? []}
        companies={companies ?? []}
      />
    </>
  );
}
