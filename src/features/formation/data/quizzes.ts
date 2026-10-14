// Questions à choix multiples affichées en fin de leçon, indexées par id de leçon.
// `correct` contient les index des bonnes réponses dans `reponses`.

export interface QuizQuestion {
  question: string;
  reponses: string[];
  correct: number[];
}

export const QUIZZES: Record<number, QuizQuestion[]> = {
  201: [
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
      question:
        "Quels sont les principales activités des agriculteurs TERAKA ?",
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
      reponses: [
        "Vente de crédit carbone",
        "Vente des bois",
        "Vente des fruits",
      ],
      correct: [0],
    },
  ],
  202: [
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
  ],
  203: [
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
  ],
  204: [
    {
      question: "Le petit groupe TERAKA doit se réunir :  ",
      reponses: [
        "Une fois par semaine",
        "Une fois par mois",
        "Une fois par an",
      ],
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
  ],
  205: [
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
  ],
  206: [
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
  ],
  207: [
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
  ],
};
