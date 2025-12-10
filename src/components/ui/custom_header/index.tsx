import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  to?: string;
  title: string;
  classNameTitle?: string;
  classNameLink?: string;
}

export const CustomHeader: React.FC<Props> = ({
  to,
  title,
  classNameTitle,
  classNameLink,
}) => (
  <div className="flex flex-col gap-4">
    {to && (
      <Link
        to={to}
        className={twMerge(
          "bg-stone-50 size-10 sm:size-12 flex items-center justify-center rounded-full border-none shadow-none transition-all hover:bg-stone-100 cursor-pointer",
          classNameLink
        )}
      >
        <ArrowLeftIcon className="size-3.5 sm:size-4" />
      </Link>
    )}
    <h2
      className={twMerge(
        "text-2xl sm:text-3xl font-serif font-bold text-stone-900",
        classNameTitle
      )}
    >
      {title}
    </h2>
  </div>
);
