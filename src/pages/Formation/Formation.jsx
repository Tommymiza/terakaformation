import React, { useContext } from "react";
import { ActContext } from "../../App";
import Sendemail from "../../components/Sendemail";

export default function Formation() {
  const { user } = useContext(ActContext);
  return (
    <div>
      {!user.email ? (
        <h1>Bienvenue dans la formation TERAKA</h1>
      ) : !user.is_verified ? (
        <Sendemail />
      ) : (
        <h1>Bienvenue dans la formation TERAKA</h1>
      )}
    </div>
  );
}
