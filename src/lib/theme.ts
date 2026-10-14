import { createTheme } from "@mui/material";

// Mêmes couleurs que le @theme Tailwind (src/styles/main.css).
export const theme = createTheme({
  palette: {
    mode: "light",
    // brand-600 : contraste AA avec du texte blanc (le brand-500 historique ne l'atteint pas).
    primary: { main: "#5a7154", dark: "#475a43", light: "#879f7d" },
    secondary: { main: "#313d2f" },
    text: { primary: "#1b231a" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 12 },
        sizeLarge: { padding: "10px 22px" },
      },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: "#fff" } },
    },
  },
});
