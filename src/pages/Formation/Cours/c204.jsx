import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating, Tooltip } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C204() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["204"]?.rating || 0);
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
    user.formation["204"] = {};
    user.formation["204"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours/2/05");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["204"]?.progress === 100) {
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
            <h3>COMMENT FORMER UN PETIT GROUPE SOLIDE ?</h3>
            <div className="card-descri">
              <h4>Un petit groupe</h4>
              <p>
                Les petits groupes de TERAKA sont composés de 6 à 12 membres
                issus d'au moins 3 familles différentes qui vivent toutes à
                proximité les unes des autres.
              </p>
            </div>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/203/IMG_1530.JPG" alt="" />
              <div>
                <p>
                  Vous devez appartenir à un petit groupe pour rejoindre TERAKA.
                  Réfléchissez bien avant de former un petit groupe. Les petits
                  groupes sont constitués d'amis et de voisins, et ils
                  permettent aux agriculteurs de TERAKA de se développer en tant
                  que leaders. Les bons petits groupes TERAKA sont constitués de
                  personnes qui travaillent dur et qui incarnent les valeurs de
                  TERAKA. Les hommes et les femmes d'un même petit groupe sont
                  souvent ceux qui accomplissent le plus de choses.
                </p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>LES PROMESSES DU PETITS GROUPES DE TERAKA</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <p style={{ alignSelf: "flex-start" }}>
                  Lorsqu'un petit groupe TERAKA adhère au programme, ses membres
                  acceptent de :
                </p>
                <div className="card-descri">
                  <p>
                    S'engager à planter au moins 1 000 arbres par an pendant 5
                    ans
                  </p>
                </div>
                <div className="card-descri">
                  <p>Se réunir au moins une fois par semaine</p>
                </div>
                <div className="card-descri">
                  <p>Signer ensemble le contrat sur les gaz à effet de serre</p>
                </div>
                <div className="card-descri">
                  <p>Incarner les valeurs de TERAKA</p>
                </div>
                <div className="card-descri">
                  <p>Utiliser le leadership par rotation et le Kujengana</p>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/204/IMG_1016.jpeg"
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>LES RÔLES DU LEADERSHIP DES PETITS GROUPES</h3>
            <div className="row-content">
              <Tooltip
                title="Le responsable est au service du petit groupe, il dirige les
                    réunions et veille à ce que chaque personne puisse
                    participer."
              >
                <div className="card">
                  <p>Le responsable</p>
                </div>
              </Tooltip>
              <Tooltip
                title="Aide à diriger le petit groupe et fait office
                    de chronométreur. Le co-responsable devient le responsable
                    lors de la réunion suivante."
              >
                <div className="card">
                  <p>Le co-leader</p>
                </div>
              </Tooltip>
              <Tooltip
                title="Rappelle au petit
                    groupe ses responsabilités et ses engagements passés et
                    présents. La personne chargée de la responsabilité devient
                    le co-responsable lors de la réunion suivante."
              >
                <div className="card">
                  <p>La personne chargée de la responsabilité</p>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="column-content">
            <h3>LEADERSHIP TOURNANT</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>
                    La rotation du leadership est une pratique exemplaire de
                    TERAKA pour les petits groupes. Le leadership est renouvelé
                    à chaque réunion (hebdomadaire), le co-responsable devenant
                    le leader, la personne chargée de la responsabilité devenant
                    le co-responsable et une nouvelle personne chargée de la
                    responsabilité étant élue.
                  </p>
                </div>
                <div className="card-descri">
                  <p>
                    Le leadership alterne entre hommes et femmes à chaque niveau
                    de TERAKA. Cela signifie que si la personne responsable
                    actuelle est un homme, la prochaine devrait être une femme.
                    Ainsi, la direction alterne toujours entre les hommes et les
                    femmes.
                  </p>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/204/Three-part_cycle_diagram.png"
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>LES AVANTAGES DU LEADERSHIP TOURNANT</h3>
            <div className="card-descri">
              <p>
                Chaque personne a la possibilité de servir en tant que leader.
              </p>
            </div>
            <div className="card-descri">
              <p>Les hommes et les femmes ont les mêmes chances.</p>
            </div>
            <div className="card-descri">
              <p>
                Nous apprenons les uns des autres ce qui fait un bon dirigeant.
              </p>
            </div>
            <div className="card-descri">
              <p>
                La rotation du leadership encourage les nouveaux venus et les
                personnes timides à prendre la tête d'un groupe.
              </p>
            </div>
          </div>
          <div className="column-content">
            <h3>KUJENGANA</h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/IMG_1271.jpeg" alt="" />
                <div>
                  <h3>C'est quoi le Kujengana</h3>
                  <p>
                    Kujengana est le mot swahili qui signifie construire, et
                    c'est quelque chose que l'on fait à la fin de chaque réunion
                    de TERAKA.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/leader cluster.jpeg" alt="" />
                <div>
                  <h3>Comment pratiquer le Kujengana ?</h3>
                  <p>
                    Avant la prière de clôture, chaque membre du petit groupe
                    dit une chose spécifique et positive que le responsable a
                    faite au cours de la réunion. Ces commentaires doivent être
                    spécifiques et se référer à quelque chose que le responsable
                    a fait ou dit. Pensez à quelque chose qu'une mouche sur le
                    mur verrait ou entendrait. Il ne doit pas s'agir d'un
                    commentaire général du type le responsable a fait du bon
                    travail. Il s'agit plutôt d'un commentaire spécifique comme
                    le responsable a respecté le temps imparti, a souri et a
                    encouragé tous les membres du petit groupe à s'exprimer.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/Leader national.JPG" alt="" />
                <div>
                  <h3>Pourquoi pratiquer le Kujengana ?</h3>
                  <p>
                    Chaque membre de TERAKA possède des talents et des dons
                    particuliers et a quelque chose de précieux à apporter. Le
                    Kujengana est la pratique qui consiste à exprimer cette
                    valeur à haute voix. Tout comme la rotation du leadership,
                    le Kujengana est un élément important de la croissance des
                    leaders au sein de TERAKA.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/record meeting.jpeg" alt="" />
                <div>
                  <h3>Les bénéfices du Kujengana</h3>
                  <p>
                    Il donne confiance aux dirigeants lorsqu'ils ont fait
                    quelque chose de bien.
                  </p>
                  <p>
                    Il aide les futurs dirigeants à s'inspirer des bonnes idées
                    des dirigeants actuels.
                  </p>
                  <p>Il encourage les gens à devenir des leaders</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>CLUSTER DE TERAKA</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>
                    Chaque petit groupe TERAKA fait partie d'une grappe de
                    petits groupes. Une grappe est un groupe de 30 à 50 petits
                    groupes TERAKA qui se trouvent à proximité les uns des
                    autres.
                  </p>
                </div>
                <div className="card-descri">
                  <h4>Comment former un Cluster ?</h4>
                  <p>
                    Chaque Cluster doit compter entre 30 et 50 petits groupes
                    qui ont:
                  </p>
                  <ul style={{ marginLeft: 20 }}>
                    <li>
                      planté au moins 200 000 arbres au total (chaque petit
                      groupe doit planter 1 000 arbres par an)
                    </li>
                    <li>un lit de pépinière pour élever les plantules</li>
                    <li>
                      environ 80 à 100 hectares de terrain pour la plantation
                      d'arbres.
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img src="/images/204/webdiagram.png" alt="" />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>RÉUNION DES CLUSTERS</h3>
            <div className="row-content">
              <div style={{ minWidth: 300, width: "50%" }}>
                <img
                  src="/images/204/IMG_1379.JPG"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div
                className="column-content"
                style={{ minWidth: 300, width: "40%" }}
              >
                <p>
                  Chaque mois, chaque petit groupe TERAKA du groupe envoie deux
                  représentants (un homme et une femme) à une réunion de groupe.
                  Un agent de Cluster de TERAKA organise ces réunions dans un
                  lieu facilement accessible à tous les petits groupes du
                  groupe. Lors de la réunion de grappe, les agriculteurs de
                  TERAKA :
                </p>
                <div className="card-descri">
                  <p>
                    reçoivent la gazette mensuelle de TERAKA, qu'ils rapportent à
                    leur petit groupe TERAKA
                  </p>
                </div>
                <div className="card-descri">
                  <p>
                    reçoivent un bon de paiement pour l'activité de plantation
                    d'arbres de leur petit groupe de TERAKA
                  </p>
                </div>
                <div className="card-descri">
                  <p>reçoivent une formation supplémentaire</p>
                </div>
                <div className="card-descri">
                  <p>
                    partagent les meilleures pratiques et les nouvelles avec les
                    membres des autres petits groupes de TERAKA de la région
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["204"].rating = n;
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
