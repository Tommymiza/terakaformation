import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../App";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { cours } from "./cours1";
import Check from "../../components/check";
import "../../styles/chapitre.scss";

export default function Chapitre() {
  const { user } = useContext(ActContext);
  const { id } = useParams();
  const chapitres = [1, 2, 3];
  const [current, setCurrent] = useState(cours[parseInt(id) - 1]);
  const roman = {
    1: "I",
    2: "II",
  };
  useEffect(() => {
    if (chapitres.includes(parseInt(id))) {
      setCurrent(cours[parseInt(id) - 1]);
    }
    // eslint-disable-next-line
  }, []);
  if (chapitres.includes(parseInt(id))) {
    return (
      <div id="accueil">
        {user && (
          <div id="chapitre">
            <h1>
              Chapitre {roman[id]}: {current.titre}
            </h1>
            <p>
              <i>{current.descri}</i>
            </p>
            <h3>Contenu:</h3>
            <div className="chap-content">
              {current.liste.map((i) => (
                <div className="row-list" key={i.id}>
                  <Link
                    to={`/cours/${id}/${i.id.toString().substring(1, 3)}`}
                    style={{
                      color:
                        user.formation[i.id.toString()]?.progress === 100
                          ? "rgb(0, 171, 8)"
                          : "rgb(103, 163, 212)",
                    }}
                  >
                    {i.id.toString().substring(1, 3) + ". " + i.titre}
                  </Link>
                  {user.formation[i.id.toString()]?.progress === 100 && (
                    <Check />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <NotFound />;
}
