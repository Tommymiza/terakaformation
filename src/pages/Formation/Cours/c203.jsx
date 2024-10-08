import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";
import Quest3 from "../Qcm/Quest3";

const CHAP = 203;

export default function C203() {
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
        navigate("/cours/2/04");
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
            <h3>{t("c203.0")}</h3>
            <div className="article">
              <img src="/images/203/Carbonides-Carbone.png" alt="" />
              <div>
                <p>{t("c203.1")}</p>
                <p>{t("c203.2")}</p>
                <p>{t("c203.3")}</p>
                <p>{t("c203.4")}</p>
                <p>{t("c203.5")}</p>
                <p>{t("c203.6")}</p>
              </div>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c203.7")}</h3>
            <img
              src="/images/203/cycle-carbone.jpg"
              style={{ width: "50%", minWidth: 300 }}
              alt=""
            />
            <div className="card-descri">
              <h4>{t("c203.8")}</h4>
              <p>{t("c203.9")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c203.10")}</h4>
              <p>{t("c203.11")}</p>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c203.12")}</h3>
            <Carousel>
              <div className="column-content">
                <img
                  src="/images/203/203_1.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.13")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_2.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.14")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_3.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.15")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_4.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.16")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_5.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.17")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_6.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.18")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_7.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.19")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_8.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.20")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_9.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.21")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_10.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.22")}</p>
              </div>
              <div className="column-content">
                <img
                  src="/images/203/203_11.png"
                  alt=""
                  style={{ minWidth: 300, width: "50%" }}
                />
                <p style={{ fontWeight: "bolder" }}>{t("c203.23")}</p>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c203.24")}</h3>
            <div className="card-descri">
              <h4>{t("c203.25")}</h4>
              <p>{t("c203.26")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c203.27")}</h4>
              <p>{t("c203.28")}</p>
            </div>
            <div className="card-descri">
              <h4>{t("c203.29")}</h4>
              <p>{t("c203.30")}</p>
            </div>
          </div>
          <div className="column-content">
            <h3>{t("c203.31")}</h3>
            <div className="row-content">
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/CCfour-malgache.webp" alt="" />
                <div className="contenu">
                  <h5>{t("c203.32")}</h5>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/Photo_petite.jpg" alt="" />
                <div className="contenu">
                  <h5>{t("c203.33")}</h5>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img
                  src="/images/203/quand-epandre-le-fumier-de-cheval-dans-le-jardin.jpg"
                  alt=""
                />
                <div className="contenu">
                  <h5>{t("c203.34")}</h5>
                  <p>{t("c203.35")}</p>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/sante_1_0.jpg" alt="" />
                <div className="contenu">
                  <h5>{t("c203.36")}</h5>
                  <p>{t("c203.37")}</p>
                </div>
              </div>
              <div className="card" style={{ width: 300, height: 240 }}>
                <img src="/images/203/iStock-1406909744.jpg" alt="" />
                <div className="contenu">
                  <h5>{t("c203.38")}</h5>
                  <p>{t("c203.39")}</p>
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
            <Quest3 />
          </div>
        </div>
      </>
    )
  );
}
