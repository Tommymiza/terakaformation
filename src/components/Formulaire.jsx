import React, { useState } from "react";
import Connexion from "./Connexion";
import Inscription from "./Inscription";

export default function Formulaire() {
  const [type, setType] = useState("connexion");
  return (
    <>
      {type === "connexion" ? (
        <Connexion setType={setType} />
      ) : (
        <Inscription setType={setType} />
      )}
      <div className="col-div content">
        <h2 style={{ fontWeight: "normal" }}>
          Bienvenue au centre de formation TERAKA !
        </h2>
        <h2>
          <strong>
            Faire grandir des arbres et des leaders communautaires !
          </strong>
        </h2>
        <p>
          Ce centre contient du matériel de formation gratuit mis à disposition
          des agriculteurs actuels et potentiels du programme TERAKA de
          plantation d’arbres par petits groupes. Vous y trouverez des
          formations sur le programme TERAKA, la collecte de graines, le
          développement de pépinières, la plantation d’arbres, l'agriculture de
          conservation et bien d'autres sujets passionnants. Vous êtes nouveau
          au centre de formation TERAKA ?
        </p>
      </div>
    </>
  );
}
