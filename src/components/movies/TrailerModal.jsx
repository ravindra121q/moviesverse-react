import { ButtonLoader } from "../../components/common/Loading/LoadingSpinner";

const TrailerModal = ({ isOpen, title, isLoading, trailerKey, error, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg cursor-pointer bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            Close
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <ButtonLoader color="white" />
            </div>
          ) : trailerKey ? (
            <iframe
              key={trailerKey}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/80">
              {error || "Trailer not available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
