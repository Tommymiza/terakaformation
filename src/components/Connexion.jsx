import {
  LoginRounded,
  PersonAddRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, ThemeProvider } from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import { theme } from "./theme";
import { ActContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Connexion({ setState }) {
  const { setAlert, server, setUser } = useContext(ActContext);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = (e) => {
    const f = form.current;
    e.preventDefault();
    if (f.pseudo.value === "" || f.password.value === "") {
      setAlert({ type: "warning", message: "Les champs sont obligatoires!" });
      return;
    }
    setLoading(true);
    axios({
      url: server + "/login",
      method: "POST",
      data: {
        pseudo: f.pseudo.value,
        password: f.password.value,
      },
    })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: err.response.data.error || "Erreur de connexion!",
        });
      })
      .finally(() => setLoading(false));
  };
  const inputStyle = {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    width: "100%",
  };
  return (
    <div id="accueil">
      <form onSubmit={submit} ref={form}>
        <div className="col-div" style={{ gap: "10px" }}>
          <h2>Connexion:</h2>
          <div className="col-div" style={inputStyle}>
            <label htmlFor="pseudo">Pseudo ou email: </label>
            <input type="text" name="pseudo" id="pseudo" />
          </div>
          <div className="col-div" style={inputStyle}>
            <label htmlFor="password">Mot de passe: </label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="col-div" style={{alignSelf: "flex-start"}}>
            <p className="underline" style={{ fontSize: "15px" }}>
              Détails du compte oublié?
            </p>
          </div>
          <div className="col-div">
            <ThemeProvider theme={theme}>
              <LoadingButton
                startIcon={<LoginRounded />}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                type="submit"
                loading={loading}
              >
                Connecter
              </LoadingButton>
            </ThemeProvider>
          </div>
          <div className="col-div">
            <ThemeProvider theme={theme}>
              <Button
                startIcon={<PersonAddRounded />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                onClick={()=>navigate("/sign up")}
              >
                S'inscrire
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
}
