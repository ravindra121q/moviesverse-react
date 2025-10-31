const MovieCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="h-72 w-full animate-pulse bg-gray-200" />
      <div className="p-4">
        <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mb-1 h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-1 h-3 w-11/12 animate-pulse rounded bg-gray-200" />
        <div className="mb-1 h-3 w-10/12 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-6 w-28 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
