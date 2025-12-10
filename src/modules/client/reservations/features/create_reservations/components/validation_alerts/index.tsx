import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  errors: string[];
  warnings: string[];
  className?: string;
}

export const ValidationAlerts = ({
  errors,
  warnings,
  className = "",
}: Props) => {
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Errores */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div key={index} className="text-sm">
                  • {error}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Advertencias */}
      {warnings.length > 0 && (
        <Alert variant="default" className="border-yellow-200 bg-yellow-50">
          <InformationCircleIcon className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <div className="space-y-1 text-yellow-800">
              {warnings.map((warning, index) => (
                <div key={index} className="text-sm">
                  • {warning}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
