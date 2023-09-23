import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C206() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["206"]?.rating || 0);
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
    user.formation["206"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours/2/07");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["206"]?.progress === 100) {
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
            <h3>RESPONSABILITÉS</h3>
            <div className="row-content">
              <div  style={{width: "40%", minWidth: 300}}>
                <img
                  src="/images/206/IMG_1389.jpeg"
                  alt=""
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
              <div
                className="card-descri"
                style={{ width: "50%", minWidth: 300 }}
              >
                <h4>Les responsabilités des petits groupes</h4>
                <p>
                  Le Petit Groupe s'engage à planter au moins 1 000 arbres par
                  an pendant 5 ans
                </p>
                <p>
                  Le Petit Groupe s'engage à garder les arbres en vie pendant 60
                  ans et à replanter ceux qui meurent
                </p>
                <p>
                  Le Petit Groupe s'engage à participer aux formations
                  dispensées par TERAKA et à contribuer au développement des
                  bonnes pratiques
                </p>
                <p>
                  Le groupe minoritaire accepte de permettre aux classificateurs
                  et vérificateurs de TERAK de venir à la plantation pour
                  mesurer la croissance des arbres
                </p>
              </div>
            </div>
            <div className="row-content">
              <div
                className="card-descri"
                style={{ width: "50%", minWidth: 300 }}
              >
                <h4>Les responsabilités de iTERAKA</h4>
                <p>
                  iTERAKA s'engage à fournir des informations dans les
                  formations, les médias et sur Internet
                </p>
                <p>
                  iTERAKA convient qu'il est précis et transparent dans la
                  mesure
                </p>
                <p>
                  iTERAKA s'engage à payer les 70 % du Petit Groupe qui est le
                  bénéfice de la vente du carbone et de faire le paiement
                  anticipé de l'arbre vivant qui est au moins 6 mois par an qui
                  vaut 0,03 euro à 0,03 $ (euro )
                </p>
                <p>
                  iTERAKA s'engage à faire ses meilleurs efforts dans la vente
                  de crédits carbone au profit de petits groupes
                </p>
              </div>
              <div style={{width: "40%", minWidth: 300}}>
                <img
                  src="/images/206/XWOVEIJ4O7D45ESQMCSDJPCOF4.jpg"
                  style={{ width: "100%", objectFit: "contain" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>COMPRÉHENSION DE PRÉPAIEMENT</h3>
            <Carousel
              showThumbs={false}
              autoPlay={true}
              interval={2000}
              transitionTime={1000}
              infiniteLoop={true}
              showIndicators={false}
            >
              <div className="column-content">
                <img
                  src="/images/206/206_1.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>Arbre de deux (2) mois</p>
                <h4>Pour pouvoir recevoir l'acompte</h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_2.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>Arbre de quatre (4) mois</p>
                <h4>Pour pouvoir recevoir l'acompte...</h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_3.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>Arbre de dix-huit (18) mois</p>
                <h4>
                  Pour recevoir l'acompte, les arbres doivent avoir été comptés
                  comme des arbres dans les 18 mois L'acompte est de 0,03 euro
                  par an pour chaque arbre vivant
                </h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_4.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>Arbre adulte</p>
                <h4>
                  Le paiement anticipé est également le paiement minimum
                  qu'iTERAKA fournit annuellement pour chaque arbre vivant.
                </h4>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>REPARTITION DES BENEFICES</h3>
            <Carousel
              showThumbs={false}
              autoPlay={true}
              interval={2000}
              transitionTime={1000}
              infiniteLoop={true}
              showIndicators={false}
            >
              <div className="column-content">
                <img
                  src="/images/206/206_10.png"
                  alt=""
                  style={{
                    width: "50%",
                    minWidth: 300,
                    objectFit: "contain",
                  }}
                />
                <p>
                  Par exemple, si la vente d'un crédit carbone crée 1 000 unités
                  monétaires (unités) de revenus carbone
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_11.png"
                  alt=""
                  style={{
                    width: "50%",
                    minWidth: 300,
                    objectFit: "contain",
                  }}
                />
                <p>
                  Et nous pensons que le prix est de 200 unités. Le bénéfice
                  restant est de 800 Unités
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_12.png"
                  alt=""
                  style={{
                    width: "50%",
                    minWidth: 300,
                    objectFit: "contain",
                  }}
                />
                <p>
                  iTERAKA s'engage à partager 70 %, soit 560 Unités, avec le
                  petit groupe
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_13.png"
                  alt=""
                  style={{
                    width: "50%",
                    minWidth: 300,
                    objectFit: "contain",
                  }}
                />
                <p>
                  Et 30 %, soit 240 Unités, seront inclus dans le Programme
                  TERAKA
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_14.png"
                  alt=""
                  style={{
                    width: "50%",
                    minWidth: 300,
                    objectFit: "contain",
                  }}
                />
                <p>
                  Ainsi, dans cet exemple, le crédit carbone vendu pour 1 000
                  Unités est utilisé pour 560 Unités qui reviennent à des petits
                  groupes
                </p>
              </div>
            </Carousel>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["206"].rating = n;
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
