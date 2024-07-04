import { Rating, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest4 from "../Qcm/Quest4";

const CHAP = 204;

export default function C204() {
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
        navigate("/cours/2/05");
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
            <h3>{t("c204.0")}</h3>
            <div className="card-descri">
              <h4>{t("c204.1")}</h4>
              <p>{t("c204.2")}</p>
            </div>
            <div
              className="row-content"
              style={{
                minHeight: "50vh",
              }}
            >
              <img src="/images/203/IMG_1530.JPG" alt="" />
              <div>
                <p>{t("c204.3")}</p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c204.4")}</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <p style={{ alignSelf: "flex-start" }}>{t("c204.5")}</p>
                <div className="card-descri">
                  <p>{t("c204.6")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.7")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.8")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.9")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.10")}</p>
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
            <h3>{t("c204.11")}</h3>
            <div className="row-content">
              <Tooltip title={t("c204.12")}>
                <div className="card">
                  <p>{t("c204.13")}</p>
                </div>
              </Tooltip>
              <Tooltip title={t("c204.14")}>
                <div className="card">
                  <p>{t("c204.15")}</p>
                </div>
              </Tooltip>
              <Tooltip title={t("c204.16")}>
                <div className="card">
                  <p>{t("c204.17")}</p>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c204.18")}</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>{t("c204.19")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.20")}</p>
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
            <h3>{t("c204.21")}</h3>
            <div className="card-descri">
              <p>{t("c204.22")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.23")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.24")}</p>
            </div>
            <div className="card-descri">
              <p>{t("c204.25")}</p>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c204.26")}</h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/IMG_1271.jpeg" alt="" />
                <div>
                  <h3>{t("c204.27")}</h3>
                  <p>{t("c204.28")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/leader cluster.jpeg" alt="" />
                <div>
                  <h3>{t("c204.29")}</h3>
                  <p>{t("c204.30")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/Leader national.JPG" alt="" />
                <div>
                  <h3>{t("c204.31")}</h3>
                  <p>{t("c204.32")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: "50vh" }}>
                <img src="/images/204/record meeting.jpeg" alt="" />
                <div>
                  <h3>{t("c204.33")}</h3>
                  <p>{t("c204.34")}</p>
                  <p>{t("c204.35")}</p>
                  <p>{t("c204.36")}</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c204.37")}</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "40%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>{t("c204.38")}</p>
                </div>
                <div className="card-descri">
                  <h4>{t("c204.39")}</h4>
                  <p>{t("c204.40")}</p>
                  <ul style={{ marginLeft: 20 }}>
                    <li>{t("c204.41")}</li>
                    <li>{t("c204.42")}</li>
                    <li>{t("c204.43")}</li>
                  </ul>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img src="/images/204/webdiagram.png" alt="" />
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c204.44")}</h3>
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
                <p>{t("c204.45")}</p>
                <div className="card-descri">
                  <p>{t("c204.46")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.47")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.48")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c204.49")}</p>
                </div>
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
            <Quest4 />
          </div>
        </div>
      </>
    )
  );
}
