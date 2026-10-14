import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import NotFound from "@/components/NotFound";
import PageLoader from "@/components/PageLoader";
import { PageHeader } from "@/components/ui";
import { useCurrentUser } from "@/features/auth/AuthProvider";
import LessonFooter from "../components/LessonFooter";
import Quiz from "../components/Quiz";
import {
  findLesson,
  isChapterUnlocked,
  isLessonCompleted,
  type Chapter,
  type Lesson,
} from "../data/catalog";

function LessonView({ chapter, lesson }: { chapter: Chapter; lesson: Lesson }) {
  const { t } = useTranslation();
  const notify = useNotify();
  const user = useCurrentUser();
  const { Content } = lesson;

  // Rappel à l'ouverture d'une leçon déjà terminée.
  const alreadyCompleted = isLessonCompleted(user, lesson.id);
  useEffect(() => {
    if (alreadyCompleted) notify({ type: "success", message: t("alert.2") });
    // Uniquement à l'arrivée sur la leçon, pas quand elle vient d'être terminée.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        eyebrow={`${chapter.roman}-${Number(lesson.slug)} · ${t(chapter.titleKey)}`}
        title={t(lesson.titleKey)}
      />
      <div className="lesson-content">
        <Suspense fallback={<PageLoader />}>
          <Content />
        </Suspense>
      </div>
      <LessonFooter chapter={chapter} lesson={lesson} />
      {lesson.quiz && <Quiz key={lesson.id} questions={lesson.quiz} />}
    </article>
  );
}

export default function LessonPage() {
  const { t } = useTranslation();
  const notify = useNotify();
  const user = useCurrentUser();
  const params = useParams();
  const found = findLesson(params.chapter, params.lesson);
  const locked = found ? !isChapterUnlocked(user, found.chapter) : false;

  useEffect(() => {
    if (locked) notify({ type: "warning", message: t("tooltip") });
  }, [locked, notify, t]);

  if (!found) return <NotFound />;
  if (locked) return <Navigate to="/cours" replace />;
  return <LessonView key={found.lesson.id} {...found} />;
}
