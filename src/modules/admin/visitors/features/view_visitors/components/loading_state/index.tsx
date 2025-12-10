export const LoadingState = () => (
  <div className="w-full mt-8 space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="bg-stone-50 rounded-lg p-4 animate-pulse ">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-stone-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-stone-200 rounded-lg w-3/4"></div>
            <div className="h-3 bg-stone-200 rounded-lg w-1/2"></div>
          </div>
          <div className="w-20 h-8 bg-stone-200 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
);
