import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Files from "../Files";
import { DownloadRounded } from "@mui/icons-material";

export default function C206() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["206"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["206"]?.progress * 10) / 100) &&
      (user?.formation["206"]?.progress * 10) / 100 !== 10
      ? (user?.formation["206"]?.progress * 10) / 100
      : 0
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
        message: err.response.data.error || "Erreur de connexion!",
      });
    });
  }
  function valider(nb) {
    if (
      !user.formation["206"] ||
      user.formation["206"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["206"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["206"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["206"]?.progress * 10) / 100 === 10) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 10) {
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <h3 className="offline">{t("label")}</h3>
            <div className="list-fic">
              {Files[206].map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noreferrer">
                  Fichier {index} <DownloadRounded />
                </a>
              ))}
            </div>
            <h3>{t("c206.0")}</h3>
            <p>{t("c206.1")}</p>
            <p>{t("c206.2")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.3")}</li>
              <li>{t("c206.4")}</li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>{t("c206.5")}</h3>
            <p>{t("c206.6")}</p>
            <p>{t("c206.7")}</p>
            <p>{t("c206.8")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.9")}</li>
              <li>{t("c206.10")}</li>
              <li>{t("c206.11")}</li>
              <li>{t("c206.12")}</li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>{t("c206.13")}</h3>
            <p>{t("c206.14")}</p>
            <p>{t("c206.15")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.16")}</li>
              <li>{t("c206.17")}</li>
              <li>{t("c206.18")}</li>
              <li>{t("c206.19")}</li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 3 && (
          <div className="content">
            <h3>{t("c206.20")}</h3>
            <p>{t("c206.21")}</p>
            <p>{t("c206.22")}</p>
            <h4>{t("c206.23")}</h4>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>{t("c206.24")}</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_1.png"
                  alt="206_1"
                  style={{ width: "100px" }}
                />
                <p>{t("c206.25")}</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>{t("c206.26")}</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_2.png"
                  alt="206_2"
                  style={{ width: "150px" }}
                />
                <p>{t("c206.27")}</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>{t("c206.28")}</h5>
              <h5>{t("c206.29")}</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_3.png"
                  alt="206_3"
                  style={{ width: "200px" }}
                />
                <p>{t("c206.30")}</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>{t("c206.31")}</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_4.png"
                  alt="206_4"
                  style={{ width: "250px" }}
                />
                <p>{t("c206.32")}</p>
              </div>
            </div>
            <p>{t("c206.33")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 4 && (
          <div className="content">
            <h3>{t("c206.34")}</h3>
            <p>{t("c206.35")}</p>
            <p>{t("c206.36")}</p>
            <div className="image-center-column">
              <p>{t("c206.37")}</p>
              <img
                src="/images/206_5.png"
                alt="206_5"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.38")}</p>
              <img
                src="/images/206_6.png"
                alt="206_6"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.39")}</p>
              <img
                src="/images/206_7.png"
                alt="206_7"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c206.40")}</p>
            <div className="image-center-column">
              <p>{t("c206.41")}</p>
              <img
                src="/images/206_8.png"
                alt="206_8"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.42")}</p>
              <img
                src="/images/206_9.png"
                alt="206_9"
                style={{ width: "40%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.43")}</p>
              <p>{t("c206.44")}</p>
              <p>{t("c206.45")}</p>
              <img
                src="/images/206_10.png"
                alt="206_10"
                style={{ width: "300px" }}
              />
            </div>

            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 5 && (
          <div className="content">
            <h3>{t("c206.46")}</h3>
            <p>{t("c206.47")}</p>
            <div className="image-center-column">
              <p>{t("c206.48")}</p>
              <img
                src="/images/206_7.png"
                alt="206_7"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.49")}</p>
              <img
                src="/images/206_11.png"
                alt="206_11"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.50")}</p>
              <p>{t("c206.51")}</p>
              <img
                src="/images/206_10.png"
                alt="206_10"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.52")}</p>
              <img
                src="/images/206_12.png"
                alt="206_12"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.53")}</p>
              <img
                src="/images/206_13.png"
                alt="206_13"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>{t("c206.54")}</p>
              <img
                src="/images/206_14.png"
                alt="206_14"
                style={{ width: "80%", minWidth: "300px" }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 6 && (
          <div className="content">
            <h3>{t("c206.55")}</h3>
            <p>{t("c206.56")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.57")}</li>
              <li>
                {t("c206.58")}
                <ul style={{ marginLeft: "20px" }}>
                  <li>{t("c206.59")}</li>
                  <li>{t("c206.60")}</li>
                  <li>{t("c206.61")}</li>
                  <li>{t("c206.62")}</li>
                  <li>{t("c206.63")}</li>
                </ul>
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 7 && (
          <div className="content">
            <h3>{t("c206.64")}</h3>
            <p>{t("c206.65")}</p>
            <p>{t("c206.66")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.67")}</li>
              <li>{t("c206.68")}</li>
              <li>{t("c206.69")}</li>
              <li>{t("c206.70")}</li>
            </ul>
            <p>{t("c206.71")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 8 && (
          <div className="content">
            <h3>{t("c206.72")}</h3>
            <p>{t("c206.73")}</p>
            <p>{t("c206.74")}</p>
            <p>{t("c206.75")}</p>
            <p>{t("c206.76")}</p>
            <p>{t("c206.77")}</p>
            <p>{t("c206.78")}</p>
            <p>{t("c206.79")}</p>
            <ol style={{ marginLeft: "20px" }}>
              <li>{t("c206.80")}</li>
              <li>{t("c206.81")}</li>
              <li>{t("c206.82")}</li>
              <li>{t("c206.83")}</li>
              <li>{t("c206.84")}</li>
              <li>{t("c206.85")}</li>
              <li>
                {t("c206.86")}
                <ol type="a" style={{ marginLeft: "40px" }}>
                  <li>{t("c206.87")}</li>
                  <li>{t("c206.88")}</li>
                  <li>{t("c206.89")}</li>
                  <li>{t("c206.90")}</li>
                  <li>{t("c206.91")}</li>
                  <li>{t("c206.92")}</li>
                  <li>{t("c206.93")}</li>
                  <li>{t("c206.94")}</li>
                  <li>{t("c206.95")}</li>
                  <li>{t("c206.96")}</li>
                  <li>{t("c206.97")}</li>
                  <li>{t("c206.98")}</li>
                  <li>{t("c206.99")}</li>
                  <li>{t("c206.100")}</li>
                  <li>{t("c206.101")}</li>
                </ol>
              </li>
              <li>
                {t("c206.102")}
                <ol type="a" style={{ marginLeft: "40px" }}>
                  <li>{t("c206.103")}</li>
                  <li>{t("c206.104")}</li>
                  <li>{t("c206.105")}</li>
                  <li>{t("c206.106")}</li>
                  <li>{t("c206.107")}</li>
                  <li>{t("c206.108")}</li>
                  <li>{t("c206.109")}</li>
                  <li>{t("c206.110")}</li>
                  <li>{t("c206.111")}</li>
                  <li>{t("c206.112")}</li>
                </ol>
              </li>
              <li>{t("c206.113")}</li>
              <li>{t("c206.114")}</li>
              <li>{t("c206.115")}</li>
              <li>{t("c206.116")}</li>
              <li>{t("c206.117")}</li>
              <li>{t("c206.118")}</li>
              <li>{t("c206.119")}</li>
              <li>{t("c206.120")}</li>
              <li>{t("c206.121")}</li>
            </ol>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 9 && (
          <div className="content">
            <h3>{t("c206.122")}</h3>
            <p>{t("c206.123")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c206.124")}</li>
              <li>{t("c206.125")}</li>
              <li>{t("c206.126")}</li>
              <li>{t("c206.127")}</li>
              <li>{t("c206.128")}</li>
            </ul>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["206"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.13")}
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
