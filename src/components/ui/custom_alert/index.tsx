import { cn } from "@/utilities";

interface Props {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const colorVariants = {
  sky: "bg-sky-800/10 text-sky-800",
  emerald: "bg-emerald-800/10 text-emerald-800",
  rose: "bg-rose-800/10 text-rose-800",
  amber: "bg-amber-800/10 text-amber-800",
  stone: "bg-stone-800/10 text-stone-800",
} as const;

export const CustomAlert = ({
  title,
  description,
  icon: Icon,
  color,
}: Props) => {
  const variant =
    colorVariants[color as keyof typeof colorVariants] || colorVariants.stone;
  const bgClasses = variant.split(" ")[0]; // bg-color-800/10
  const textClasses = variant.split(" ")[1]; // text-color-800

  return (
    <div
      className={cn(
        "p-4 mb-4 flex gap-4 items-center flex-wrap rounded-lg",
        bgClasses
      )}
    >
      <div
        className={cn(
          "size-10 flex items-center justify-center rounded-lg",
          bgClasses
        )}
      >
        <Icon className={cn("size-5", textClasses)} />
      </div>
      <div>
        <h3 className={cn("text-sm font-bold", textClasses)}>{title}</h3>
        <p className={cn("text-sm", textClasses)}>{description}</p>
      </div>
    </div>
  );
};
