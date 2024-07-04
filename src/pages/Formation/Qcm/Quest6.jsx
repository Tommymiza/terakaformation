import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question: "Quelles sont les responsabilités du petit groupe ?",
    reponses: [
      "Planter au moins 5 000 arbres",
      "Couper les arbres plantés",
      "Assurer la pérennité des arbres plantés",
      "Participer aux formations dispensées par TERAKA",
      "Garder les arbres en vie pendant 60 ans",
    ],
    correct: [0, 2, 3, 4],
  },
];

export default function Quest6() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
