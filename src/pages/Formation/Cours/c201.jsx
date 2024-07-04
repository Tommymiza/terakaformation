import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest1 from "../Qcm/Quest1";

const CHAP = 201;

export default function C201() {
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
        navigate("/cours/2/02");
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
            <h3>{t("c201.0")}</h3>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/201/201_1.jpeg" alt="" className="fixed" />
              <div>
                <p>{t("c201.1")}</p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c201.2")}</h3>
            <div className="row-content" style={{ justifyContent: "center" }}>
              <div className="card">{t("c201.3")}</div>
              <div className="card">{t("c201.4")}</div>
              <div className="card">{t("c201.5")}</div>
              <div className="card">{t("c201.6")}</div>
              <div className="card">{t("c201.7")}</div>
              <div className="card">{t("c201.8")}</div>
              <div className="card">{t("c201.9")}</div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c201.10")}</h3>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/201/201_2.JPG" alt="" className="fixed" />
              <div>
                <p>{t("c201.11")}</p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c201.12")}</h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1354.jpeg" alt="" />
                <div>
                  <h3>{t("c201.13")}</h3>
                  <p>{t("c201.14")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1280 2.jpeg" alt="" />
                <div>
                  <h3>{t("c201.15")}</h3>
                  <p>{t("c201.16")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/201/IMG_1696.JPG" alt="" />
                <div>
                  <h3>{t("c201.17")}</h3>
                  <p>{t("c201.18")}</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c201.19")}</h3>
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
                  <h3>{t("c201.20")}</h3>
                  <p>{t("c201.21")}</p>
                </div>
                <div>
                  <h3>{t("c201.22")}</h3>
                  <p>{t("c201.23")}</p>
                </div>
                <div>
                  <h3>{t("c201.24")}</h3>
                  <p>{t("c201.25")}</p>
                </div>
                <div>
                  <h3>{t("c201.26")}</h3>
                  <p>{t("c201.27")}</p>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c201.28")}</h3>
            <div className="row-content">
              <div className="card-descri">
                <h4>{t("c201.29")}</h4>
                <p>{t("c201.30")}</p>
              </div>
              <div className="card-descri">
                <h4>{t("c201.31")}</h4>
                <p>{t("c201.32")}</p>
              </div>
              <div className="card-descri">
                <h4>{t("c201.33")}</h4>
                <p>{t("c201.34")}</p>
              </div>
              <div className="card-descri">
                <h4>{t("c201.35")}</h4>
                <p>{t("c201.36")}</p>
              </div>
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
            <Quest1 />
          </div>
        </div>
      </>
    )
  );
}
