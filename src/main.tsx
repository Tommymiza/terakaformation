import { GlobalStyles, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { inject } from "@vercel/analytics";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { AlertProvider } from "./components/AlertProvider";
import { AuthProvider } from "./features/auth/AuthProvider";
import "./lib/i18n";
import { theme } from "./lib/theme";
import "./styles/main.css";

inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Styles MUI dans la couche CSS "mui", sous les utilitaires Tailwind */}
      <StyledEngineProvider enableCssLayer>
        {/* Déclare l'ordre des couches avant tout style MUI injecté */}
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </AlertProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
