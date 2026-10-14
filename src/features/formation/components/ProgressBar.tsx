import { useTranslation } from "react-i18next";

export default function ProgressBar({ value }: { value: number }) {
  const { t } = useTranslation();
  const percent = Math.round(value);
  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("login.label.18")}
        className="h-2 flex-1 overflow-hidden rounded-full bg-brand-100"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            percent === 100 ? "bg-brand-600" : "bg-brand-400"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-semibold tabular-nums text-brand-950/60">
        {percent}%
      </span>
    </div>
  );
}
