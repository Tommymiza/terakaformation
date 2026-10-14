// Formes renvoyées par le backend (terakaback, MembresController).

export interface Progression {
  /** Identifiant de la leçon (101, 102, 201…). */
  chapitre: number;
  progress: number | null;
  rating: number | null;
}

export interface User {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string | null;
  phone: string | null;
  points: number;
  is_verified: boolean;
  progressions: Progression[];
}

export interface LessonRating {
  chapitre: number;
  /** Moyenne calculée par MySQL, renvoyée sous forme de chaîne. */
  rating: string | number;
}
