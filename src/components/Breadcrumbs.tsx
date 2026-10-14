import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router";
import { findChapter, findLesson } from "@/features/formation/data/catalog";

interface Crumb {
  to: string;
  label: ReactNode;
}

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const label = (segment: string, i: number): ReactNode => {
    if (segments[0] === "cours") {
      if (i === 1) {
        const chapter = findChapter(segment);
        if (chapter) return `${chapter.roman}. ${t(chapter.titleKey)}`;
      }
      if (i === 2) {
        const found = findLesson(segments[1], segment);
        if (found) return `${segment}. ${t(found.lesson.titleKey)}`;
      }
    }
    // Les jetons (lien de réinitialisation…) ne sont pas affichés.
    return segment.length > 30 ? null : decodeURIComponent(segment);
  };

  const crumbs: Crumb[] = [
    {
      to: "/",
      label: <HomeRounded sx={{ fontSize: 18 }} aria-label="Accueil" />,
    },
    ...segments.map((segment, i) => ({
      to: "/" + segments.slice(0, i + 1).join("/"),
      label: label(segment, i),
    })),
  ].filter((c) => c.label !== null);

  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-950/60">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.to} className="flex min-w-0 items-center gap-1">
              <NavLink
                to={crumb.to}
                end
                aria-current={last ? "page" : undefined}
                className={`inline-block truncate rounded-md align-middle leading-6 px-1.5 py-0.5 transition first-letter:uppercase hover:bg-brand-100 hover:text-brand-900 ${
                  last
                    ? "max-w-[60vw] font-semibold text-brand-900"
                    : "max-w-[30vw]"
                }`}
              >
                {crumb.label}
              </NavLink>
              {!last && (
                <ChevronRightRounded
                  sx={{ fontSize: 16 }}
                  className="opacity-50"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
