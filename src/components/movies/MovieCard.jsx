import clsx from "clsx";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MovieCard = ({ movie, onOpenTrailer, onToggleFavourite, isFavourite, theme }) => {
  const { t } = useTranslation();
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-lg",
        theme === "dark" ? "bg-gray-800 text-white ring-gray-700" : "bg-white text-gray-900 ring-gray-200"
      )}
    >

      <button onClick={() => onOpenTrailer(movie)} className="relative h-72 w-full overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-gray-100 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            {t("noImage") || "No Image"}
          </div>
        )}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
          <span className="rounded-full cursor-pointer bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900">
            {t("trailer")}
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-1 text-base font-semibold">{movie.title}</h2>

        <div
          className={clsx(
            "relative flex-1 text-sm leading-relaxed rounded-md pr-1 transition-all",
            showScroll
              ? "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
              : "overflow-hidden"
          )}
          style={{
            maxHeight: "160px",
            scrollbarGutter: "stable",
          }}
        >
          <p className="mb-3">{movie.overview || t("noOverview") || "No description available."}</p>

          {showScroll && (
            <div
              className={clsx(
                "grid grid-cols-2 gap-2 text-xs pb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
            >
              <div>
                <span className="font-semibold">{t("releaseDate") || "Release"}:</span>{" "}
                {movie.release_date || "N/A"}
              </div>
              <div>
                <span className="font-semibold">{t("rating") || "Rating"}:</span>{" "}
                {movie.vote_average?.toFixed(1) ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">{t("language") || "Language"}:</span>{" "}
                {(movie.original_language || "").toUpperCase() || "N/A"}
              </div>
              <div>
                <span className="font-semibold">{t("votes") || "Votes"}:</span>{" "}
                {movie.vote_count ?? "N/A"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <button
            onClick={() => onToggleFavourite(movie)}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition",
              isFavourite
                ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-700/30 dark:text-red-300 dark:hover:bg-red-700/40"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            <Icon icon={isFavourite ? "ph-heart-break" : "ph-heart"} className="w-4 h-4" />
            {isFavourite ? t("removeFromFavourite") || "Remove from Favourites" : t("addToFavourite") || "Add to Favourites"}
          </button>

          <span
            className={clsx(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
            )}
          >
            {t("id")}: {movie.id}
          </span>

            <button
            onClick={() => setShowScroll((s) => !s)}
            className={clsx(
              "mt-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium ring-1 transition",
              theme === "dark"
                ? "bg-gray-800 text-gray-100 ring-gray-700 hover:bg-gray-700"
                : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
            )}
            aria-expanded={showScroll}
          >
            <Icon icon={showScroll ? "ph-caret-up" : "ph-caret-down"} className="h-4 w-4" />
            {showScroll ? t("showLess") || "Show Less" : t("showMore") || "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
