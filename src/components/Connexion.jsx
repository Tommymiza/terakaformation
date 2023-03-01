import React, { useState, useRef, useContext } from "react";
import Input from "./Input";
import { LoadingButton } from "@mui/lab";
import { LoginRounded } from "@mui/icons-material";
import axios from "axios";
import { ActContext } from "../App";

export default function Connexion({ setType }) {
  const { server, setUser, setAlert } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const connect = (e) => {
    e.preventDefault();
    setLoading(true);
    const formCurrent = form.current;
    axios({
      method: "POST",
      url: server + "/login",
      data: {
        pseudo: formCurrent.email.value,
        password: formCurrent.password.value,
      },
    })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem("session", res.data.token);
        } else {
          setAlert({ type: "error", message: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({ type: "error", message: "Erreur de connexion!" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form ref={form} onSubmit={connect}>
      <Input name={"pseudo"} type={"text"} id={"pseudo"} label={"Pseudo*"} />
      <Input
        name={"password"}
        type={"password"}
        id={"password"}
        label={"Mot de passe*"}
      />
      <p style={{color: "#ccc", fontSize: "12px"}}>Champ obligatoire (*)</p>
      <p onClick={()=>alert("Pas de modification ne marche pour le moment")} className="p-underline">J'ai oublié mon mot de passe</p>
      <p onClick={()=>setType("inscription")} className="p-underline">S'inscrire ?</p>
      <LoadingButton
        type="submit"
        variant="contained"
        startIcon={<LoginRounded />}
        loading={loading}
        sx={{
          textTransform: "none",
          fontFamily: "var(--fontText)",
          fontWeight: "bolder",
          fontSize: "12px",
          width: 100,
        }}
      >
        Connexion
      </LoadingButton>
    </form>
  );
}
