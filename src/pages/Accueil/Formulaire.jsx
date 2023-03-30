import React, { useState } from "react";
import Inscription from "./Inscription";
import Connexion from "./Connexion";

export default function Formulaire() {
  const [state, setState] = useState(0);
  return (
    <div id="accueil">
      {state === 0 ? (
        <>
          <div>
            <Connexion setState={setState}/>
          </div>
          <div>
            <h2>Bienvenue au centre de formation TERAKA !</h2>
            <h3>Faire grandir des arbres et des leaders communautaires !</h3>
            <p>
              Ce centre contient du matériel de formation gratuit mis à
              disposition des agriculteurs actuels et potentiels du programme
              TERAKA de plantation d’arbres par petits groupes. Vous y trouverez
              des formations sur le programme TERAKA, la collecte de graines, le
              développement de pépinières, la plantation d’arbres, l'agriculture
              de conservation et bien d'autres sujets passionnants. Vous êtes
              nouveau au centre de formation TERAKA ?
            </p>
            <p>
              Cliquez{" "}
              <span
                onClick={() =>
                  setState(1)
                }
              >
                ici
              </span>{" "}
              pour vous inscrire et créer un compte! Aucun email n'est
              nécessaire.
            </p>
          </div>
        </>
      ) : (
        <div style={{width:"100%"}}>
          <Inscription setState={setState}/>
        </div>
      )}
    </div>
  );
}
