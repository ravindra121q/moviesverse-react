import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieGridSkeleton = ({ count = 8 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default MovieGridSkeleton;
