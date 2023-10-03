import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C205() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["205"]?.rating || 0);
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
    user.formation["205"] = {};
    user.formation["205"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours/2/06");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["205"]?.progress === 100) {
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
            <h3>QUELQUES DÉFINITIONS</h3>
            <div className="card-descri">
              <h4>Un petit groupe TERAKA</h4>
              <p>
                Comme cela a été expliqué, le Petit Groupe TERAKA est une
                association de 6 à 12 agriculteurs qui se réunissent
                volontairement et librement pour planter des arbres ensemble,
                pour l'amélioration de la terre et de la communauté. Il y a 3
                familles différentes dans le Petit Groupe.
              </p>
            </div>
            <div className="card-descri">
              <h4>Une Cluster</h4>
              <p>
                Comme expliqué précédemment, le cluster de TERAKA se compose de
                30 villages de 50 petites communautés qui ne sont pas loin les
                unes des autres, ont des terres pour planter 200 000 arbres
                (environ 80 hectares) et ont une pépinière pour élever des
                enfants.
              </p>
            </div>
          </div>
          <div className="column-content">
            <h3>PROCESSUS DE DEMANDE DE FORMATION ET D'ADHÉSION</h3>
            <div className="row-content" style={{ minHeight: "60vh" }}>
              <img src="/images/205/Young_plantors_003.jpg" alt="" />
              <Carousel>
                <div>
                  <h4>
                    Etape 1 : Visitez le{" "}
                    <a href="https://rejoindre.teraka.org">
                      rejoindre.teraka.org
                    </a>
                  </h4>
                  <p>
                    Les agriculteurs qui souhaitent devenir membre de TERAKA
                    doivent visiter leur site Web :{" "}
                    <a href="https://programme.teraka.org">Programme</a>,{" "}
                    <a href="https://rejoindre.teraka.org">rejoindre</a> et
                    utilisez le centre de formation TERAKA.
                  </p>
                </div>
                <div>
                  <h4>
                    Étape 2 : Si possible, assistez aux réunions de cluster
                  </h4>
                  <p>
                    Les agriculteurs doivent se renseigner pour savoir qu'il y a
                    une réunion avec la cluster de TEREKA.
                  </p>
                </div>
                <div>
                  <h4>Étape 3 : Créer un petit groupe solide dans TERAKA</h4>
                  <p>
                    Revoir attentivement la formation sur la structure du Petit
                    Groupe dans 4e sous chapitre du 2e chapitre du centre
                    pédagogique.
                  </p>
                </div>
                <div>
                  <h4>Etape 4 : Devenez membre de TEREKA</h4>
                  <p>
                    Une fois que le petit groupe a terminé la formation, un
                    serviteur de groupe ou un champion TERAKA remplit soit:
                  </p>
                  <p>
                    la demande d'inscription du Petit Groupe dans le centre
                    d'apprentissage
                  </p>
                  <p>un dossier de candidature TERAKA</p>
                </div>
                <div>
                  <h4>Etape 5 : Organiser des réunions en Petits Groupes</h4>
                  <p>
                    Les petits groupes doivent se réunir chaque semaine et
                    consigner les détails de la réunion et, si possible,
                    assister aux réunions mensuelles du groupe.
                  </p>
                </div>
                <div>
                  <h4>Etape 6 : Décider où planter les arbres</h4>
                  <p>
                    Un petit groupe doit décider de l'endroit où il plantera ses
                    arbres TERAKA.
                  </p>
                </div>
                <div>
                  <h4>
                    Etape 7 : Si vous remplissez le formulaire de demande,
                    soumettez-le aux agent de Cluster.
                  </h4>
                  <p>
                    Si un petit groupe estime avoir avoir rempli toutes les
                    conditions d'admission au programme TERAKA, il peut demander
                    à un agent Cluster de groupe de devenir un Petit Groupe de
                    TERAKA.
                  </p>
                </div>
                <div>
                  <h4>
                    Etape 8 : Si vous remplissez le formulaire de demande sur le
                    centre d'apprentissage
                  </h4>
                  <p>
                    Le Coach de TERAKA examinera les informations afin de
                    remplir le formulaire de demande pour les Petits Groupes sur
                    le centre de formation.
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="column-content">
            <h3>BASELINE</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>
                    La baseline est l'état du bosquet et du petit groupe lorsque
                    vous rejoignez le programme TERAKA pour la première fois.
                  </p>
                </div>
                <div className="card-descri">
                  <h4>
                    Qui doit être présent lors de la collecte des informations
                    de base ?
                  </h4>
                  <p>
                    Lorsque le représentant de TERAKA rend visite à votre petit
                    groupe, tous les membres du petit groupe doivent être
                    présents et apporter tous les documents attestant de l'accès
                    à la terre.
                  </p>
                </div>
                <div className="card-descri">
                  <h4>
                    Quelles sont les informations collectées pour la baseline ?
                  </h4>
                  <p>
                    • Arbres de référence - arbres présents dans le bosquet
                    avant que le petit groupe n'entende parler de TERAKA (il ne
                    peut s'agir d'arbres TERAKA)
                  </p>
                  <p>• Référence du bosquet </p>
                  <p>
                    • Souches d'arbres dans le bosquet, utilisation du bosquet
                    avant la plantation d'arbres TERAKA et autres faits
                    concernant le bosquet
                  </p>
                  <p>
                    • Photographies : a) du petit groupe ; b) de chaque bosquet
                    ; c) des parcelles d'agriculture de conservation ; d) des
                    poêles ; et e) des pépinières.
                  </p>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/205/IMG_0228.JPG"
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["205"].rating = n;
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
