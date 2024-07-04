import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest5 from "../Qcm/Quest5";

const CHAP = 205;

export default function C205() {
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
        navigate("/cours/2/06");
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
            <h3>{t("c205.0")}</h3>
            <div className="card-descri">
              <h4>{t("c205.1")}</h4>
              <p>{t("c205.2")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c205.3")}</h4>
              <p>{t("c205.4")}</p>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c205.5")}</h3>
            <div className="row-content" style={{ minHeight: "60vh" }}>
              <img src="/images/205/Young_plantors_003.jpg" alt="" />
              <Carousel>
                <div>
                  <h4>
                    {t("c205.6")}{" "}
                    <a href="https://rejoindre.teraka.org">
                      rejoindre.teraka.org
                    </a>
                  </h4>
                  <p>
                    {t("c205.7")}{" "}
                    <a href="https://programme.teraka.org">Programme</a>,{" "}
                    <a href="https://rejoindre.teraka.org">rejoindre</a>
                    {t("c205.8")}
                  </p>
                </div>
                <div>
                  <h4>{t("c205.9")}</h4>
                  <p>{t("c205.10")}</p>
                </div>
                <div>
                  <h4>{t("c205.11")}</h4>
                  <p>{t("c205.12")}</p>
                </div>
                <div>
                  <h4>{t("c205.13")}</h4>
                  <p>{t("c205.14")}</p>
                  <p>{t("c205.15")}</p>
                  <p>{t("c205.16")}</p>
                </div>
                <div>
                  <h4>{t("c205.17")}</h4>
                  <p>{t("c205.18")}</p>
                </div>
                <div>
                  <h4>{t("c205.19")}</h4>
                  <p>{t("c205.20")}</p>
                </div>
                <div>
                  <h4>{t("c205.21")}</h4>
                  <p>{t("c205.22")}</p>
                </div>
                <div>
                  <h4>{t("c205.23")}</h4>
                  <p>{t("c205.24")}</p>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c205.25")}</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>{t("c205.26")}</p>
                </div>
                <div className="card-descri">
                  <h4>{t("c205.27")}</h4>
                  <p>{t("c205.28")}</p>
                </div>
                <div className="card-descri">
                  <h4>{t("c205.29")}</h4>
                  <p>{t("c205.30")}</p>
                  <p>{t("c205.31")}</p>
                  <p>{t("c205.32")}</p>
                  <p>{t("c205.33")}</p>
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
            <Quest5 />
          </div>
        </div>
      </>
    )
  );
}
