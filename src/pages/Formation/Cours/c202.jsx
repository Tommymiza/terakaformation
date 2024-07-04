import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest2 from "../Qcm/Quest2";

const CHAP = 202;

export default function C202() {
  const { user, server, setAlert, t, setUser } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const updateDatabase = async (data) => {
    try {
      setLoad(true);
      await axios({
        method: "POST",
        url: server + "/updateformation",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          id_user: user.id,
          chapitre: CHAP,
          ...data,
        },
      });
      const response = await axios({
        url: server + "/getuser",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(response.data.user);
      if (data.progress === 100) {
        setAlert({
          type: "success",
          message: t("alert.2"),
        });
        navigate("/cours/2/03");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.error || "Erreur de connexion!",
      });
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    if (
      (user?.progressions.find((p) => p.chapitre === CHAP)?.progress * 2) /
        100 ===
      2
    ) {
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
              value={
                user?.progressions.find((p) => p.chapitre === CHAP)?.rating ?? 0
              }
              onChange={(e, n) => {
                if (n) {
                  updateDatabase({ rating: n });
                }
              }}
            />
            <button
              className="nav-btn"
              onClick={() => updateDatabase({ progress: 100 })}
              disabled={load}
            >
              {t("button.12")}
            </button>
          </div>
          <div className="qcm">
            <Quest2 />
          </div>
        </div>
      </>
    )
  );
}
