import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import "../../../styles/cours-content.scss";

export default function C207() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["207"]?.rating || 0);
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
    user.formation["207"] = {};
    user.formation["207"].progress = 100;
    try {
      await updateDatabase();
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours");
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  useEffect(() => {
    if (user?.formation["207"]?.progress === 100) {
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
            <h3>{t("c207.0")}</h3>
            <Carousel>
              <div className="row-content" style={{ minHeight: "80vh" }}>
                <img src="/images/207/IMG_0231.JPG" alt="" />
                <div>
                  <h4>{t("c207.1")}</h4>
                  <p>{t("c207.2")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/P1100297.JPG" alt="" />
                <div>
                  <h4>{t("c207.3")}</h4>
                  <p>{t("c207.4")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/P1100319.JPG" alt="" />
                <div>
                  <h4>{t("c207.5")}</h4>
                  <p>{t("c207.6")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/case.JPG" alt="" />
                <div>
                  <h4>{t("c207.7")}</h4>
                  <p>{t("c207.8")}</p>
                </div>
              </div>
              <div className="row-content" style={{ minHeight: 800 }}>
                <img src="/images/207/paysage.jpeg" alt="" />
                <div>
                  <h4>{t("c207.9")}</h4>
                  <p>{t("c207.10")}</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="column-content">
            <h3>{t("c207.11")}</h3>
            <div className="row-content">
              <div
                className="column-content"
                style={{ width: "50%", minWidth: 300 }}
              >
                <div className="card-descri">
                  <p>{t("c207.12")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.13")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.14")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.15")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.16")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.17")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.18")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.19")}</p>
                </div>
                <div className="card-descri">
                  <p>{t("c207.20")}</p>
                </div>
              </div>
              <div style={{ width: "40%", minWidth: 300 }}>
                <img
                  src="/images/207/P1100127.JPG"
                  alt=""
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["207"].rating = n;
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
