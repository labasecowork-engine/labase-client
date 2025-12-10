import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  FileDropZone,
  Image,
} from "@/components/ui";
import { XIcon } from "lucide-react";
import type { SpaceImage } from "@/types";

interface Props {
  images: File[];
  existingImages?: SpaceImage[];
  onImagesChange: (images: File[]) => void;
  onRemoveExistingImage?: (index: number) => void;
  error?: string | null;
}

export const ImageSection = ({
  images,
  existingImages = [],
  onImagesChange,
  onRemoveExistingImage,
  error,
}: Props) => {
  const totalImages = images.length + existingImages.length;
  const hasTooManyImages = totalImages > 5;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagenes del espacio</CardTitle>
        <CardDescription>
          Agrega imagenes del espacio para que los usuarios puedan verlo. Máximo
          5 imágenes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <FileDropZone
              onFilesChange={(newFiles) => {
                const totalFilesAfterAdd = totalImages + newFiles.length;
                if (totalFilesAfterAdd > 5) {
                  const allowedFiles = newFiles.slice(0, 5 - totalImages);
                  onImagesChange([...images, ...allowedFiles]);
                } else {
                  onImagesChange([...images, ...newFiles]);
                }
              }}
              files={images}
              acceptedTypes={["image/*"]}
              maxFiles={5 - existingImages.length}
              maxFileSize={10 * 1024 * 1024}
              multiple={true}
            />
          </div>
          <div className="my-2">
            {error && (
              <p className="text-sm text-rose-800 font-medium">{error}</p>
            )}
            {hasTooManyImages && (
              <p className="text-sm text-amber-800 font-medium">
                Has alcanzado el límite máximo de 5 imágenes.
              </p>
            )}
            {totalImages >= 5 && !hasTooManyImages && (
              <p className="text-sm text-amber-800 font-medium">
                Has alcanzado el límite máximo de 5 imágenes.
              </p>
            )}
          </div>

          <div className="mt-2 grid grid-cols-4 gap-2">
            {existingImages.map((image, index) => (
              <div
                key={`existing-${image.id}`}
                className="relative bg-stone-600"
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Imagen existente ${index + 1}`}
                  className="w-full h-24 rounded-md overflow-hidden object-cover"
                />
                {onRemoveExistingImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(index)}
                    className="absolute top-1 right-1 bg-white/40 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}

            {images.map((image, index) => (
              <div
                key={`new-${URL.createObjectURL(image)}-${index}`}
                className="relative bg-stone-600"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-24 rounded-md overflow-hidden object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = images.filter((_, i) => i !== index);
                    onImagesChange(newImages);
                  }}
                  className="absolute top-1 right-1 bg-white/40 backdrop-blur-sm text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <XIcon className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
