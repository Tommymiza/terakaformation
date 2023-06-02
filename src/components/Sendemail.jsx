import React, { useState, useContext } from "react";
import { ActContext } from "../App";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import axios from "axios";
import { SendRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function Sendemail() {
  const { server, user, setAlert } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const send = () => {
    setLoading(true);
    axios({
      url: server + "/generate",
      method: "POST",
      data: {
        email: user.email,
      },
    })
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: err.response.data.error || "Erreur de connexion",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="col-div" style={{marginTop: "300px"}}>
      <h1>Pour vérifier votre email, cliquez sur le bouton ci-dessous</h1>
      <ThemeProvider theme={theme}>
        <LoadingButton
          startIcon={<SendRounded />}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bolder",
            fontFamily: "Open Sans",
          }}
          onClick={send}
          loading={loading}
        >
          Envoyer
        </LoadingButton>
      </ThemeProvider>
    </div>
  );
}
