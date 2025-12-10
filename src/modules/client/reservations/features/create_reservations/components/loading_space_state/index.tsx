const SpaceCardSkeleton = () => (
  <div className="flex-shrink-0 w-80 h-[380px] bg-stone-100 rounded-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-stone-200"></div>
    <div className="p-4">
      <div className="h-4 bg-stone-200 rounded-lg w-3/4 mb-3"></div>
      <div className="h-3 bg-stone-200 rounded-lg w-full mb-1"></div>
      <div className="h-3 bg-stone-200 rounded-lg w-5/6 mb-4"></div>
      <div className="h-3 bg-stone-200 rounded-lg w-1/2"></div>
    </div>
  </div>
);

export const LoadingSpaceState = () => (
  <>
    <SpaceCardSkeleton />
    <SpaceCardSkeleton />
    <SpaceCardSkeleton />
    <SpaceCardSkeleton />
    <SpaceCardSkeleton />
  </>
);
