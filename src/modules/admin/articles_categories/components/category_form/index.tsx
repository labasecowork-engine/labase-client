import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import {
  Input,
  Label,
  Textarea,
  Card,
  CardContent,
} from "@/components/ui";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export interface CategoryFormRef {
  submitForm: () => void;
}

interface CategoryFormProps {
  defaultValues?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
}

export const CategoryForm = forwardRef<CategoryFormRef, CategoryFormProps>(({
  defaultValues = {
    name: "",
    description: "",
  },
  onSubmit,
}, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleFormSubmit();
    },
  }));

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div>
            <Label htmlFor="name" className="mb-2 block">Nombre de la categoría</Label>
            <Input
              id="name"
              placeholder="Ej. Programación"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-rose-800 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description" className="mb-2 block">Descripción de la categoría</Label>
            <Textarea
              id="description"
              className="min-h-[300px] resize-y"
              placeholder="Ej. Tutoriales y buenas prácticas"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-rose-800 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>


      </Card>
    </form>
  );
});
