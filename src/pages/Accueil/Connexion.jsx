import { LoginRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import { theme } from "../../components/theme";
import { ActContext } from "../../App";
import axios from "axios";

export default function Connexion({setState}) {
  const { setAlert, server, setUser } = useContext(ActContext);
  const form = useRef();
  const [loading, setLoading] = useState(false);
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
        localStorage.setItem("accessKey", res.data.token);
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
    <form onSubmit={submit} ref={form} style={{width: "200px"}}>
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
        <div className="col-div">
          <p className="underline" style={{fontSize: "15px"}}>Mot de passe oublié ?</p>
        </div>
        <div className="col-div">
          <p className="underline" style={{fontSize: "15px"}} onClick={()=>setState(1)}>S'inscrire</p>
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
      </div>
    </form>
  );
}
