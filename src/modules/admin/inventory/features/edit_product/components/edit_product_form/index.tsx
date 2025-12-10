import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { EditImageSection } from "../edit_image_section";
import { EditProductInfoSection } from "../edit_product_info_section";
import type { Product } from "@/types";
import type { EditProductFormData } from "../../types";
import { editProductSchema } from "../../schema";

interface EditProductFormProps {
  onSubmit: (data: EditProductFormData) => void;
  initialData?: Product;
  onChangesDetected?: (hasChanges: boolean) => void;
}

export const EditProductForm = forwardRef<
  HTMLFormElement,
  EditProductFormProps
>(({ onSubmit, initialData, onChangesDetected }, ref) => {
  const [originalValues, setOriginalValues] =
    useState<EditProductFormData | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      productName: initialData?.name || "",
      brand: initialData?.brand.id || "",
      quantity: initialData?.quantity || 0,
      unit: initialData?.unit_of_measure || "",
      description: initialData?.description || "",
      observations: initialData?.observations || "",
      images: undefined,
    },
  });

  const watchedValues = useWatch({ control });

  const hasChanges = useMemo((): boolean => {
    if (!originalValues || !watchedValues) return false;

    const fieldsToCompare: (keyof EditProductFormData)[] = [
      "productName",
      "brand",
      "quantity",
      "unit",
      "description",
      "observations",
    ];

    const regularFieldsChanged = fieldsToCompare.some((field) => {
      const currentValue = watchedValues[field];
      const originalValue = originalValues[field];
      return currentValue !== originalValue;
    });

    const currentImages = watchedValues.images;
    const originalImages = originalValues.images;

    const imagesChanged =
      (currentImages?.length || 0) !== (originalImages?.length || 0);

    return regularFieldsChanged || imagesChanged;
  }, [originalValues, watchedValues]);

  useEffect(() => {
    if (initialData) {
      const formData = {
        productName: initialData.name,
        brand: initialData.brand.id,
        quantity: initialData.quantity,
        unit: initialData.unit_of_measure,
        description: initialData.description,
        observations: initialData.observations,
        images: undefined,
      };
      reset(formData);
      setOriginalValues(formData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (onChangesDetected) {
      onChangesDetected(hasChanges);
    }
  }, [hasChanges, onChangesDetected]);

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-8"
    >
      <EditImageSection
        control={control}
        errors={errors}
        initialImage={initialData?.photo_url || ""}
      />
      <EditProductInfoSection
        register={register}
        control={control}
        errors={errors}
        watch={watch}
      />
    </form>
  );
});

EditProductForm.displayName = "EditProductForm";
