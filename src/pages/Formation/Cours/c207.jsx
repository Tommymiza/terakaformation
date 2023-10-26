import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C207() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["207"]?.rating || 0);
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
    user.formation["207"] = {};
    user.formation["207"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["207"]?.progress === 100) {
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
            <h3>
              DÉVELOPPEMENT DE TERAKA : COMMENT TERAKA SE DÉVELOPPE-T-IL ?
            </h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: "80vh" }}>
                <img src="/images/207/IMG_0231.JPG" alt="" />
                <div>
                  <h4>Étape 1 : Premier contact</h4>
                  <p>
                    Les agriculteurs entendent parler du programme TERAKA lors
                    d'un séminaire organisé par TERAKA, d'une formation interne,
                    d'une visite avec un membre de TERAKA, d'émissions de radio,
                    de journaux ou de la gazette mensuelle, ou de bien
                    d'autres façons.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/P1100297.JPG" alt="" />
                <div>
                  <h4>Étape 2 : Sensibilisation et recrutement</h4>
                  <p>
                    Si un agriculteur souhaite en savoir plus sur TERAKA, il
                    doit se rendre sur le site join.TERAKA.org et demander s'il
                    y a des réunions de groupe TERAKA dans sa région. Discuter
                    avec des agriculteurs TERAKA et assister aux réunions de
                    groupe (si possible).
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/P1100319.JPG" alt="" />
                <div>
                  <h4>Étape 3: Formation et application</h4>
                  <p>
                    Revoir le 5e sous chapitre du chapitre 2: Comment devenir
                    membre de Petit Groupe TERAKA pour aider les agriculteurs à
                    former des petits groupes solides qui comprennent le
                    programme TERAKA.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/case.JPG" alt="" />
                <div>
                  <h4>Étape 4 : Formation d'un Cluster</h4>
                  <p>
                    Un Cluster est une combinaison de 30 à 50 Petits Groupes qui
                    se trouvent à une distance de marche. S'il y a moins de 30
                    petits groupes dans votre région, vous pouvez quand même
                    créer un groupe. Continuez à ajouter des petits groupes
                    jusqu'à ce que vous atteigniez 30 !
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/paysage.jpeg" alt="" />
                <div>
                  <h4>Étape 5: AGIR et FAIRE</h4>
                  <p>
                    A ce stade, les agriculteurs en savent assez et doivent être
                    encouragés à AGIR et à FAIRE ! Poursuivre la formation des
                    agriculteurs TERAKA en utilisant le matériel du Centre
                    d'apprentissage et en partageant les meilleures pratiques en
                    matière de petits groupes et de clusters Revoir les
                    formations du Centre d'apprentissage pour savoir comment
                    enregistrer le petit groupe une fois qu'il a compris le
                    programme.
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>MOYENS DE RECRUTER POUR L'EXPANSION DE TERAKA</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "50%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>Mobilisation par le biais de réunions communautaires.</p>
                </div>
                <div className="card-descri">
                  <p>
                    Créez une pépinière surélevée afin de disposer plusieurs
                    plantules.
                  </p>
                </div>
                <div className="card-descri">
                  <p>
                    Demandez aux autres membres de TERAKA près de chez vous pour
                    vous aider à recruter leurs voisins.
                  </p>
                </div>
                <div className="card-descri">
                  <p>Mobiliser en travaillant avec les dirigeants locaux.</p>
                </div>
                <div className="card-descri">
                  <p>
                    Expliquer aux membres de la communauté l'importance de la
                    plantation d'arbres et les avantages de participer à TERAKA.
                  </p>
                </div>
                <div className="card-descri">
                  <p>
                    Partager la gazette mensuelle de TERAKA avec des
                    personnes en dehors de TERAKA.
                  </p>
                </div>
                <div className="card-descri">
                  <p>
                    Montrer aux gens les avantages tels que les foyers
                    améliorés, les paiements pour les arbres, les arbres
                    fruitiers ou l'agriculture de conservation.
                  </p>
                </div>
                <div className="card-descri">
                  <p>Mobiliser par l'intermédiaire des églises.</p>
                </div>
                <div className="card-descri">
                  <p>Mobilisation par le biais de la radio locale.</p>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/207/P1100127.JPG"
                  alt=""
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["207"].rating = n;
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
