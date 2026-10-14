import type { ReactNode } from "react";

/** Surface blanche arrondie, brique de base des pages. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-white shadow-card ring-1 ring-brand-100 ${className}`}
    >
      {children}
    </div>
  );
}

/** Titre de page avec surtitre et description optionnels. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-brand-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-brand-950/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {actions}
    </header>
  );
}
