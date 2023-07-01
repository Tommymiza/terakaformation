import React, { useState, useRef, useContext, useEffect } from "react";
import { ActContext } from "../../App";
import { useParams, useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { CheckRounded } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../components/theme";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function MdpRenew() {
  const { setAlert, server } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const [decToken, setDecToken] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();
  const form = useRef(null);
  const inputStyle = {
    alignItems: "flex-start",
  };
  const valider = (e) => {
    e.preventDefault();
    const f = form.current;
    if (f.password.value !== f.rpassword.value) {
      setAlert({
        type: "warning",
        message: "Les mots de passe ne sont pas identiques",
      });
      return;
    }
    setLoading(true);
    axios({
      method: "POST",
      url: server + "/resetpassword/modifypassword",
      data: {
        pseudo: decToken.pseudo,
        password: f.password.value,
      },
    })
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
        navigate("/");
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: err.response.data.error ?? "Erreur de connexion",
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(()=>{
    try {
      const decoded = jwtDecode(token)
      if(Date.now() >= decoded.exp * 1000) throw new Error("Expiré");
      setDecToken(decoded);
    } catch (error) {
      console.log(error);
      setAlert({type: "error", message: "Lien expiré"});
      navigate("/Notfound");
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div id="accueil">
      <form ref={form} onSubmit={valider}>
        <div className="col-div" style={{ gap: "10px" }}>
          <h2>Nouveau mot de passe</h2>
          <div className="col-div" style={inputStyle}>
            <label htmlFor="password">Nouveau:</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className="col-div" style={inputStyle}>
            <label htmlFor="rpassword">Réécrire:</label>
            <input type="password" name="rpassword" id="rpassword" required />
          </div>
          <ThemeProvider theme={theme}>
            <LoadingButton
              startIcon={<CheckRounded />}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: "bolder",
                fontFamily: "Open Sans",
              }}
              type="submit"
              loading={loading}
            >
              Valider
            </LoadingButton>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
