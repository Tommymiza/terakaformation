import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question:
      "Qui doit être présent lors de la collecte des informations de baseline :",
    reponses: [
      "Tous les membres de petit groupe",
      "Le président de Fokontany et le maire",
      "Les zokiolona",
    ],
    correct: [0],
  },
];

export default function Quest5() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
