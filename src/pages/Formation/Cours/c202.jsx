import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";

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
    user.formation["202"] = {};
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
            <h3>{t("c202.0")}</h3>
            <Carousel showThumbs={false} showStatus={false}>
              <div className="row-content" style={{ minHeight: 600 }}>
                <img src="/images/202/IMG_1310.jpeg" alt="" />
                <div>
                  <h3>{t("c202.1")}</h3>
                  <p>{t("c202.2")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/202/IMG_1312.jpeg" alt="" />
                <div>
                  <h3>{t("c202.3")}</h3>
                  <p>{t("c202.4")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/202/IMG_1033.jpeg" alt="" />
                <div>
                  <h3>{t("c202.5")}</h3>
                  <p>{t("c202.6")}</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c202.7")}</h3>
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
                  {t("c202.8")}
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/202/202_arbre_2.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ whiteSpace: "nowrap", fontWeight: "bolder" }}>
                  {t("c202.9")}
                </p>
              </div>
              <div className="column-content">
                <img
                  src="/images/202/202_arbre_3.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ whiteSpace: "nowrap", fontWeight: "bolder" }}>
                  {t("c202.10")}
                </p>
              </div>
            </Carousel>
          </div>
          <div className="row-content">
            <div className="card-descri">
              <h4>{t("c202.11")}</h4>
              <p>{t("c202.12")}</p>
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
