import React, { useMemo } from "react";
import { shuffle } from "./shuffle";
import TemplateQcm from "./TemplateQcm";

const qcm = [
  {
    question: "Le petit groupe TERAKA doit se réunir :  ",
    reponses: ["Une fois par semaine", "Une fois par mois", "Une fois par an"],
    correct: [0],
  },
  {
    question: "Combien de personne compose le petit groupe TERAKA ?",
    reponses: [
      "5 à 10 personnes",
      "6 à 12 personnes",
      "7 à 14 personnes",
      "20 personnes",
    ],
    correct: [1],
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
  {
    question: "Que signifie le mot swahili Kujengana ?",
    reponses: ["Construire", "Détruire", "Saluer"],
    correct: [0],
  },
  {
    question: "Combien de leaders le petit groupe a à chaque réunion ?",
    reponses: ["1", "2", "3"],
    correct: [2],
  },
  {
    question: "Le poste des leaders du petit groupe est : ",
    reponses: [
      "Rotationnel à chaque réunion",
      "Rotationnel tous les mois",
      "Rotationnel tous les 2 mois",
      "Fixe",
    ],
    correct: [0],
  },
  {
    question: "Combien de petits groupes composent un cluster ?",
    reponses: [
      "20 à 30 petits groupes",
      "30 à 50 petits groupes",
      "40 à 60 petits groupes",
    ],
    correct: [1],
  },
  {
    question: "Le cluster se réunit :",
    reponses: ["Tous les mois", "Toutes les semaines", "Tous les 3 mois"],
    correct: [0],
  },
  {
    question:
      "Combien de représentants chaque petit groupe doit envoyer au minimum au réunion de cluster ?",
    reponses: ["1 représentant", "2 représentants", "3 représentants"],
    correct: [1],
  },
];

export default function Quest4() {
  const arrays = useMemo(() => shuffle(qcm), []);
  return <TemplateQcm qcm={arrays[0]} />;
}
