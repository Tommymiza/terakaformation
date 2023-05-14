import React, { useContext } from "react";
import { ActContext } from "../../App";
import Sendemail from "../../components/Sendemail";
import Accueil from "./Accueil";

export default function Formation() {
  const { user } = useContext(ActContext);
  return (
    <>
      {!user.email ? (
        <Accueil />
      ) : !user.is_verified ? (
        <Sendemail />
      ) : (
        <Accueil />
      )}
    </>
  );
}
