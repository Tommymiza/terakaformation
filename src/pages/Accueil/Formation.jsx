import React, { useContext } from "react";
import { ActContext } from "../../App";
import Sendemail from "../../components/Sendemail";
import Home from "./Home";

export default function Formation() {
  const { user } = useContext(ActContext);
  return (
    <>
      {!user.email ? (
        <Home />
      ) : !user.is_verified ? (
        <Sendemail />
      ) : (
        <Home />
      )}
    </>
  );
}
