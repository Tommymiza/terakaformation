import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { User } from "@/types/user";
import { QUIZZES, type QuizQuestion } from "./quizzes";

// Source unique de vérité pour la structure de la formation : chapitres, leçons,
// ordre, déblocage et URL. Pour ajouter une leçon :
//   1. créer son contenu dans lessons/LessonXYZ.tsx ;
//   2. ajouter son titre dans les locales (cours.<chapitre>.liste.<n>.titre) ;
//   3. l'ajouter ci-dessous (et son QCM éventuel dans quizzes.ts).

export interface Lesson {
  /** Identifiant stocké en base (table progressions, colonne `chapitre`). */
  id: number;
  /** Numéro affiché et utilisé dans l'URL : "01", "02"… */
  slug: string;
  titleKey: string;
  image: string;
  quiz?: QuizQuestion[];
  Content: LazyExoticComponent<ComponentType>;
}

export interface Chapter {
  /** Numéro du chapitre (1, 2…), utilisé dans l'URL. */
  number: number;
  roman: string;
  titleKey: string;
  descriptionKey: string;
  lessons: Lesson[];
}

const CONTENTS: Record<number, () => Promise<{ default: ComponentType }>> = {
  101: () => import("../lessons/Lesson101"),
  102: () => import("../lessons/Lesson102"),
  201: () => import("../lessons/Lesson201"),
  202: () => import("../lessons/Lesson202"),
  203: () => import("../lessons/Lesson203"),
  204: () => import("../lessons/Lesson204"),
  205: () => import("../lessons/Lesson205"),
  206: () => import("../lessons/Lesson206"),
  207: () => import("../lessons/Lesson207"),
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function buildChapter(number: number, lessonIds: number[]): Chapter {
  const index = number - 1;
  return {
    number,
    roman: ROMAN[index],
    titleKey: `cours.${index}.titre`,
    descriptionKey: `cours.${index}.descri`,
    lessons: lessonIds.map((id, i) => ({
      id,
      slug: String(i + 1).padStart(2, "0"),
      titleKey: `cours.${index}.liste.${i}.titre`,
      image: `/images/${id}.jpg`,
      quiz: QUIZZES[id],
      Content: lazy(CONTENTS[id]),
    })),
  };
}

export const CHAPTERS: Chapter[] = [
  buildChapter(1, [101, 102]),
  buildChapter(2, [201, 202, 203, 204, 205, 206, 207]),
];

export function findChapter(chapterParam: string | undefined) {
  return CHAPTERS.find((c) => String(c.number) === chapterParam);
}

export function findLesson(
  chapterParam: string | undefined,
  slugParam: string | undefined,
) {
  const chapter = findChapter(chapterParam);
  const lesson = chapter?.lessons.find((l) => l.slug === slugParam);
  return chapter && lesson ? { chapter, lesson } : undefined;
}

export function chapterPath(chapter: Chapter) {
  return `/cours/${chapter.number}`;
}

export function lessonPath(chapter: Chapter, lesson: Lesson) {
  return `/cours/${chapter.number}/${lesson.slug}`;
}

/** Chemin de la leçon qui suit (dans le chapitre ou le suivant), sinon le catalogue. */
export function nextLessonPath(chapter: Chapter, lesson: Lesson) {
  const i = chapter.lessons.indexOf(lesson);
  if (i < chapter.lessons.length - 1) {
    return lessonPath(chapter, chapter.lessons[i + 1]);
  }
  const next = CHAPTERS[CHAPTERS.indexOf(chapter) + 1];
  return next ? lessonPath(next, next.lessons[0]) : "/cours";
}

/** Chemin de la leçon précédente (dans le chapitre ou le précédent), sinon `null`. */
export function previousLessonPath(chapter: Chapter, lesson: Lesson) {
  const i = chapter.lessons.indexOf(lesson);
  if (i > 0) return lessonPath(chapter, chapter.lessons[i - 1]);
  const previous = CHAPTERS[CHAPTERS.indexOf(chapter) - 1];
  return previous ? lessonPath(previous, previous.lessons.at(-1)!) : null;
}

export function isLastLessonOfChapter(chapter: Chapter, lesson: Lesson) {
  return chapter.lessons.at(-1) === lesson;
}

export function getProgression(user: User, lessonId: number) {
  return user.progressions.find((p) => p.chapitre === lessonId);
}

export function isLessonCompleted(user: User, lessonId: number) {
  return getProgression(user, lessonId)?.progress === 100;
}

/** Un chapitre est accessible quand toutes les leçons du précédent sont terminées. */
export function isChapterUnlocked(user: User, chapter: Chapter) {
  const previous = CHAPTERS[CHAPTERS.indexOf(chapter) - 1];
  return (
    !previous || previous.lessons.every((l) => isLessonCompleted(user, l.id))
  );
}
