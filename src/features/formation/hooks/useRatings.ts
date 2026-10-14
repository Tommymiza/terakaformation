import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { LessonRating } from "@/types/user";

/** Note moyenne de chaque leçon (tous membres confondus), indexée par id de leçon. */
export function useRatings(): Map<number, number> {
  const [ratings, setRatings] = useState(() => new Map<number, number>());

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ ratings: LessonRating[] }>("/ratings")
      .then(({ data }) => {
        if (cancelled) return;
        setRatings(
          new Map(data.ratings.map((r) => [r.chapitre, Number(r.rating)])),
        );
      })
      .catch(() => {
        // Les notes sont décoratives : en cas d'échec on affiche 0 étoile.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return ratings;
}
