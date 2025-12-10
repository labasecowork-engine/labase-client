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

interface BannerSectionProps {
  image: File | null;
  onImageChange: (image: File | null) => void;
  error?: string | null;
}

export const BannerSection = ({
  image,
  onImageChange,
  error,
}: BannerSectionProps) => {
  // This function ensures we only ever have one image
  const handleFilesChange = (files: File[]) => {
    if (files.length > 0) {
      onImageChange(files[0]);
    } else {
      onImageChange(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Banner del artículo</CardTitle>
        <CardDescription>
          Agrega una imagen de portada para tu artículo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {!image && (
            <FileDropZone
              onFilesChange={handleFilesChange}
              files={image ? [image] : []}
              acceptedTypes={["image/*"]}
              maxFiles={1}
              maxFileSize={5 * 1024 * 1024}
              multiple={false}
            />
          )}
          {error && (
            <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-lg">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          )}
          {image && (
            <div className="relative mx-auto rounded-lg overflow-hidden">
              <Image
                src={URL.createObjectURL(image)}
                alt={image.name}
                className="w-full h-[300px] object-cover"
              />
              <div className="hover:bg-black/40 transition-all z-10 absolute top-0 left-0 w-full h-full"></div>
              <button
                type="button"
                onClick={() => onImageChange(null)}
                className="absolute top-2 right-2 bg-white/40 backdrop-blur-sm z-20 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
