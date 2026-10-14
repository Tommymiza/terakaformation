// Accès à localStorage protégé : il peut être indisponible (navigation privée,
// stockage bloqué) et ne doit jamais faire planter l'application.
function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // stockage indisponible : on ignore
  }
}

export const storage = {
  getToken: () => read("token"),
  setToken: (token: string | null) => write("token", token),

  getLanguage: () => read("lang"),
  setLanguage: (lang: string) => write("lang", lang),

  // Clé historique "grille" : "true" = vue en grille, "false" = vue en liste.
  getCatalogView: (): "grid" | "list" =>
    read("grille") === "false" ? "list" : "grid",
  setCatalogView: (view: "grid" | "list") =>
    write("grille", String(view === "grid")),
};
