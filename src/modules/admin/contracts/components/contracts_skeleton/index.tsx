import { Skeleton } from "@/components/ui";

const CardSkeleton = () => (
  <div className="rounded-lg bg-stone-50 p-4">
    <div className="flex items-start justify-between gap-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
    <div className="mt-4 space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
    <Skeleton className="mt-4 h-2 w-full rounded-full" />
  </div>
);

export const ContractsSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);
