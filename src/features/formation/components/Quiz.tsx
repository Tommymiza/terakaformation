import { QuizRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNotify } from "@/components/AlertProvider";
import { Card } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthProvider";
import { api, getErrorMessage } from "@/lib/api";
import type { QuizQuestion } from "../data/quizzes";

const POINTS_PER_ANSWER = 10;

function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

/** +10 points par bonne réponse cochée, -10 par mauvaise, jamais négatif. */
function computePoints(question: QuizQuestion, checked: number[]) {
  const score = checked.reduce(
    (acc, i) => acc + (question.correct.includes(i) ? 1 : -1),
    0,
  );
  return Math.max(0, score * POINTS_PER_ANSWER);
}

/** Pose une question tirée au hasard ; une nouvelle est tirée après chaque réponse. */
export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { t } = useTranslation();
  const notify = useNotify();
  const { refreshUser } = useAuth();
  const [index, setIndex] = useState(() => randomIndex(questions.length));
  const [checked, setChecked] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const question = questions[index];

  const toggle = (answer: number, isChecked: boolean) => {
    setChecked((prev) =>
      isChecked ? [...prev, answer] : prev.filter((i) => i !== answer),
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/updatepoints", {
        points: computePoints(question, checked),
      });
      notify({ type: "success", message: t("alert.1") });
      await refreshUser();
      setChecked([]);
      setIndex(randomIndex(questions.length));
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-5 flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sand-100 text-brand-800">
          <QuizRounded />
        </span>
        <h2 className="pt-2 text-lg font-semibold text-brand-900">
          {question.question}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">{question.question}</legend>
          {question.reponses.map((reponse, i) => (
            <label
              key={`${index}-${i}`}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 transition hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-400"
            >
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-brand-600"
                checked={checked.includes(i)}
                onChange={(e) => toggle(i, e.target.checked)}
              />
              <span>{reponse}</span>
            </label>
          ))}
        </fieldset>
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={submitting}
          disabled={checked.length === 0}
          className="self-end"
        >
          {t("button.10")}
        </Button>
      </form>
    </Card>
  );
}
