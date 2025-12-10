import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      {page > 1 && (
        <Button
          onClick={() => onPageChange(page - 1)}
          className="bg-stone-100 px-0 text-stone-700 hover:bg-stone-200 rounded-lg size-10"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      )}
      {page < totalPages && (
        <Button
          onClick={() => onPageChange(page + 1)}
          className="bg-stone-100 px-0 text-stone-700 hover:bg-stone-200 rounded-lg size-10"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
