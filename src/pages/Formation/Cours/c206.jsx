import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest6 from "../Qcm/Quest6";

const CHAP = 206;

export default function C206() {
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
        navigate("/cours/2/07");
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
            <h3>{t("c206.0")}</h3>
            <div className="row-content">
              <div style={{ width: "40%", minWidth: 300 }}>
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
                <h4>{t("c206.1")}</h4>
                <p>{t("c206.2")}</p>
                <p>{t("c206.3")}</p>
                <p>{t("c206.4")}</p>
                <p>{t("c206.5")}</p>
              </div>
            </div>
            <div className="row-content">
              <div
                className="card-descri"
                style={{ width: "50%", minWidth: 300 }}
              >
                <h4>{t("c206.6")}</h4>
                <p>{t("c206.7")}</p>
                <p>{t("c206.8")}</p>
                <p>{t("c206.9")}</p>
                <p>{t("c206.10")}</p>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/206/XWOVEIJ4O7D45ESQMCSDJPCOF4.jpg"
                  style={{ width: "100%", objectFit: "contain" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c206.11")}</h3>
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
                <p>{t("c206.12")}</p>
                <h4>{t("c206.13")}</h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_2.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>{t("c206.14")}</p>
                <h4>{t("c206.15")}</h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_3.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>{t("c206.16")}</p>
                <h4>{t("c206.17")}</h4>
              </div>
              <div className="column-content">
                <img
                  src="/images/206/206_4.png"
                  alt=""
                  style={{ height: 250, objectFit: "contain" }}
                />
                <p>{t("c206.18")}</p>
                <h4>{t("c206.19")}</h4>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c206.20")}</h3>
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
                <p>{t("c206.21")}</p>
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
                <p>{t("c206.22")}</p>
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
                <p>{t("c206.23")}</p>
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
                <p>{t("c206.24")}</p>
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
                <p>{t("c206.25")}</p>
              </div>
            </Carousel>
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
            <Quest6 />
          </div>
        </div>
      </>
    )
  );
}
