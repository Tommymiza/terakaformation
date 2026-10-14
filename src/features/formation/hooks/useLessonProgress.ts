import { useState } from "react";
import { useNotify } from "@/components/AlertProvider";
import { useAuth, useCurrentUser } from "@/features/auth/AuthProvider";
import { api, getErrorMessage } from "@/lib/api";
import { getProgression } from "../data/catalog";

interface ProgressPatch {
  progress?: number;
  rating?: number;
}

/** Progression et note de l'utilisateur connecté pour une leçon. */
export function useLessonProgress(lessonId: number) {
  const user = useCurrentUser();
  const { refreshUser } = useAuth();
  const notify = useNotify();
  const [saving, setSaving] = useState(false);

  const current = getProgression(user, lessonId);
  const progress = current?.progress ?? 0;
  const rating = current?.rating ?? 0;

  /** Enregistre la modification puis recharge l'utilisateur. Renvoie `true` si réussi. */
  async function save(patch: ProgressPatch): Promise<boolean> {
    setSaving(true);
    try {
      // On renvoie toujours progression ET note pour qu'une mise à jour de
      // l'une n'écrase pas l'autre côté backend (updateOrCreate).
      await api.post("/updateformation", {
        chapitre: lessonId,
        progress,
        rating,
        ...patch,
      });
      await refreshUser();
      return true;
    } catch (error) {
      notify({ type: "error", message: getErrorMessage(error) });
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { progress, rating, completed: progress === 100, saving, save };
}
