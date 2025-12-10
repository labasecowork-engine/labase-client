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
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { CreateProductFormData } from "../../types";

interface ImageSectionProps {
  control: Control<CreateProductFormData>;
  errors: FieldErrors<CreateProductFormData>;
}

export const ImageSection = ({ control, errors }: ImageSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagen principal</CardTitle>
        <CardDescription>
          Agrega una imagen del producto para que los clientes puedan verlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              {!value?.length && (
                <FileDropZone
                  onFilesChange={onChange}
                  files={value || []}
                  acceptedTypes={["image/*"]}
                  maxFiles={1}
                  maxFileSize={5 * 1024 * 1024}
                  multiple={false}
                />
              )}
              {value && value.length > 0 && (
                <div className="relative mx-auto rounded-lg overflow-hidden">
                  <div className="hover:bg-black/40 transition-all z-10 absolute top-0 left-0 w-full h-full"></div>
                  <Image
                    src={URL.createObjectURL(value[0])}
                    alt={value[0].name}
                    className="w-full h-[300px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onChange([])}
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
