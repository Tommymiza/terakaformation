import {
  ArrowForwardRounded,
  CheckCircleRounded,
  LockRounded,
  ViewListRounded,
  ViewModuleRounded,
} from "@mui/icons-material";
import { Rating, Tooltip } from "@mui/material";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Card, PageHeader } from "@/components/ui";
import { useCurrentUser } from "@/features/auth/AuthProvider";
import { storage } from "@/lib/storage";
import ProgressBar from "../components/ProgressBar";
import {
  CHAPTERS,
  chapterPath,
  getProgression,
  isChapterUnlocked,
  lessonPath,
  type Chapter,
  type Lesson,
} from "../data/catalog";
import { useRatings } from "../hooks/useRatings";

type View = "grid" | "list";

interface LessonState {
  chapter: Chapter;
  lesson: Lesson;
  locked: boolean;
  progress: number;
}

/** Lien vers la leçon, ou bloc inactif avec info-bulle si le chapitre est verrouillé. */
function LessonLink({
  state,
  className,
  children,
}: {
  state: LessonState;
  className: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  if (state.locked) {
    return (
      <Tooltip title={t("tooltip")} placement="top">
        <div className={`${className} cursor-not-allowed`} aria-disabled="true">
          {children}
        </div>
      </Tooltip>
    );
  }
  return (
    <Link to={lessonPath(state.chapter, state.lesson)} className={className}>
      {children}
    </Link>
  );
}

function StatusBadge({ locked, done }: { locked: boolean; done: boolean }) {
  const { t } = useTranslation();
  if (locked) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-brand-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        <LockRounded sx={{ fontSize: 14 }} />
      </span>
    );
  }
  if (done) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-card">
        <CheckCircleRounded sx={{ fontSize: 14 }} /> {t("login.label.18")}
      </span>
    );
  }
  return null;
}

function LessonCard({ state, rating }: { state: LessonState; rating: number }) {
  const { t } = useTranslation();
  const { chapter, lesson, locked, progress } = state;
  return (
    <LessonLink
      state={state}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-brand-100">
        <img
          src={lesson.image}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            locked ? "grayscale" : ""
          }`}
        />
        <div className="absolute left-3 top-3">
          <StatusBadge locked={locked} done={progress === 100} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          {chapter.roman}-{Number(lesson.slug)}
        </p>
        <h3 className="line-clamp-2 font-semibold leading-snug text-brand-900">
          {t(lesson.titleKey)}
        </h3>
        <Rating readOnly size="small" value={rating} precision={0.5} />
        <div className="mt-auto pt-2">
          <ProgressBar value={progress} />
        </div>
      </div>
    </LessonLink>
  );
}

function LessonRow({ state }: { state: LessonState }) {
  const { t } = useTranslation();
  const { lesson, locked, progress } = state;
  return (
    <li>
      <LessonLink
        state={state}
        className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-500 sm:px-4"
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${
            progress === 100
              ? "bg-brand-600 text-white"
              : "bg-brand-100 text-brand-800"
          }`}
        >
          {locked ? <LockRounded sx={{ fontSize: 16 }} /> : lesson.slug}
        </span>
        <span
          className={`min-w-0 flex-1 font-medium ${locked ? "text-brand-950/50" : "text-brand-900"}`}
        >
          {t(lesson.titleKey)}
        </span>
        <div className="hidden w-40 sm:block">
          <ProgressBar value={progress} />
        </div>
      </LessonLink>
    </li>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  const options: { value: View; label: string; icon: ReactNode }[] = [
    {
      value: "grid",
      label: "Vue en grille",
      icon: <ViewModuleRounded fontSize="small" />,
    },
    {
      value: "list",
      label: "Vue en ligne",
      icon: <ViewListRounded fontSize="small" />,
    },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Affichage"
      className="inline-flex rounded-xl bg-white p-1 shadow-card ring-1 ring-brand-100"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={view === o.value}
          aria-label={o.label}
          title={o.label}
          onClick={() => onChange(o.value)}
          className={`grid size-9 place-items-center rounded-lg transition ${
            view === o.value
              ? "bg-brand-600 text-white"
              : "text-brand-800 hover:bg-brand-50"
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}

export default function CatalogPage() {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const ratings = useRatings();
  const [view, setView] = useState<View>(storage.getCatalogView);

  const changeView = (v: View) => {
    storage.setCatalogView(v);
    setView(v);
  };

  const states = (chapter: Chapter): LessonState[] =>
    chapter.lessons.map((lesson) => ({
      chapter,
      lesson,
      locked: !isChapterUnlocked(user, chapter),
      progress: getProgression(user, lesson.id)?.progress ?? 0,
    }));

  const allLessons = CHAPTERS.flatMap((c) => c.lessons);
  const doneCount = allLessons.filter(
    (l) => getProgression(user, l.id)?.progress === 100,
  ).length;

  return (
    <div>
      <PageHeader
        eyebrow={`${user.prenom} · ${user.points} points`}
        title={t("home.head")}
        actions={
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-4 py-2 shadow-card ring-1 ring-brand-100">
              <p className="text-xl font-semibold tabular-nums text-brand-900">
                {doneCount}/{allLessons.length}
              </p>
              <p className="text-xs text-brand-950/60">{t("login.label.18")}</p>
            </div>
            <ViewToggle view={view} onChange={changeView} />
          </div>
        }
      />

      <div className="flex flex-col gap-14">
        {CHAPTERS.map((chapter) => {
          const lessons = states(chapter);
          const locked = lessons[0].locked;
          return (
            <section
              key={chapter.number}
              aria-labelledby={`chapter-${chapter.number}`}
            >
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex max-w-3xl gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-900 text-lg font-semibold text-white">
                    {chapter.roman}
                  </span>
                  <div>
                    <h2
                      id={`chapter-${chapter.number}`}
                      className="text-xl font-semibold text-brand-900 sm:text-2xl"
                    >
                      {t(chapter.titleKey)}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-brand-950/70">
                      {t(chapter.descriptionKey)}
                    </p>
                  </div>
                </div>
                {locked ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1.5 text-sm font-medium text-brand-900">
                    <LockRounded sx={{ fontSize: 16 }} /> {t("tooltip")}
                  </span>
                ) : (
                  <Link
                    to={chapterPath(chapter)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-brand-600 hover:bg-brand-100 hover:text-brand-800"
                  >
                    {t("button.11")}{" "}
                    <ArrowForwardRounded sx={{ fontSize: 16 }} />
                  </Link>
                )}
              </div>

              {view === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {lessons.map((state) => (
                    <LessonCard
                      key={state.lesson.id}
                      state={state}
                      rating={ratings.get(state.lesson.id) ?? 0}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-2 sm:p-3">
                  <ul className="divide-y divide-brand-100">
                    {lessons.map((state) => (
                      <LessonRow key={state.lesson.id} state={state} />
                    ))}
                  </ul>
                </Card>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
