import { cn } from "@/utilities";

interface Props {
  title: string;
  description: string;
  icon: React.ElementType;
  color?:
    | "rose"
    | "emerald"
    | "yellow"
    | "blue"
    | "purple"
    | "pink"
    | "gray"
    | "stone";
}

// Mapeo de colores con clases completas de Tailwind
const colorVariants = {
  rose: {
    background: "bg-rose-500/10",
    textPrimary: "text-rose-800",
    textSecondary: "text-rose-700",
    icon: "text-rose-800",
  },
  emerald: {
    background: "bg-emerald-500/10",
    textPrimary: "text-emerald-800",
    textSecondary: "text-emerald-700",
    icon: "text-emerald-800",
  },
  yellow: {
    background: "bg-yellow-500/10",
    textPrimary: "text-yellow-800",
    textSecondary: "text-yellow-700",
    icon: "text-yellow-800",
  },
  blue: {
    background: "bg-blue-500/10",
    textPrimary: "text-blue-800",
    textSecondary: "text-blue-700",
    icon: "text-blue-800",
  },
  purple: {
    background: "bg-purple-500/10",
    textPrimary: "text-purple-800",
    textSecondary: "text-purple-700",
    icon: "text-purple-800",
  },
  pink: {
    background: "bg-pink-500/10",
    textPrimary: "text-pink-800",
    textSecondary: "text-pink-700",
    icon: "text-pink-800",
  },
  gray: {
    background: "bg-gray-500/10",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-700",
    icon: "text-gray-800",
  },
  stone: {
    background: "bg-stone-500/10",
    textPrimary: "text-stone-800",
    textSecondary: "text-stone-500",
    icon: "text-stone-500",
  },
};

export const StatusMessage: React.FC<Props> = ({
  title,
  description,
  icon: Icon,
  color = "rose",
}) => {
  const colorClasses = colorVariants[color];

  return (
    <div
      className={cn(
        "col-span-1 lg:col-span-1 w-full h-full max-h-[675px] flex items-center justify-center flex-col text-center p-10 md:p-24 rounded-lg",
        colorClasses.background
      )}
    >
      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <Icon className={cn("size-8 md:size-10", colorClasses.icon)} />
        <h2
          className={cn(
            "text-lg md:text-2xl font-serif mt-4 font-bold",
            colorClasses.textPrimary
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "text-xs sm:text-sm mt-2  sm:mt-2 text-center",
            colorClasses.textSecondary
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
