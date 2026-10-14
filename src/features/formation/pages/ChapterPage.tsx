import {
  CheckCircleRounded,
  ChevronRightRounded,
  LockRounded,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import NotFound from "@/components/NotFound";
import { Card, PageHeader } from "@/components/ui";
import { useCurrentUser } from "@/features/auth/AuthProvider";
import ProgressBar from "../components/ProgressBar";
import {
  findChapter,
  getProgression,
  isChapterUnlocked,
  lessonPath,
} from "../data/catalog";

export default function ChapterPage() {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const chapter = findChapter(useParams().chapter);

  if (!chapter) return <NotFound />;
  const locked = !isChapterUnlocked(user, chapter);

  return (
    <div>
      <PageHeader
        eyebrow={`Chapitre ${chapter.roman}`}
        title={t(chapter.titleKey)}
        description={t(chapter.descriptionKey)}
      />

      {locked && (
        <p className="mb-6 flex items-center gap-2 rounded-2xl bg-sand-100 px-4 py-3 font-medium text-brand-900">
          <LockRounded fontSize="small" /> {t("tooltip")}
        </p>
      )}

      <Card className="p-2 sm:p-3">
        <ol className="divide-y divide-brand-100">
          {chapter.lessons.map((lesson) => {
            const progress = getProgression(user, lesson.id)?.progress ?? 0;
            const done = progress === 100;
            const content = (
              <>
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full font-semibold ${
                    done
                      ? "bg-brand-600 text-white"
                      : "bg-brand-100 text-brand-800"
                  }`}
                >
                  {done ? <CheckCircleRounded fontSize="small" /> : lesson.slug}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-brand-900">
                    {t(lesson.titleKey)}
                  </span>
                  <span className="mt-1.5 block max-w-xs">
                    <ProgressBar value={progress} />
                  </span>
                </span>
                {locked ? (
                  <LockRounded className="text-brand-950/40" />
                ) : (
                  <ChevronRightRounded className="text-brand-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700" />
                )}
              </>
            );
            const rowClass =
              "group flex items-center gap-4 rounded-2xl px-3 py-4 sm:px-4";
            return (
              <li key={lesson.id}>
                {locked ? (
                  <div
                    className={`${rowClass} opacity-60`}
                    aria-disabled="true"
                  >
                    {content}
                  </div>
                ) : (
                  <Link
                    to={lessonPath(chapter, lesson)}
                    className={`${rowClass} transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-500`}
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
