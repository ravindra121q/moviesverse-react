import { useTranslation } from "react-i18next";
const PaginationBar = ({ page, totalPages, onPrev, onNext, disabledPrev, disabledNext }) => {
  const { t } = useTranslation();
  return (
    <div className="sticky bottom-0 z-10 mx-auto flex max-w-xl items-center justify-center gap-4 rounded-2xl bg-white/70 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <button
        className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onPrev}
        disabled={disabledPrev}
      >
        {t("previous")}
      </button>
      <span className="select-none self-center text-sm text-gray-700">
        Page {totalPages ? page : 0} of {totalPages}
      </span>
      <button
        className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onNext}
        disabled={disabledNext}
      >
        {t("next")}
      </button>
    </div>
  );
};

export default PaginationBar;
