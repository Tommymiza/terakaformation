import { LoadingButton } from "@mui/lab";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ActContext } from "../App";
import { EmailRounded, LogoutRounded } from "@mui/icons-material";

export default function Formation() {
  const { server, setUser, user, setAlert } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const logout = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: server + "/logout",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("session"),
      },
    })
      .then((res) => {
        localStorage.removeItem("session");
        setUser();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const sendMail = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: server + "/generate",
      data: {
        email: user.email,
      },
    }).then((res) => {
      if (res.data.message) {
        setAlert({ type: "success", message: res.data.message });
      } else {
        setAlert({
          type: "error",
          message: res.data.error || "Erreur d'envoie",
        });
      }
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    });
  };
  return (
    <div className="container mt-5">
      {user.is_verified ? (
        <>
          <p>Formation</p>
          <LoadingButton
            onClick={logout}
            variant="contained"
            startIcon={<LogoutRounded />}
            loading={loading}
            sx={{
              textTransform: "none",
              fontFamily: "var(--fontText)",
              fontWeight: "bolder",
              width: 130,
            }}
          >
            Déconnexion
          </LoadingButton>
        </>
      ) : (
        <>
          <p>Vérifier votre email!</p>
          <LoadingButton
            onClick={sendMail}
            variant="contained"
            startIcon={<EmailRounded />}
            loading={loading}
            sx={{
              textTransform: "none",
              fontFamily: "var(--fontText)",
              fontWeight: "bolder",
              width: 140,
            }}
          >
            Re-envoyer
          </LoadingButton>
        </>
      )}
    </div>
  );
}
