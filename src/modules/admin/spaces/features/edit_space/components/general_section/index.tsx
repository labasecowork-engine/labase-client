import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import { useEffect } from "react";
import type { EditSpaceData } from "../../types";
import type { Space } from "@/types";
import { ImageSection, InfoSection, ConfigSection, PricingSection } from "../";
import { editSpaceSchema } from "../../schemas";
import { useImageManager, useUpdateSpace } from "../../hooks";

interface Props {
  id: string;
  defaultValues: Space;
}

export const GeneralSection: React.FC<Props> = ({ id, defaultValues }) => {
  const {
    images,
    existingImages,
    error: imageError,
    addImages,
    removeExistingImage,
  } = useImageManager({ initialImages: defaultValues.space_images });

  const { updateSpace, isPending } = useUpdateSpace(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditSpaceData>({
    resolver: zodResolver(editSpaceSchema),
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description || "",
      type: defaultValues.type,
      access: defaultValues.access,
      capacity_min: defaultValues.capacity_min,
      capacity_max: defaultValues.capacity_max,
      allow_by_unit: defaultValues.allow_by_unit,
      allow_full_room: defaultValues.allow_full_room,
      prices: defaultValues.prices.map((p) => ({
        id: p.id,
        duration: p.duration,
        amount: Number(p.amount),
        mode: p.mode,
      })),
    },
  });

  // Reset cuando cambian los defaultValues
  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description || "",
        type: defaultValues.type,
        access: defaultValues.access,
        capacity_min: defaultValues.capacity_min,
        capacity_max: defaultValues.capacity_max,
        allow_by_unit: defaultValues.allow_by_unit,
        allow_full_room: defaultValues.allow_full_room,
        prices: defaultValues.prices.map((p) => ({
          id: p.id,
          duration: p.duration,
          amount: Number(p.amount),
          mode: p.mode,
        })),
      });
    }
  }, [defaultValues, reset]);

  const { fields, append, remove } = useFieldArray({ control, name: "prices" });

  const onSubmit = (data: EditSpaceData) => {
    updateSpace(data, images, existingImages);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <ImageSection
        images={images}
        existingImages={existingImages}
        onImagesChange={addImages}
        onRemoveExistingImage={removeExistingImage}
        error={imageError}
      />

      <InfoSection register={register} control={control} errors={errors} />
      <ConfigSection register={register} control={control} errors={errors} />

      <PricingSection
        register={register}
        control={control}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto rounded-full px-8 py-3.5"
        >
          {isPending ? "Guardando cambios..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
};
