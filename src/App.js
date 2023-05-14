import React, { useEffect, createContext, useState } from "react";
import axios from "axios";
import Info from "./components/Info";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "./components/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Accueil/Home";
import Cours from "./pages/Formation/Cours";
import Navbar from "./components/Navbar";
import CoursContent from "./pages/Formation/CoursContent";

export const ActContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = useState();
  const [dialog, setDialog] = useState();
  const [load, setLoad] = useState(true);
  const server = "https://api.teraka.org";
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }, [alert]);
  useEffect(() => {
    if (localStorage.getItem("accessKey")) {
      axios({
        url: server + "/getuser",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessKey"),
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
          localStorage.removeItem("accessKey");
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      setLoad(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <ActContext.Provider
        value={{ server, user, setUser, setAlert, setDialog, setLoad }}
      >
        <Navbar />
        {load ? (
          <div id="loading">
            <ThemeProvider theme={theme}>
              <CircularProgress size={150} />
            </ThemeProvider>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route path="/cours" element={<Cours user={user} />}></Route>
            <Route path="/cours/:id" element={<CoursContent user={user}/>}></Route>
          </Routes>
        )}
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
    </BrowserRouter>
  );
}

export default App;
