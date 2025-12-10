import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  icon: React.ElementType;
  label: string;
  value: string;
  isStatus?: boolean;
  statusValue?: boolean;
}

export const InfoItem: React.FC<Props> = ({
  icon: Icon,
  label,
  value,
  isStatus,
  statusValue,
}) => (
  <div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
    {isStatus ? (
      <div
        className={`mt-1 text-sm font-semibold flex items-center gap-2 ${
          statusValue ? "text-emerald-700" : "text-rose-700"
        }`}
      >
        {statusValue ? (
          <CheckCircleIcon className="size-4" />
        ) : (
          <XCircleIcon className="size-4" />
        )}
        {value}
      </div>
    ) : (
      <p className="mt-1 font-semibold text-stone-800 text-sm">{value}</p>
    )}
  </div>
);
