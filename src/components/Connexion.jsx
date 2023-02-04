import React, { useState, useRef, useContext } from "react";
import Input from "./Input";
import { LoadingButton } from "@mui/lab";
import { LoginRounded } from "@mui/icons-material";
import axios from "axios";
import { ActContext } from "../App";

export default function Connexion() {
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
        email: formCurrent.email.value,
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
      }).finally(()=>{
        setLoading(false)
      })
  };
  return (
    <div className="container mt-5">
      <form className="d-flex flex-column align-items-center" ref={form} onSubmit={connect}>
        <div className="col-md-2 col-sm-4">
          <Input name={"email"} type={"email"} id={"email"} label={"Email"} />
          <Input
            name={"password"}
            type={"password"}
            id={"password"}
            label={"Mot de passe"}
          />
        </div>
        <LoadingButton
          type="submit"
          variant="contained"
          startIcon={<LoginRounded />}
          loading={loading}
          sx={{
            textTransform: "none",
            fontFamily: "var(--fontText)",
            fontWeight: "bolder",
            width: 120,
          }}
        >
          Connexion
        </LoadingButton>
      </form>
    </div>
  );
}
