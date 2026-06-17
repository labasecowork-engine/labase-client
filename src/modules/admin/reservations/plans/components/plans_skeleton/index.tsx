import { Skeleton } from "@/components/ui";

const CardSkeleton = () => (
  <div className="rounded-lg bg-stone-50 p-5">
    <div className="flex items-start justify-between gap-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
      <Skeleton className="size-7 rounded-md" />
    </div>
    <Skeleton className="mt-4 h-7 w-32" />
    <div className="mt-4 space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-3 w-full" />
      ))}
    </div>
  </div>
);

export const PlansSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);
