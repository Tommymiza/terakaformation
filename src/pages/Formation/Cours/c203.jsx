import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default function C203() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["203"]?.rating || 0);
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
    user.formation["203"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours/2/04");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["203"]?.progress === 100) {
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
            <h3>C’EST QUOI CARBONE ?</h3>
            <div className="article">
              <img src="/images/203/Carbonides-Carbone.png" alt="" />
              <div>
                <p>
                  Le carbone est partout autour de nous, mais nous ne pouvons ni
                  le voir, ni le toucher, ni le goûter alors qu'est-ce que c'est
                  ?
                </p>
                <p>
                  Les arbres qui nous font de l'ombre sont faits de carbone.
                </p>
                <p>Les animaux que nous élevons sont faits de carbone.</p>
                <p>
                  Les légumes que nous cultivons sont faits de carbone Même vous
                  et moi sommes faits de carbone.
                </p>
                <p>
                  Les combustibles que nous utilisons tous les jours sont
                  également composés de carbone : les combustibles comme
                  l'essence et le bois de chauffage pour la cuisine.
                </p>
                <p>
                  Lorsque nous brûlons des combustibles à base de carbone, nous
                  produisons de la fumée et des gaz d'échappement qui salissent
                  l'air que nous respirons et noircissent nos toits en tôle.
                </p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>QU'EST CE QUE LE CYCLE DU CARBONE ?</h3>
            <img
              src="/images/203/cycle-carbone.jpg"
              style={{ width: "50%", minWidth: 300 }}
              alt=""
            />
            <div className="card-descri">
              <h4>1ère phase :</h4>
              <p>
                Le carbone est présent partout sur Terre. Il régule la
                température de la Terre, est à la base de toutes les inondations
                et constitue une source majeure de carburant. Le carbone est à
                la base de toute vie sur Terre. Le carbone se trouve dans notre
                atmosphère sous la forme de dioxyde de carbone ou CO2. On ne
                peut ni le voir, ni le goûter, ni le sentir, mais il est partout
                autour de nous.
              </p>
            </div>
            <div className="card-descri">
              <h4>2ème phase :</h4>
              <p>
                Les sécheresses plus longues et les températures plus élevées
                sont toutes deux des conséquences du changement climatique. Mais
                il y a une chose simple que nous pouvons tous faire pour lutter
                contre les causes du changement climatique : Planter des arbres
                : les arbres absorbent le CO2 de l'atmosphère pendant leur
                croissance
              </p>
            </div>
          </div>
          <div className="column-content">
            <h3>TERAKA ET LE BUSINESS DU CREDIT CARBONE ?</h3>
            <Carousel>
              <div className="column-content">
                <img
                  src="/images/203/203_1.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  L'activité de crédit carbone est la façon dont la iTERAKA
                  reçoit des fonds pour gérer le programme TERAKA
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_2.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Les agriculteurs de TERAKA rejoignent un petit groupe dans le
                  but d'aider l'environnement
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_3.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Le petit groupe TERAKA signe un contrat avec iTERAKA , la
                  société qui gère le programme TERAKA
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_4.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Ce contract est appelé Contrat de Gas à Effet de Serre ou
                  Contrat GES
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_5.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Les Petits Groupes de TERAKA maintiennent les arbres en vie.
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_6.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Un agent de Cluster TERAKA viendra compter les arbres et
                  mesurer leur croissance.
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_7.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Cela permet à la iTERAKA de calculer la quantité de carbone
                  que les arbres ont absorbée dans l'air.
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_8.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  La iTERAKA engage des vérificateurs tiers pour s'assurer de
                  l'exactitude de cette mesure.
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_9.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  La iTERAKA crée un crédit carbone à partir de la quantité de
                  carbone que les arbres TERAKA ont éliminé de l'air.
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_10.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  Les entreprises achètent ce crédit carbone à la iTERAKA
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_11.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>
                  C'est ainsi que les Petits Groupes de TERAKA bénéficient de
                  l'activité carbone.
                </p>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>NOTES IMPORTANTES :</h3>
            <div className="card-descri">
              <h4>Prépaiements du carbone</h4>
              <p>
                Au début, les arbres TERAKA seront trop petits pour créer un
                crédit carbone. Jusqu'à ce que l'arbre TERAKA devienne
                suffisamment grand, les petits groupes TERAKA recevront un
                paiement anticipé de 0,02 $ par arbre et par an pour maintenir
                la croissance de l'arbre.
              </p>
            </div>
            <div className="card-descri">
              <h4>Partage du profit de carbone</h4>
              <p>
                Lorsque l'arbre est suffisamment grand et que le petit groupe
                remplit toutes les conditions d'admissibilité, le petit groupe
                TERAKA reçoit une participation aux bénéfices. La participation
                aux bénéfices est créée lorsque la iTERAKA vend des crédits de
                carbone à une autre personne ou entreprise, et que la iTERAKA
                partage 70 % des bénéfices de la vente avec les petits groupes
                TERAKA.
              </p>
            </div>
            <div className="card-descri">
              <h4>Création d’un credit carbone</h4>
              <p>
                Pour créer un crédit carbone, un serviteur de TERAKA comptera
                les arbres de chaque bosquet, en mesurant la circonférence du
                tronc, en notant l'espèce de l'arbre et la proximité des arbres
                entre eux. Ces informations sont ensuite ajoutées à la base de
                données TERAKA. La iTERAKA utilise ces informations pour créer
                un crédit carbone. Ce crédit carbone est ensuite vendu à une
                autre personne ou entreprise désireuse d'aider l'environnement.
              </p>
            </div>
          </div>
          <div className="column-content">
            <h3>AUTRES AVANTAGES DE TERAKA</h3>
            <div className="row-content">
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/CCfour-malgache.webp" alt="" />
                <div className="contenu">
                  <h5>Fourneaux améliorés</h5>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/Photo_petite.jpg" alt="" />
                <div className="contenu">
                  <h5>Agriculture de conservation</h5>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img
                  src="/images/203/quand-epandre-le-fumier-de-cheval-dans-le-jardin.jpg"
                  alt=""
                />
                <div className="contenu">
                  <h5>Formation sur le compostage du fumier</h5>
                  <p>
                    Cela permet aux agriculteurs d'obtenir de meilleurs
                    rendements, d'aider l'environnement et d'éviter d'acheter
                    des engrais.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/sante_1_0.jpg" alt="" />
                <div className="contenu">
                  <h5>Santé</h5>
                  <p>
                    La santé d'un agriculteur est sa plus grande ressource. Les
                    agriculteurs de TERAKA reçoivent des formations pour rester
                    en bonne santé ainsi que des formations sur les problèmes de
                    santé courants.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/iStock-1406909744.jpg" alt="" />
                <div className="contenu">
                  <h5>Développement du leaderdship</h5>
                  <p>
                    Chaque agriculteur de TERAKA a la possibilité d'être un
                    leader de TERAKA et de recevoir une formation en leadership
                    Les agriculteurs de TERAKA pratiquent le leadership par
                    rotation, ce qui donne à chacun la possibilité d'être un
                    leader.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["203"].rating = n;
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
