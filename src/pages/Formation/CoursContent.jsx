import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../App";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { cours } from "./cours1";
import "../../styles/chapitre.scss";
import Pathnav from "../../components/Pathnav";
import Check from "../../components/check";

export default function CoursContent() {
  const { setPath, user } = useContext(ActContext);
  const { id } = useParams();
  const chapitres = [1, 2, 3];
  const [current, setCurrent] = useState(cours[parseInt(id) - 1]);
  useEffect(() => {
    if (chapitres.includes(parseInt(id))) {
      setPath(
        <>
          <Link to={"/cours"}>Mes cours</Link>
          <span>/</span>
          <Link to={`/cours/0${parseInt(id)}`} className="active">
            {id + ". " + cours[parseInt(id) - 1].titre}
          </Link>
        </>
      );
      setCurrent(cours[parseInt(id) - 1]);
    }
    // eslint-disable-next-line
  }, []);
  if (chapitres.includes(parseInt(id))) {
    return (
      <section>
        <Pathnav />
        <div id="chapitre">
          <h1>
            Chapitre {id}: {current.titre}
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
                  style={{color: user.formation[i.id.toString()]?.progress === 100 ? "rgb(0, 171, 8)" : "blue"}}
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
      </section>
    );
  }
  return <NotFound />;
}
