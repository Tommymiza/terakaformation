import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question:
      "L’espacement entre les arbres comptés comme arbre TERAKA doit être :",
    reponses: ["Inférieur à 2 mètre", "2 mètre minimum"],
    correct: [1],
  },
  {
    question: "L’hauteur des arbres arbre TERAKA doit être :",
    reponses: ["Au moins 2 mètres", "Inférieur à 2 mètre"],
    correct: [0],
  },
  {
    question: "Quels sont les avantages de planter des arbres ?",
    reponses: [
      "Arrêter l'érosion du sol",
      "Charbon de bois",
      "Noix et des fruits",
      "Médicaments",
    ],
    correct: [0, 2, 3],
  },
  {
    question: "Où les agriculteurs devront planter les arbres TERAKA ?",
    reponses: [
      "Sur leur propre terrain",
      "Sur terrain d’autrui",
      "Sur terrain d’autrui avec autorisation de propriétaire",
    ],
    correct: [0, 2],
  },
];

export default function Quest2() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
