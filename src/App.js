import { CircularProgress, ThemeProvider } from "@mui/material";
import { inject } from "@vercel/analytics";
import axios from "axios";
import i18n from "i18next";
import React, { createContext, useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { en } from "./Locales/en";
import { fr } from "./Locales/fr";
import { mg } from "./Locales/mg";
import CompteLost from "./components/CompteLost";
import Info from "./components/Info";
import Inscription from "./components/Inscription";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Pathnav from "./components/Pathnav";
import { theme } from "./components/theme";
import Accueil from "./pages/Accueil/Accueil";
import MdpRenew from "./pages/Accueil/MdpRenew";
import Chapitre from "./pages/Formation/Chapitre";
import Content from "./pages/Formation/Content";
import Cours from "./pages/Formation/Cours";

export const ActContext = createContext();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    mg: { translation: mg },
  },
  lng: "fr-FR",
  fallbackLng: "fr-FR",
  interpolation: { escapeValue: false },
});

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState();
  const [dialog, setDialog] = useState();
  const [load, setLoad] = useState(true);
  const server = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  inject();
  useEffect(() => {
    let timeout = null;
    if (alert) {
      timeout = setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [alert]);
  useEffect(() => {
    if (localStorage.getItem("lang")) {
      i18n.changeLanguage(localStorage.getItem("lang"));
    }
    if (localStorage.getItem("token")) {
      axios({
        url: server + "/getuser",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          setAlert({
            type: "error",
            message: err.response.data.error || "Erreur de connexion!",
          });
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (location.pathname.includes("renew")) {
      return;
    }
    if (location.pathname.includes("cours")) {
      return;
    }
    if (user) {
      navigate("/cours");
      return;
    }
    navigate("/");
    // eslint-disable-next-line
  }, [user]);
  return (
    <ActContext.Provider
      value={{
        server,
        user,
        setUser,
        setAlert,
        setDialog,
        setLoad,
        t,
      }}
    >
      <Navbar />
      <Pathnav />
      {load ? (
        <div id="loading">
          <ThemeProvider theme={theme}>
            <CircularProgress size={150} />
          </ThemeProvider>
        </div>
      ) : (
        <section>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Accueil />}></Route>
              <Route path="/sign up" element={<Inscription />}></Route>
              <Route path="/reset password" element={<CompteLost />}></Route>
              <Route path="/renew/:token" element={<MdpRenew />}></Route>
              <Route path="/cours" element={<Cours />}></Route>
              <Route path="/cours/:id" element={<Chapitre />}></Route>
              <Route path="/cours/:id/:sid" element={<Content />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </ThemeProvider>
        </section>
      )}
      <footer>
        <a href="https://teraka.org/mention.html">Mentions légales</a>
      </footer>
      {alert && <Info type={alert.type} message={alert.message} />}
      {dialog && (
        <div id="dialog">
          <div className="dialog-container">
            <div className="backdrop" onClick={() => setDialog()}></div>
            {dialog}
          </div>
        </div>
      )}
    </ActContext.Provider>
  );
}

export default App;
