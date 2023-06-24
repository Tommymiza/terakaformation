import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../../App";
import axios from "axios";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";

export default function C101() {
  const { user, server, setAlert } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["101"]?.rating || 0);
  const [nb, setNb] = useState(
    isNaN(parseInt((user?.formation["101"]?.progress * 2) / 100))
      ? 0
      : parseInt((user?.formation["101"]?.progress * 2) / 100) >= 2
      ? 0
      : parseInt((user?.formation["101"]?.progress * 2) / 100)
  );
  const navigate = useNavigate();
  function updateDatabase() {
    axios({
      method: "POST",
      url: server + "/updateformation",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        id: user.id,
        formation: user.formation,
      },
    }).catch((err) => {
      setAlert({
        type: "error",
        message: err.response.data.error || "Erreur de connexion!",
      });
    });
  }
  function valider() {
    if (
      !user.formation["101"] ||
      user.formation["101"].progress < (nb + 1) * 50
    ) {
      var temp = Object.create(user.formation["101"] ?? { progress: 0 });
      temp.progress = (nb + 1) * 50;
      user.formation["101"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["101"]?.progress * 2) / 100 === 2) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
      setNb(0);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 2) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);
  return (
    <>
      {nb === 0 && (
        <div className="content">
          <h1>Ireo karazana fifamoivoizana "ivelan'ny lesona"</h1>
          <div className="content-part" style={{ width: "100%" }}>
            <h5>1. Top bar:</h5>
            <p>
              Ity no ahafahanao mivezivezy ato anatin'ny tranonkala na ihany koa
              handeha hijery ireo tranonkala TERAKA hafa. Azonao kitihana ny
              iray amin'ireo raha te hifindra tranonkala TERAKA hafa ianao.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_1.png" width={"100%"} alt="nav" />
              <p>
                <i>Lalam-pifandraisan'ny tranonkala</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>2. Chemin d'accès:</h5>
            <p>
              Ity no ahafahanao mamantatra ny toerana misy anao, ny lalana
              nidiranao rehetra ka hatreo amin'ny misy anao izao. Azonao atao ny
              lalana raha te hiverina amin'ny toerana iray.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_3.png" width={"100%"} alt="nav" />
              <p>
                <i>Lalana naleha sy ny misy anao</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>3. Compte:</h5>
            <p>
              Ity no ahafahanao mijery ireo lesona tianao, na ihany koa, mivoaka
              ny Tranonkala <i>"Déconnexion"</i>. Azonao atao ny mikitika ny
              iray amin ireo.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_2.png" width={"300px"} alt="nav" />
              <p>
                <i>Kaonty TERAKA</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>4. Alert:</h5>
            <p>
              Ity no ahafahan'ny pejy mifandray aminao. Ahitanao ireo teny madinika izy ito, miankina amin'ny lokony ny dikany.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_15.png" width={"100%"} alt="nav" />
              <p>
                <i>Notification</i>
              </p>
            </div>
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider()}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 1 && (
        <div className="content">
          <h3>Ireo karazana fifamoivoizana "anatin'ny lesona"</h3>
          <div className="content-part" style={{ width: "100%" }}>
            <h5>1. Affichage:</h5>
            <p>
              Ity no ahafahanao manova ny fisehon'ny lisitra ny lesona. Azonao
              kitihana ny iray amin'ireo raha te hiova fampisehoana ny lisitry
              ny lesona ianao.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_7.png" width={"200px"} alt="nav" />
              <p>
                <i>Fanovana endriky ny lisitra</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>2. Affichage en grille:</h5>
            <p>
              Toy izao ny fomba fiseho raha <i>"En grille"</i> ny safidinao. Izy
              ihany koa no miseho voalohany raha mbola tsy nisafidy ny hiova
              ianao. Azonao atao ny mikitika ny lesona iray raha te hanohy ny
              fianarana ao aminy ianao.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_10.png" width={"100%"} alt="nav" />
              <p>
                <i>Lisitra en Grille</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>3. Affichage en ligne:</h5>
            <p>
              Toy izao ny fomba fiseho raha <i>"En ligne"</i> ny safidinao.
              Azonao atao ny mikitika ny lesona iray raha te hanohy ny fianarana
              ao aminy ianao.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_11.png" width={"100%"} alt="nav" />
              <p>
                <i>Lisitra en Ligne</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>4. Navigation:</h5>
            <p>
              Ireto ny bokotra <i>"bouton"</i> ahafahanao mamaky ny lesona.
              Rehefa manindry ny "tohiny" ianao dia miakatra ny taha-pahavitanao
              ny lesona.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_13.png" width={"100%"} alt="nav" />
              <p>
                <i>Bokotra ao anatin'ny lesona</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>5. Terminaison:</h5>
            <p>
              Ireto ny bokotra famaranana <i>"bouton de terminaison"</i>{" "}
              ahafahanao mamarana ny lesona sy manome naoty arakarakin'ny
              fahitanao ny lesona. Rehefa manindry ny "Tapitra" ianao dia feno
              ny taha-pahavitanao ny lesona.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_14.png" width={"100%"} alt="nav" />
              <p>
                <i>Bokotra famaranana ny lesona</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>6. Chapitre:</h5>
            <p>
              Ito ny mampiseho ny mombamomban'ny <i>"chapitre"</i> iray. Hita
              ato ireo lesona mandrakotra ny chapitre ary ihany koa ny lesona
              efa vitanao. Maitso ny lokon'ny lesona raha vita 100% izy, manga
              kosa raha toa ka mbola misy tsy vita. Azonao kitihana ny lesona
              iray raha te hianatra azy ianao.
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_16.png" width={"100%"} alt="nav" />
              <p>
                <i>Mombamomban'ny chapitre iray</i>
              </p>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["101"].rating = n;
                updateDatabase();
                setRating(n);
              }}
            />
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider()}>
              Tapitra
            </button>
          </div>
        </div>
      )}
    </>
  );
}
