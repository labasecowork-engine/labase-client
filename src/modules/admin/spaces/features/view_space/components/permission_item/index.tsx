import { Check, X } from "lucide-react";
interface Props {
  label: string;
  allowed: boolean;
}

export const PermissionItem: React.FC<Props> = ({ label, allowed }) => (
  <div
    className={`flex items-center gap-2 p-3 rounded-lg bg-stone-100 text-sm ${
      allowed
        ? "bg-stone-50 border-stone-200 text-stone-800"
        : "bg-stone-50 border-stone-200 text-stone-500"
    }`}
  >
    <div
      className={`flex items-center justify-center size-4 rounded-full ${
        allowed ? "bg-stone-500" : "bg-stone-300"
      }`}
    >
      {allowed ? (
        <Check className="size-3 text-white" />
      ) : (
        <X className="size-3 text-stone-500" />
      )}
    </div>
    <span className={`${!allowed && "line-through"}`}>{label}</span>
  </div>
);
