import { Icon } from "@iconify-icon/react/dist/iconify.js";
import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PaginationBar from "../../components/common/PaginationBar";
import SearchBar from "../../components/common/SearchBar";
import MovieCard from "../../components/movies/MovieCard";
import MovieGridSkeleton from "../../components/movies/MovieGridSkeleton";
import TrailerModal from "../../components/movies/TrailerModal";
import { AuthContext } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce";
import "../../i18n/i18n";
import i18n from "../../i18n/i18n";
import { adminApi } from "../../services/apiFunctions";

const FAV_STORAGE_KEY = "fav_movies";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState(null);
  const { user, logout, theme, setTheme } = useContext(AuthContext);
  const { t } = useTranslation();

  const [_, setLangTick] = useState(0);
  useEffect(() => {
    const handler = () => setLangTick((x) => x + 1);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);

  const debouncedQuery = useDebounce(query, 700);

  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem(FAV_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const favouriteIds = useMemo(() => new Set(favourites.map((f) => f.id)), [favourites]);

  const persistFavourites = useCallback((next) => {
    setFavourites(next);
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const toggleFavourite = useCallback(
    (movie) => {
      if (favouriteIds.has(movie.id)) {
        const next = favourites.filter((m) => m.id !== movie.id);
        persistFavourites(next);
      } else {
        const compact = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        };
        persistFavourites([compact, ...favourites]);
      }
    },
    [favourites, favouriteIds, persistFavourites]
  );

  const fetchMovies = useCallback(async () => {
    setApiError("");
    const apiUrl = debouncedQuery
      ? adminApi.movies.searchMovies
      : category === "popular"
      ? adminApi.movies.getPopularMovies
      : category === "now_playing"
      ? adminApi.movies.getNowPlayingMovies
      : category === "upcoming"
      ? adminApi.movies.getUpcomingMovies
      : adminApi.movies.getTopRatedMovies;

    apiUrl({
      setIsLoading,
      params: debouncedQuery ? { query: debouncedQuery, page, limit } : { page, limit },
      onSuccess: (data) => {
        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 0);
      },
      onError: (err) => {
        setMovies([]);
        setTotalPages(0);
        setApiError(err?.message || t("errors.failedToLoadMovies"));
      },
    });
  }, [debouncedQuery, page, limit, category]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const onPrev = () => page > 1 && setPage((p) => p - 1);
  const onNext = () => page < totalPages && setPage((p) => p + 1);

  const disabledPrev = isLoading || page === 1;
  const disabledNext = isLoading || totalPages === 0 || page >= totalPages;

  const fetchTrailer = useCallback((movieId) => {
    setIsTrailerLoading(true);
    setTrailerError(null);
    setTrailerKey(null);

    const getVideos = adminApi?.movies?.getMovieVideos?.(movieId);
    if (!getVideos) {
      setTrailerError(t("errors.trailerNotAvailable"));
      setIsTrailerLoading(false);
      return;
    }

    getVideos({
      headers: { "Content-Type": "application/json" },
      onSuccess: (data) => {
        const videos = data?.results || [];
        const youtube = videos.filter((v) => v.site === "YouTube");
        const best =
          youtube.find((v) => v.type === "Trailer" && v.official) ||
          youtube.find((v) => v.type === "Trailer") ||
          youtube.find((v) => v.type === "Teaser" && v.official) ||
          youtube.find((v) => v.type === "Teaser") ||
          youtube.find((v) => v.type === "Clip") ||
          null;

        if (best?.key) setTrailerKey(best.key);
        else setTrailerError(t("errors.trailerNotFound"));
        setIsTrailerLoading(false);
      },
      onError: () => {
        setTrailerError(t("errors.trailerNotAvailable"));
        setIsTrailerLoading(false);
      },
    });
  }, []);

  const onOpenTrailer = (movie) => {
    setTrailerTitle(movie?.title || t("trailer"));
    setIsTrailerOpen(true);
    fetchTrailer(movie.id);
  };

  const onCloseTrailer = () => {
    setIsTrailerOpen(false);
    setTrailerKey(null);
    setTrailerError(null);
  };

  const [showFavourites, setShowFavourites] = useState(false);
  const visibleMovies = showFavourites ? favourites : movies;

  return (
    <div
      className={clsx(
        "min-h-screen transition-colors",
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex w-full items-center justify-between gap-4 flex-col lg:flex-row">
            <div className="flex items-center gap-2 ">
              <span className="inline-block h-6 w-1.5 rounded-full bg-indigo-600" />
              <h1 className={clsx("text-2xl font-semibold tracking-tight", theme === "dark" ? "text-white" : "text-gray-900")}>Movies List</h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => (i18n.language === "en" ? i18n.changeLanguage("hi") : i18n.changeLanguage("en"))}
                className={clsx(
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ring-1 transition flex items-center gap-2",
                  theme === "dark" ? "bg-gray-800 text-gray-100 ring-gray-700 hover:bg-gray-700" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                )}
                aria-label={i18n.language === "en" ? t("language.switchToHindi") : t("language.switchToEnglish")}
                title={i18n.language === "en" ? t("language.switchToHindi") : t("language.switchToEnglish")}
              >
                <Icon icon="ph-globe" className="h-5 w-5" />
                {i18n.language === "en" ? t("language.hindi") : t("language.english")}
              </button>

              <button
                onClick={() => setShowFavourites((s) => !s)}
                className={clsx(
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ring-1 transition flex items-center gap-2",
                  theme === "dark" ? "bg-gray-800 text-gray-100 ring-gray-700 hover:bg-gray-700" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                )}
                aria-label={showFavourites ? "Show All" : "Show Favourites"}
                title={showFavourites ? "Show All" : "Show Favourites"}
              >
                <Icon icon={showFavourites ? "ph-heart-fill" : "ph-heart"} className="h-5 w-5" />
                {showFavourites ? t("showAll") || "All" : t("favourites") || "Favourites"}
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ring-1 transition flex items-center gap-2 " +
                  (theme === "dark"
                    ? "bg-gray-800 text-gray-100 ring-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50")
                }
                aria-label={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
                title={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
              >
                <Icon icon={theme === "dark" ? "ph-sun" : "ph-moon"} className="h-5 w-5" />
                {theme === "dark" ? `${t("theme.switchToLight")}` : `${t("theme.switchToDark")}`}
              </button>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name || ""}</span>

              <button
                onClick={logout}
                className="rounded-lg cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-70"
              >
                {t("logout")}
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {["popular", "now_playing", "upcoming", "top_rated"].map((key) => (
                <button
                  key={key}
                  className={
                    "rounded-full cursor-pointer px-4 py-2 text-sm font-medium transition ring-1 " +
                    (!debouncedQuery && category === key
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50")
                  }
                  onClick={() => setCategory(key)}
                  disabled={isLoading && category !== key}
                >
                  {key === "popular"
                    ? t("popular")
                    : key === "now_playing"
                    ? t("nowPlaying")
                    : key === "upcoming"
                    ? t("upcoming")
                    : t("topRated")}
                </button>
              ))}
            </div>

            <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        {apiError && (
          <div className="mb-4 rounded-lg border px-4 py-2 text-sm border-red-200 bg-red-50 text-red-700 dark:border-red-400/40 dark:bg-red-900/20 dark:text-red-300">
            {apiError}
          </div>
        )}

        {isLoading ? (
          <MovieGridSkeleton count={limit} />
        ) : visibleMovies?.length ? (
          <div className="grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleMovies?.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onOpenTrailer={onOpenTrailer}
                isFavourite={favouriteIds.has(movie.id)}
                onToggleFavourite={() => toggleFavourite(movie)}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div
            className={
              "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center shadow-sm border-gray-300 " +
              (theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200")
            }
          >
            <div className={"text-lg font-medium " + (theme === "dark" ? "text-white" : "text-gray-900")}>
              {showFavourites ? (t("noFavourites") || "No favourites yet") : "No results"}
            </div>
            <p className={"max-w-md px-6 text-sm " + (theme === "dark" ? "text-white" : "text-gray-600")}>
              {showFavourites
                ? t("addSomeFavourites") || "Mark some movies as favourites to see them here."
                : "Try a different keyword or clear the search to explore movies."}
            </p>
          </div>
        )}

        {(!showFavourites) && (isLoading || (totalPages > 1 && (
          <PaginationBar
            page={page}
            totalPages={totalPages}
            onPrev={onPrev}
            onNext={onNext}
            disabledPrev={disabledPrev}
            disabledNext={disabledNext}
            theme={theme}
          />
        )))}
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        title={trailerTitle}
        isLoading={isTrailerLoading}
        trailerKey={trailerKey}
        error={trailerError}
        onClose={onCloseTrailer}
      />
    </div>
  );
};

export default Dashboard;
