import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  FileDropZone,
  Image,
} from "@/components/ui";
import { XIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { EditProductFormData } from "../../types";
import { useState, useEffect } from "react";

interface Props {
  control: Control<EditProductFormData>;
  errors: FieldErrors<EditProductFormData>;
  initialImage?: string;
}

export const EditImageSection = ({ control, errors, initialImage }: Props) => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    initialImage || null
  );

  useEffect(() => {
    setCurrentImage(initialImage || null);
  }, [initialImage]);

  const handleImageChange = (
    files: File[],
    onChange: (files: File[]) => void
  ) => {
    onChange(files);
    if (files.length > 0) {
      setCurrentImage(URL.createObjectURL(files[0]));
    }
  };

  const handleImageRemove = (onChange: (files: File[]) => void) => {
    onChange([]);
    setCurrentImage(null);
  };

  const shouldShowDropZone = (value: File[] | undefined) => {
    return !value?.length && !currentImage;
  };

  const getImageSrc = (value: File[] | undefined) => {
    if (value && value.length > 0) {
      return URL.createObjectURL(value[0]);
    }
    return currentImage;
  };

  const getImageAlt = (value: File[] | undefined) => {
    if (value && value.length > 0) {
      return value[0].name;
    }
    return "Imagen del producto";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagen del producto</CardTitle>
        <CardDescription>
          Actualiza la imagen del producto para que los clientes puedan verlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              {shouldShowDropZone(value) && (
                <FileDropZone
                  onFilesChange={(files) => handleImageChange(files, onChange)}
                  files={value || []}
                  acceptedTypes={["image/*"]}
                  maxFiles={1}
                  maxFileSize={5 * 1024 * 1024}
                  multiple={false}
                />
              )}
              {((value && value.length > 0) || currentImage) && (
                <div className="relative mx-auto rounded-lg overflow-hidden">
                  <div className="hover:bg-black/40 transition-all z-10 absolute top-0 left-0 w-full h-full"></div>
                  <Image
                    src={getImageSrc(value) || ""}
                    alt={getImageAlt(value)}
                    className="w-full h-[300px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(onChange)}
                    className="absolute top-2 right-2 bg-white/40 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer z-20"
                  >
                    <XIcon className="size-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        />
        {errors.images && (
          <p className="text-rose-800 text-sm mt-2">{errors.images.message}</p>
        )}
      </CardContent>
    </Card>
  );
};
