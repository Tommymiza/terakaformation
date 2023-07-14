import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";

export default function C207() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["207"]?.rating || 0);
  const [nb, setNb] = useState(
    user?.formation["207"]?.progress !== 45 &&
      user?.formation["207"]?.progress !== 85
      ? 0
      : user?.formation["207"]?.progress === 45
      ? 1
      : 2 ?? 0
  );
  function updateDatabase() {
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
        message: err.response.data.error ?? "Erreur de connexion!",
      });
    });
  }
  function valider(n) {
    if (!user.formation["207"] || user.formation["207"].progress < n) {
      var temp = Object.create(user.formation["207"] ?? { progress: 0 });
      temp.progress = n;
      user.formation["207"] = temp;
      updateDatabase();
    }
    if (n === 100) {
      sendFinish();
    }
    setNb(nb + 1);
  }
  function sendFinish() {
    setAlert({
      type: "success",
      message: t("alert.1"),
    });
    navigate("/cours");
  }
  useEffect(() => {
    if (user?.formation["207"]?.progress === 100) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 3) {
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <p>{t("c207.0")}</p>
            <p>{t("c207.1")}</p>
            <h3>{t("c207.2")}</h3>
            <p>{t("c207.3")}</p>
            <h3>{t("c207.4")}</h3>
            <div className="content-part">
              <h5>{t("c207.5")}</h5>
              <p>{t("c207.6")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c207.7")}</h5>
              <p>{t("c207.8")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c207.9")}</h5>
              <p>{t("c207.10")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c207.11")}</h5>
              <p>{t("c207.12")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c207.13")}</h5>
              <p>{t("c207.14")}</p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(45)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>{t("c207.15")}</h3>
            <p>{t("c207.16")}</p>
            <p>{t("c207.17")}</p>
            <div className="content-part">
              <p>{t("c207.18")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.19")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.20")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.21")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.22")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.23")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.24")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.25")}</p>
            </div>
            <div className="content-part">
              <p>{t("c207.26")}</p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(85)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>{t("c207.27")}</h3>
            <p>{t("c207.28")}</p>
            <p>{t("c207.29")}</p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["207"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(100)}>
                {t("button.13")}
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
