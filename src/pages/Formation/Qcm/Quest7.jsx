import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question: "Comment et où est-ce que TERAKA se développe ?",
    reponses: [
      "Emission radio",
      "Gazette mensuelle",
      "Site web TERAKA",
      "A l'église",
      "A l'école",
      "A l'étranger",
    ],
    correct: [0, 1, 2, 3],
  },
];

export default function Quest7() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
