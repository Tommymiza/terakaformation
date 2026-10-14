import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // REACT_APP_ reste accepté pour ne pas casser les variables déjà configurées
  // sur l'hébergement (héritage de Create React App).
  envPrefix: ["VITE_", "REACT_APP_"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    // Même dossier de sortie que CRA pour ne pas changer la config de déploiement.
    outDir: "build",
  },
});
