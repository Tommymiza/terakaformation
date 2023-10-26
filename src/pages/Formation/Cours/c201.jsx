import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { Carousel } from "react-responsive-carousel";


export default function C201() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["201"]?.rating || 0);
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
    user.formation["201"] = {};
    user.formation["201"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours/2/02");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["201"]?.progress === 100) {
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
            <h3>QUI EST TERAKA ?</h3>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/201/201_1.jpeg" alt="" className="fixed" />
              <div>
                <p>
                  TERAKA est composé d'agriculteurs qui se portent volontaires
                  pour rejoindre la communauté TERAKA. TERAKA est constitué de
                  petits groupes. Nous travaillons ensemble pour développer les
                  meilleures pratiques et améliorer nos fermes et notre
                  environnement.
                </p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>VALEURS TERAKA</h3>
            <div className="row-content" style={{ justifyContent: "center" }}>
              <div className="card">Nous sommes honnêtes.</div>
              <div className="card">Nous sommes précis.</div>
              <div className="card">Nous sommes transparents.</div>
              <div className="card">Nous sommes mutuellement responsables.</div>
              <div className="card">
                Nous sommes des serviteurs les uns des autres.
              </div>
              <div className="card">Nous sommes volontaires.</div>
              <div className="card">
                Nous créons des grands résultats avec des faibles budgets.
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>COMMENT SOMMES-NOUS DIFFERENTS ?</h3>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/201/201_2.JPG" alt="" className="fixed" />
              <div>
                <p>
                  Nous sommes des volontaires. Les agriculteurs rejoignent
                  TERAKA pour la communauté, l'éducation, l'augmentation des
                  connaissances agricoles et pour participer à l'activité
                  carbone. Nous développons et utilisons les meilleures
                  pratiques Les agriculteurs de TERAKA développent et partagent
                  des informations sur les activités de conservation agricole,
                  foresterie, nutrition, et les activités pour le développement
                  durable. Nous partageons ces meilleures pratiques avec tous
                  les Petits Groupes.
                </p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>QU'EST-CE QUE NOUS FAISONS ?</h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1354.jpeg" alt="" />
                <div>
                  <h3>FAIRES POUSSER DES ARBRES</h3>
                  <p>
                    À mesure que les arbres poussent, la photosynthèse réduit le
                    dioxyde de carbone dans l'air en le stockant dans le bois,
                    les racines et le sol. Notre partenaire, iTERAKA , prend
                    toutes les mesures nécessaires pour transformer ce carbone
                    en crédits carbone puis les vend sur le marché du carbone.
                    TERAKA Les agriculteurs reçoivent un prépaiement chaque
                    année et recevront également 70% des bénéfices de la vente
                    des crédits carbone.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1280 2.jpeg" alt="" />
                <div>
                  <h3>DEVELOPPEMENT DES LEADERS</h3>
                  <p>
                    Nous développons également des leaders. En utilisant “
                    Rotating Leadership ”, tous les agriculteurs de TERAKA
                    apprennent à diriger leur petit groupe.
                  </p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1696.JPG" alt="" />
                <div>
                  <h3>PARTAGES DES BONNES PRATIQUES</h3>
                  <p>
                    Les agriculteurs de TERAKA partagent ces meilleures
                    pratiques avec tous les petits groupes. Nous avons des
                    gazettes mensuelles, des réunions mensuelles locales des
                    clusters et des séminaires régionaux où nous partageons les
                    meilleures pratiques que nous avons développées.
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>QU'EST-CE QUE NOUS CREONS ?</h3>
            <div className="row-content" style={{ minHeight: "50vh" }}>
              <img src="/images/201/IMG_1509.JPG" alt="" className="fixed" />
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showIndicators={false}
              >
                <div>
                  <h3>Nous sommes dans le business du carbone</h3>
                  <p>
                    Les agriculteurs de TERAKA sont dans le secteur du carbone
                    pour soutenir leurs familles et améliorer leurs fermes, leur
                    communauté et la planète.
                  </p>
                </div>
                <div>
                  <h3>Nous créons des credits carbones</h3>
                  <p>
                    Nous nous finançons ainsi que nos efforts en mesurant très
                    précisément la quantité de dioxyde de carbone que nos
                    pratiques agricoles et nos arbres ont éliminée de
                    l'atmosphère.
                  </p>
                </div>
                <div>
                  <h3>
                    Nous générons des nouvelles revenues pour nos familles.
                  </h3>
                  <p>
                    Nous travaillons avec iTERAKA pour mesurer nos résultats de
                    manière précise et transparente afin que nous puissions
                    entrer sur le marché mondial du carbone.
                  </p>
                </div>
                <div>
                  <h3>
                    Nous utilisons des faibles budgets pour créer des grands
                    résultats.
                  </h3>
                  <p>
                    TERAKA et iTERAKA ont travaillé dur pendant plus de 20 ans
                    pour minimiser le coût du programme afin que plus d'argent
                    carbone soit versé aux agriculteurs de TERAKA.
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="column-content">
            <h3>POURQUOI LES VALEURS DE TERAKA SONT IMPORTANTS ?</h3>
            <div className="row-content">
              <div className="card-descri">
                <h4>Nous créons la confiance</h4>
                <p>
                  TERAKA ne fonctionne que si nous sommes dignes de confiance:
                  nous vendons des crédits carbone que nous ne pouvons pas voir,
                  toucher ou goûter.
                </p>
              </div>
              <div className="card-descri">
                <h4>Ils aidents pour avoir des benefices.</h4>
                <p>
                  Les valeurs TERAKA aident les agriculteurs à obtenir de grands
                  résultats. En opérant avec des budgets bas qui génèrent de
                  gros résultats, nous créons plus d'argent carbone pour les
                  agriculteurs de TERAKA.
                </p>
              </div>
              <div className="card-descri">
                <h4>Par les agriculteurs, pour les agricultuers.</h4>
                <p>
                  TERAKA est fait par les agriculteurs, pour les agriculteurs.
                  En suivant les valeurs TERAKA, nous travaillons les uns pour les
                  autres et pour nous-mêmes. Ces valeurs soutiennent la
                  communauté et la responsabilité.
                </p>
              </div>
              <div className="card-descri">
                <h4>Serviteurs les uns aux autres</h4>
                <p>
                  Les valeurs de TERAKA nous aident à se server les uns les
                  autres.
                </p>
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["201"].rating = n;
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
