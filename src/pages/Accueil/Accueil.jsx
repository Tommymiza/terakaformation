import React, { useContext, useEffect } from "react";
import { ActContext } from "../../App";
import Connexion from "../../components/Connexion";
import { useNavigate } from "react-router";

export default function Accueil() {
  const { user } = useContext(ActContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, []);
  return <Connexion />;
}
