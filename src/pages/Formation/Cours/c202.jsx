import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Test from "./Test202";

export default function C202() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["202"]?.rating || 0);
  const [nb, setNb] = useState(
    user?.formation["202"]?.progress !== 15 &&
      user?.formation["202"]?.progress !== 85
      ? 0
      : user?.formation["202"]?.progress === 15
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
    if (!user.formation["202"] || user.formation["202"].progress < n) {
      var temp = Object.create(user.formation["202"] ?? { progress: 0 });
      temp.progress = n;
      user.formation["202"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  function sendTest() {
    setAlert({
      type: "success",
      message: "Misaotra nanantontosa ny fanadinana",
    });
    navigate("/cours");
  }
  useEffect(() => {
    if (user?.formation["202"]?.progress === 100) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 3) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <h3>{t("c202.0")}</h3>
            <p>{t("c202.1")}</p>
            <p>{t("c202.2")}</p>
            <p>{t("c202.3")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(15)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>{t("c202.4")}</h3>
            <p>{t("c202.5")}</p>
            <p>{t("c202.6")}</p>
            <div className="content-part">
              <h5>{t("c202.7")}</h5>
              <p>{t("c202.8")}</p>
              <p>{t("c202.9")}</p>
              <p>{t("c202.10")}</p>
            </div>
            <p>{t("c202.11")}</p>
            <p>{t("c202.12")}</p>
            <div className="content-part">
              <h5>{t("c202.13")}</h5>
              <p>{t("c202.14")}</p>
            </div>
            <p>{t("c202.15")}</p>
            <p>{t("c202.16")}</p>
            <p>{t("c202.17")}</p>
            <p>{t("c202.18")}</p>
            <p>{t("c202.19")}</p>
            <div className="content-part">
              <h5>{t("c202.20")}</h5>
              <p>{t("c202.21")}</p>
              <p>{t("c202.22")}</p>
              <p>{t("c202.23")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c202.24")}</h5>
              <p>{t("c202.25")}</p>
              <p>{t("c202.26")}</p>
              <p>{t("c202.27")}</p>
              <p>{t("c202.28")}</p>
              <p>{t("c202.44")}</p>
            </div>
            <div className="image-center-row">
              <img
                src="/images/202_arbre_1.png"
                alt="202_arbre_1.png"
                style={{ objectFit: "contain" }}
              />
              <p>{t("c202.29")}</p>
            </div>
            <div className="image-center-column">
              <img
                src="/images/202_arbre_2.png"
                alt="202_arbre_2.png"
                style={{ width: "100%", objectFit: "contain" }}
              />
              <div>
                <p>{t("c202.30")}</p>
                <img
                  src="/images/arrow.png"
                  alt="arrow"
                  style={{ width: "60%" }}
                />
                <p>{t("c202.31")}</p>
              </div>
              <p>{t("c202.32")}</p>
            </div>
            <p>{t("c202.33")}</p>
            <p>{t("c202.34")}</p>
            <div className="image-center-column">
              <img
                src="/images/202_arbre_3.png"
                alt="202_arbre_3.png"
                style={{ width: "100%", objectFit: "contain" }}
              />
              <p>{t("c202.35")}</p>
              <p>{t("c202.36")}</p>
            </div>
            <p>{t("c202.37")}</p>
            <p>{t("c202.38")}</p>
            <p>{t("c202.39")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(85)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>{t("c202.40")}</h3>
            <p>{t("c202.41")}</p>
            <p>{t("c202.42")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(100)}>
                Tapitra
              </button>
            </div>
          </div>
        )}
        {nb === 3 && (
          <div className="content">
            <h3>{t("c202.43")}</h3>
            <Test />
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["202"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => sendTest()}>
                Alefa
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
