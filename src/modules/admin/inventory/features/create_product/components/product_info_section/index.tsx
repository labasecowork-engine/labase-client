import {
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormInput,
  FormTextarea,
  FormSelectWithActions,
} from "@/components/ui";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import type { CreateProductFormData } from "../../types";
import { getBrands } from "@/modules/admin/inventory/services";
import { useQuery } from "@tanstack/react-query";
import { DialogManager } from "../../../../components/";
import { UNITS } from "../../../../constants";
import { useBrandManager } from "@/modules/admin/inventory/hooks";
import type { Brand } from "@/types/inventory";
import type { EditProductFormData } from "../../../edit_product/types";

interface Props {
  register: UseFormRegister<CreateProductFormData>;
  control: Control<CreateProductFormData>;
  errors: FieldErrors<CreateProductFormData>;
  watch: UseFormWatch<CreateProductFormData>;
}

export const ProductInfoSection = ({
  register,
  control,
  errors,
  watch,
}: Props) => {
  const {
    createBrandDialogOpen,
    setCreateBrandDialogOpen,
    updateBrandDialogOpen,
    setUpdateBrandDialogOpen,
    deleteBrandDialogOpen,
    setDeleteBrandDialogOpen,
    isPendingDeleteBrand,
    onDeleteBrand,
  } = useBrandManager(watch("brand") || "");

  const {
    data: brands,
    isLoading: isLoadingBrands,
    isError: isErrorBrands,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Información del producto</CardTitle>
          <CardDescription>
            Agrega la información del producto que tienes en el inventario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormInput
              label="Nombre del producto"
              name="productName"
              placeholder="Ej. Cuchara de acero inoxidable"
              register={register}
              errors={errors}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <FormSelectWithActions
                  name="brand"
                  control={control}
                  errors={errors}
                  options={brands?.map((brand: Brand) => ({
                    id: brand.id,
                    name: brand.name,
                  }))}
                  isLoading={isLoadingBrands}
                  isError={isErrorBrands}
                  label="Marca"
                  placeholder="Selecciona una marca"
                  onCreate={() => setCreateBrandDialogOpen(true)}
                  onUpdate={() => setUpdateBrandDialogOpen(true)}
                  onDelete={() => setDeleteBrandDialogOpen(true)}
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="block mb-2">
                  Cantidad
                </Label>
                <div className="w-full flex gap-2">
                  <Input
                    className={`w-full flex-3 ${
                      errors.quantity ? "border-rose-800" : ""
                    }`}
                    placeholder="Cantidad"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register("quantity", { valueAsNumber: true })}
                  />
                  <div className="flex-1">
                    <Controller
                      name="unit"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              errors.unit ? "border-rose-800" : ""
                            }`}
                          >
                            <SelectValue placeholder="Unidad" />
                          </SelectTrigger>
                          <SelectContent>
                            {UNITS.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                {(errors.quantity || errors.unit) && (
                  <p className="text-rose-800 text-sm mt-1">
                    {errors.quantity?.message || errors.unit?.message}
                  </p>
                )}
              </div>
            </div>

            <FormTextarea
              label="Descripción"
              name="description"
              register={register}
              errors={errors}
              placeholder="Ej. Cuchara de acero inoxidable de 18 cm de largo, con mango de madera y punta de acero."
              className="min-h-[80px]"
            />
            <FormTextarea
              label="Observaciones"
              name="observations"
              register={register}
              errors={errors}
              placeholder="Ej. Información adicional del producto"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <DialogManager
        isOpenCreateBrandDialog={createBrandDialogOpen}
        setIsOpenCreateBrandDialog={setCreateBrandDialogOpen}
        isOpenUpdateBrandDialog={updateBrandDialogOpen}
        setIsOpenUpdateBrandDialog={setUpdateBrandDialogOpen}
        isOpenDeleteBrandDialog={deleteBrandDialogOpen}
        setIsOpenDeleteBrandDialog={setDeleteBrandDialogOpen}
        watch={watch as unknown as UseFormWatch<CreateProductFormData | EditProductFormData>}
        onDeleteBrand={onDeleteBrand}
        isPendingDeleteBrand={isPendingDeleteBrand}
        brands={brands || []}
      />
    </>
  );
};
