import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question: "Quels sont les valeurs TERAKA ?",
    reponses: [
      "Honnêteté",
      "Précision",
      "Transparence",
      "Responsabilité",
      "Responsabilité mutuelle",
      "Serviteurs les uns des autres",
      "Volontariat",
      "Utilisation des faibles budgets pour créer des grands résultats",
    ],
    correct: [0, 1, 2, 4, 5, 6, 7],
  },
  {
    question: "Quels sont les principales activités des agriculteurs TERAKA ?",
    reponses: [
      "Planter des arbres",
      "Maintenir les arbres plantés en vie",
      "Faire du charbon de bois",
      "Pisciculture",
      "Apiculture",
    ],
    correct: [0, 1],
  },
  {
    question: "Quel est l’activité principale de Iteraka ?",
    reponses: ["Vente de crédit carbone", "Vente des bois", "Vente des fruits"],
    correct: [0],
  },
];

export default function Quest1() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
