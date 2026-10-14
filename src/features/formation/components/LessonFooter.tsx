import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckRounded,
} from "@mui/icons-material";
import { Button, Rating } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useNotify } from "@/components/AlertProvider";
import { Card } from "@/components/ui";
import {
  isLastLessonOfChapter,
  nextLessonPath,
  previousLessonPath,
  type Chapter,
  type Lesson,
} from "../data/catalog";
import { useLessonProgress } from "../hooks/useLessonProgress";

interface Props {
  chapter: Chapter;
  lesson: Lesson;
}

/** Notation de la leçon et navigation (précédent / « Suite » ou « Terminer »). */
export default function LessonFooter({ chapter, lesson }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { rating, saving, save, completed } = useLessonProgress(lesson.id);
  const previous = previousLessonPath(chapter, lesson);
  const last = isLastLessonOfChapter(chapter, lesson);

  const complete = async () => {
    if (await save({ progress: 100 })) {
      notify({ type: "success", message: t("alert.2") });
      navigate(nextLessonPath(chapter, lesson));
    }
  };

  return (
    <Card className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between sm:p-8">
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <Rating
          size="large"
          value={rating}
          disabled={saving}
          onChange={(_, value) => {
            if (value) void save({ rating: value });
          }}
        />
        {completed && (
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            <CheckRounded fontSize="small" /> {t("login.label.18")}
          </span>
        )}
      </div>
      <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
        {previous && (
          <Button
            component={Link}
            to={previous}
            variant="outlined"
            size="large"
            startIcon={<ArrowBackRounded />}
          >
            {t("button.14")}
          </Button>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={complete}
          loading={saving}
          endIcon={last ? <CheckRounded /> : <ArrowForwardRounded />}
        >
          {last ? t("button.13") : t("button.12")}
        </Button>
      </div>
    </Card>
  );
}
