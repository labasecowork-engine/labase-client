import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import type { CreateProductFormData } from "../../types";
import { createProductSchema } from "../../schema";
import { ImageSection } from "../image_section";
import { ProductInfoSection } from "../product_info_section";

interface ProductFormProps {
  onSubmit: (data: CreateProductFormData) => void;
  initialData?: Partial<CreateProductFormData>;
}

export const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
  ({ onSubmit, initialData }, ref) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      watch,
    } = useForm<CreateProductFormData>({
      resolver: zodResolver(createProductSchema),
      defaultValues: {
        productName: initialData?.productName || "",
        brand: initialData?.brand || "",
        quantity: initialData?.quantity || 0,
        unit: initialData?.unit || "",
        description: initialData?.description || "",
        observations: initialData?.observations || "",
        images: initialData?.images || [],
      },
    });

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-8"
      >
        <ImageSection control={control} errors={errors} />
        <ProductInfoSection
          register={register}
          control={control}
          errors={errors}
          watch={watch}
        />
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";
