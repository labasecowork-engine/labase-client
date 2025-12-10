import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { ImageSection } from "../image_section";
import { createSpaceSchema } from "../../schemas";
import type { CreateSpaceData } from "../../types";
import { ROUTES } from "@/routes/routes";
import { GeneralInfoSection } from "../info_section";
import { ConfigSection } from "../config_section";
import { PricingSection } from "../pricing_section";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpaceRequest } from "../../service";
import { DURATION_UNIT_HOUR, PRICE_MODE_INDIVIDUAL } from "@/types";

export const GeneralSection = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createSpace, isPending } = useMutation({
    mutationFn: createSpaceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateSpaceData>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "full_room",
      access: "public",
      capacity_min: 1,
      capacity_max: 10,
      allow_by_unit: true,
      allow_full_room: false,
      prices: [
        {
          duration: DURATION_UNIT_HOUR,
          amount: 0,
          mode: PRICE_MODE_INDIVIDUAL,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = (data: CreateSpaceData) => {
    if (images.length === 0) {
      setImageError("Debes agregar al menos 1 imagen del espacio");
      return;
    }

    setImageError(null);

    const formData = new FormData();

    const jsonData = {
      name: data.name,
      description: data.description,
      type: data.type,
      access: data.access,
      capacity_min: data.capacity_min,
      capacity_max: data.capacity_max,
      allow_by_unit: data.allow_by_unit,
      allow_full_room: data.allow_full_room,
      prices: data.prices.map((p) => ({
        unit: p.duration,
        value: Number(p.amount),
        mode: p.mode,
      })),
    };

    formData.append("data", JSON.stringify(jsonData));

    images.forEach((image) => {
      formData.append("images", image);
    });

    createSpace(formData, {
      onSuccess: () => {
        toast.success("Espacio creado exitosamente", {
          description: `El espacio "${data.name}" ha sido creado, puedes verlo en la lista de espacios.`,
        });
        navigate(ROUTES.Admin.ViewSpaces);
      },
      onError: (error: Error) => {
        toast.error("Error al crear el espacio", {
          description: error.message,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <ImageSection
        images={images}
        onImagesChange={setImages}
        error={imageError}
      />
      <GeneralInfoSection register={register} errors={errors} />
      <ConfigSection register={register} errors={errors} />
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
          {isPending ? "Creando espacio..." : "Crear espacio"}
        </Button>
      </div>
    </form>
  );
};
