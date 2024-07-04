import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question:
      "Combien de pourcentage de bénéfice carbone iTERAKA doit verser aux petits groupes ?",
    reponses: ["50 %", "60%", "70%", "80%"],
    correct: [2],
  },
  {
    question: "L’hauteur des arbres arbre TERAKA doit être :",
    reponses: ["Au moins 2 mètres", "Inférieur à 2 mètre"],
    correct: [0],
  },
  {
    question: "Quel est le rôle des arbres par le biais de photosynthèse ?",
    reponses: [
      "Absorption de dioxyde de carbone",
      "Absorption de chloro-fluoro-carbone",
    ],
    correct: [0],
  },
  {
    question:
      "Le prépaiement est une somme reçue par arbre vivant par an, sa valeur est de :",
    reponses: [
      "0,01 Euro/arbre vivant / an",
      "0,02 Euro/arbre vivant/an",
      "0,03 Euro/arbre vivant/an",
    ],
    correct: [1],
  },
];

export default function Quest3() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
