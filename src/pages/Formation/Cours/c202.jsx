import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C202() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["202"]?.rating || 0);
  async function updateDatabase() {
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
  const valider = async () => {
    user.formation["202"].progress = 100;
    try {
      await updateDatabase();
      navigate("/cours/2/03");
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["202"]?.progress === 100) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    user && (
      <>
        <div className="content">
          <div className="column-content">
            <h3>LES AVANTAGES DE PLANTER DES ARBRES</h3>
            <Carousel showThumbs={false} showStatus={false}>
              <div className="row-content" style={{ minHeight: 600 }}>
                <img src="/images/202/IMG_1310.jpeg" alt="" />
                <div>
                  <h3>LA PLANTATION D'ARBRES RESTAURE LES ZONES DÉBOISÉES</h3>
                  <p>
                    La plantation des arbres aide à arrêter l'érosion du sol et
                    les glissements de terrain Les racines des arbres aident à
                    stabiliser le sol et à réduire l'érosion causée par le vent
                    et les inondations. La plantation des arbres sur les flancs
                    réduit le risque de glissement de terrain.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/202/IMG_1312.jpeg" alt="" />
                <div>
                  <h3>LES ARBRES FOURNISSENT DES FRUITS ET DES NOIX</h3>
                  <p>
                    De nombreuses espèces d'arbres produisent des fruits, tels
                    que l'avocat et les mangues, ou des noix, comme la
                    macadamia. Ceux-ci peuvent être vendus ou utilisés pour
                    nourrir la famille.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/202/IMG_1033.jpeg" alt="" />
                <div>
                  <h3>CERTAINS ARBRES FOURNISSENT DES MÉDICAMENTS</h3>
                  <p>
                    Certaines espèces d'arbres, comme la cassie ancienne ou
                    queue-de-rat, contiennent des propriétés médicinales utiles.
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>QUE SIGNIFIE PLANTER DES ARBRES AVEC TERAKA ?</h3>
            <Carousel
              showThumbs={false}
              autoPlay={true}
              interval={3000}
              transitionTime={2000}
              infiniteLoop={true}
              showIndicators={false}
            >
              <div className="column-content">
                <img
                  src="/images/202/202_arbre_1.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ whiteSpace: "nowrap", fontWeight: "bolder" }}>
                  L’arbre doit atteindre au moins 2 mètres de hauteur
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/202/202_arbre_2.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ whiteSpace: "nowrap", fontWeight: "bolder" }}>
                  1 an - 60 ans
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/202/202_arbre_3.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ whiteSpace: "nowrap", fontWeight: "bolder" }}>
                  2 mètres
                </p>
              </div>
            </Carousel>
          </div>
          <div className="row-content">
            <div className="card-descri">
              <h4>NB:</h4>
              <p>
                TERAKA Les agriculteurs de TERAKA peuvent planter des arbres à
                moins de 2 mètres pour d'autres raisons, comme le bois de
                chauffage. Ces arbres ne rapporteraient pas de monnaie carbone.
                Les arbres doivent être plantés sur votre propre terrain ou avec
                l'autorisation du propriétaire. Bien que cela ne soit pas
                obligatoire, les participants à TERAKA sont encouragés à
                construire un lit de semences surélevé pour aider à cultiver les
                jeunes plants. Ces plants d'arbres peuvent ensuite être plantés
                et utilisés pour générer des revenus supplémentaires.
              </p>
            </div>
          </div>

          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["202"].rating = n;
                updateDatabase();
                setRating(n);
              }}
            />
            <button className="nav-btn" onClick={() => valider()}>
              {t("button.12")}
            </button>
          </div>
        </div>
      </>
    )
  );
}
