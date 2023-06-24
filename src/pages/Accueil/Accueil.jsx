import React, {useContext} from "react";
import { ActContext } from "../../App";
import Formation from "./Formation";
import Connexion from "../../components/Connexion";

export default function Accueil() {
  const {user} = useContext(ActContext)
  return user ? (
    <Formation />
  ):(
    <Connexion />
  );
}
