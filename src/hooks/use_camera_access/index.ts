import { useEffect, useState, useCallback } from "react";

export function useCameraAccess() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkCameraAccess = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("API no disponible");
      setHasAccess(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasAccess(true);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      setHasAccess(false);
    }
  }, []);

  useEffect(() => {
    checkCameraAccess();
  }, [checkCameraAccess]);

  return {
    hasAccess,
    error,
    requestPermission: checkCameraAccess,
  };
}
