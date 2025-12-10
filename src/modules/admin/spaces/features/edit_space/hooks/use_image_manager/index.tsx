import { useState, useEffect } from "react";
import type { SpaceImage } from "@/types";

interface UseImageManagerProps {
  initialImages?: SpaceImage[];
  maxImages?: number;
}

export const useImageManager = ({
  initialImages = [],
  maxImages = 5,
}: UseImageManagerProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<SpaceImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImages.length > 0) {
      const imagesToLoad = initialImages.slice(0, maxImages);
      setExistingImages(imagesToLoad);

      if (initialImages.length > maxImages) {
        setError(
          `Se muestran solo las primeras ${maxImages} imágenes debido al límite máximo.`
        );
      }
    }
  }, [initialImages, maxImages]);

  const addImages = (newImages: File[]) => {
    const totalImages = newImages.length + existingImages.length;
    if (totalImages > maxImages) {
      setError(`No puedes tener más de ${maxImages} imágenes en total.`);
      return;
    }
    setError(null);
    setImages(newImages);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  return {
    images,
    existingImages,
    error,
    addImages,
    removeExistingImage,
    setImages,
    setExistingImages,
  };
};
