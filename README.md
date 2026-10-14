# Formation TERAKA

Centre d'apprentissage en ligne TERAKA (formation.teraka.org).

React 19 · TypeScript · Vite · MUI · i18next · React Router

## Démarrer

```bash
cp .env.example .env   # puis renseigner VITE_API_URL (URL de terakaback)
npm install
npm run dev            # http://localhost:3000
```

| Script              | Rôle                                         |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | serveur de développement                     |
| `npm run build`     | vérification TypeScript + build dans `build/` |
| `npm run preview`   | sert le build localement                     |
| `npm run typecheck` | vérification TypeScript seule                |
| `npm run lint`      | ESLint                                       |

## Structure

```
src/
  main.tsx                 point d'entrée (providers : thème, alertes, auth, routeur)
  App.tsx                  routes et mise en page
  lib/                     api (axios + jeton), i18n, stockage local, thème MUI
  components/              éléments partagés (Navbar, fil d'Ariane, alertes…)
  features/
    auth/                  connexion, inscription, mot de passe oublié/réinitialisation
      AuthProvider.tsx     utilisateur connecté, login/logout/refreshUser
      guards.tsx           RequireAuth / GuestOnly
    formation/
      data/catalog.ts      SOURCE UNIQUE : chapitres, leçons, ordre, déblocage, URL
      data/quizzes.ts      QCM par leçon
      lessons/             contenu de chaque leçon (uniquement le contenu)
      components/          pied de leçon (note + « Suite »), QCM, barre de progression
      hooks/               progression d'une leçon, notes moyennes
      pages/               catalogue, chapitre, leçon
  locales/                 traductions fr / en / mg
  styles/                  SCSS globaux
```

### Ajouter une leçon

1. Créer `src/features/formation/lessons/LessonXYZ.tsx` (contenu seul).
2. Ajouter son titre et ses textes dans `src/locales/*.ts`.
3. La déclarer dans `src/features/formation/data/catalog.ts` (et son QCM dans `quizzes.ts`).

La notation, le bouton « Suite / Terminer », la navigation vers la leçon suivante,
le verrouillage des chapitres et le fil d'Ariane en découlent automatiquement.
