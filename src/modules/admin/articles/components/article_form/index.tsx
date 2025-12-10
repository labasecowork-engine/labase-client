import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Label,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

import { BannerSection } from "@/modules/admin/articles/features/create_article/components/banner_section";
import { getCategoriesRequest } from "@/modules/admin/articles_categories/features/view_categories/service";
import { useQuery } from "@tanstack/react-query";

const articleSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  category_id: z.string().min(1, "Debes seleccionar una categoría"),
  content: z.string().min(1, "El contenido es obligatorio"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  defaultValues?: ArticleFormData;
  defaultBannerUrl?: string;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  title: string;
  description: string;
}

export const ArticleForm = ({
  defaultValues = {
    title: "",
    category_id: "",
    content: "",
  },
  defaultBannerUrl,
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  title,
  description,
}: ArticleFormProps) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesRequest(),
  });
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const contentFileRef = useRef<File | null>(null);
  const [defaultBannerLoaded, setDefaultBannerLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    if (defaultBannerUrl && !defaultBannerLoaded) {
      const loadDefaultBanner = async () => {
        try {
          const response = await fetch(defaultBannerUrl);
          const blob = await response.blob();
          const fileName =
            defaultBannerUrl.split("/").pop() || "default-banner.jpg";
          const file = new File([blob], fileName, { type: blob.type });
          setBanner(file);
          setDefaultBannerLoaded(true);
        } catch (error) {
          console.error("Error loading default banner:", error);
        }
      };

      loadDefaultBanner();
    }
  }, [defaultBannerUrl, defaultBannerLoaded]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
    mode: "onChange",
  });

  const selectedCategoryId = watch("category_id");

  useEffect(() => {
    if (defaultValues.category_id) {
      setValue("category_id", defaultValues.category_id);
    }
  }, [defaultValues.category_id, setValue]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const htmlContent = e.target.value;
    const blob = new Blob([htmlContent], { type: "text/html" });
    contentFileRef.current = new File([blob], "index.html", {
      type: "text/html",
    });
  };

  const handleFormSubmit = handleSubmit((data) => {
    if (!banner) {
      setBannerError("Debes agregar una imagen de portada para el artículo");
      return;
    }

    if (!contentFileRef.current) {
      const htmlContent = data.content;
      const blob = new Blob([htmlContent], { type: "text/html" });
      contentFileRef.current = new File([blob], "index.html", {
        type: "text/html",
      });
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category_id", data.category_id);
    formData.append("banner", banner);

    if (contentFileRef.current) {
      formData.append("content", contentFileRef.current);
    }

    onSubmit(formData);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 mt-8">
      <BannerSection
        image={banner}
        onImageChange={setBanner}
        error={bannerError}
      />

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">
              Título del artículo
            </Label>
            <Input
              id="title"
              placeholder="Ej. 5 Consejos de Productividad"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-rose-800 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category_id" className="mb-2 block">
              Categoría
            </Label>
            <Select
              value={selectedCategoryId}
              onValueChange={(value) => {
                setValue("category_id", value);
              }}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.category_id ? "border-rose-800" : ""
                }`}
              >
                <SelectValue
                  placeholder={
                    isCategoriesLoading
                      ? "Cargando categorías..."
                      : "Selecciona una categoría"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                {categoriesData?.categories?.length === 0 && (
                  <div className="relative px-2 py-1.5 text-sm text-muted-foreground">
                    No hay categorías disponibles
                  </div>
                )}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-sm text-rose-800 mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="content" className="mb-2 block">
              Contenido del artículo
            </Label>
            <Textarea
              id="content"
              placeholder="Escribe aquí tu artículo..."
              className="min-h-[300px] resize-y"
              {...register("content")}
              onChange={(e) => {
                register("content").onChange(e);
                handleContentChange(e);
              }}
            />
            {errors.content && (
              <p className="text-sm text-rose-800 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto rounded-full px-8 py-3.5"
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
};
