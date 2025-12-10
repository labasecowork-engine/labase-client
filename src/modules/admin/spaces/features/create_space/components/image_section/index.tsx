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

interface Props {
  images: File[];
  onImagesChange: (images: File[]) => void;
  error?: string | null;
}

export const ImageSection: React.FC<Props> = ({
  images,
  onImagesChange,
  error,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagenes del espacio</CardTitle>
        <CardDescription>
          Agrega imagenes del espacio para que los usuarios puedan verlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <FileDropZone
              onFilesChange={onImagesChange}
              files={images}
              acceptedTypes={["image/*"]}
              maxFiles={10}
              maxFileSize={10 * 1024 * 1024}
              multiple={true}
            />
          </div>
          {error && <p className="text-sm text-rose-800 mt-2">{error}</p>}
          <div className="mt-2 grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={`${image.name}-${index}`}
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
