import { LoginRounded, PersonAddRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, ThemeProvider } from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import { theme } from "./theme";
import { ActContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../pages/Accueil/Home";

export default function Connexion() {
  const { setAlert, server, setUser, t } = useContext(ActContext);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = (e) => {
    const f = form.current;
    e.preventDefault();
    if (f.pseudo.value === "" || f.password.value === "") {
      setAlert({ type: "warning", message: t("alert.3") });
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
      <div className="row-content">
        <form onSubmit={submit} ref={form}>
          <div className="col-div" style={{ gap: "10px" }}>
            <h2>{t("login.titre.0")}:</h2>
            <div className="col-div" style={inputStyle}>
              <label htmlFor="pseudo">{t("login.label.2")} / {t("login.label.5")}: </label>
              <input type="text" name="pseudo" id="pseudo" />
            </div>
            <div className="col-div" style={inputStyle}>
              <label htmlFor="password">{t("login.label.3")}: </label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="col-div" style={{ alignSelf: "flex-start" }}>
              <p
                className="underline"
                style={{ fontSize: "15px" }}
                onClick={() => navigate("/reset password")}
              >
                {t("button.8")}
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
                  {t("button.6")}
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
                  onClick={() => navigate("/sign up")}
                >
                  {t("button.7")}
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </form>
        <Home />
      </div>
    </div>
  );
}
