// Listes proposées dans le formulaire d'inscription. Les valeurs sont envoyées
// telles quelles au backend : ne pas les traduire.
import { COMMUNES_BY_REGION } from "./locations";

export const LANGUAGES = [
  "Malgache",
  "Français",
  "Anglais",
  "Espagnol",
  "Portugais",
  "Néerlandais",
  "Allemand",
  "Autre...",
];

export const COUNTRIES = [
  "Madagascar",
  "Bénin",
  "Burkina Faso",
  "Burundi",
  "Cameroun",
  "République centrafricaine",
  "Comores",
  "Congo (RC)",
  "Congo (RDC)",
  "Côte d'Ivoire",
  "Djibouti",
  "France",
  "Gabon",
  "Guinée",
  "Guinée équatoriale",
  "La Réunion",
  "Mali",
  "Mayotte",
  "Niger",
  "Rwanda",
  "Sénégal",
  "Seychelles",
  "Tchad",
  "Togo",
  "Autre",
];

export const REGIONS = Object.keys(COMMUNES_BY_REGION).sort();

export const ROLES = [
  "Membre potentiel de TERAKA",
  "Membre actif de TERAKA",
  "Agent de Cluster",
  "Leader",
  "Autre...",
];

export const YES_NO = ["Oui", "Non"];
