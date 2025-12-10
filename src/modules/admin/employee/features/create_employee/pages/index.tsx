import {
  Card,
  CardContent,
  FormInput,
  FormSelectWithActions,
  Input,
  Label,
} from "@/components/ui";
import { useForm, type UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type CreateEmployeeForm } from "../types";
import { createEmployeeSchema } from "../schema";
import { useTitle } from "@/hooks";
import { useCreateEmployee } from "../hooks";
import { Header } from "../components";
import { DialogManager, FormDatePicker, FormSelect } from "../../../components";
import { useWorkAreaManager, useCompanyManager } from "../../../hooks";
import type { EditEmployeeForm } from "../../edit_employee/types";
import {
  USER_GENDER_FEMALE,
  USER_GENDER_MALE,
  USER_GENDER_UNSPECIFIED,
} from "@/types";
import { twMerge } from "tailwind-merge";

export default function CreateEmployeePage() {
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

  const { changeTitle } = useTitle();

  const { onSubmit, isPending } = useCreateEmployee();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CreateEmployeeForm>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {},
  });

  useEffect(() => {
    changeTitle("Crear empleado - La base");
  }, [changeTitle]);

  return (
    <>
      <div className="mx-auto max-w-4xl w-full px-4 mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header isPending={isPending} />
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nombre"
                  placeholder="Ej. Juan"
                  name="first_name"
                  register={register}
                  errors={errors}
                />
                <FormInput
                  label="Apellido"
                  placeholder="Ej. Perez"
                  name="last_name"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Correo electrónico"
                  placeholder="Ej. ejemplo@labase.com"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                />
                <FormInput
                  label="Contraseña"
                  placeholder="Ej. sgagBxaS152%"
                  name="password"
                  type="password"
                  register={register}
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
                  label="Fecha de nacimiento"
                  name="birth_date"
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelectWithActions
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
        watch={
          watch as unknown as UseFormWatch<
            CreateEmployeeForm | EditEmployeeForm
          >
        }
        areas={areas ?? []}
        companies={companies ?? []}
      />
    </>
  );
}
