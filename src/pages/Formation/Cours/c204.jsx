import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Files from "../Files";
import { DownloadRounded } from "@mui/icons-material";

export default function C204() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["204"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["204"]?.progress * 10) / 100) &&
      (user?.formation["204"]?.progress * 10) / 100 !== 10
      ? (user?.formation["204"]?.progress * 10) / 100
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
      !user.formation["204"] ||
      user.formation["204"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["204"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["204"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["204"]?.progress * 10) / 100 === 10) {
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
              {Files[204].map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noreferrer">
                  Fichier {index} <DownloadRounded />
                </a>
              ))}
            </div>
            <p>{t("c204.0")}</p>
            <p>{t("c204.1")}</p>
            <h3>{t("c204.2")}</h3>
            <p>{t("c204.3")}</p>
            <h3>{t("c204.4")}</h3>
            <p>{t("c204.5")}</p>
            <h3>{t("c204.6")}</h3>
            <p>{t("c204.7")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.8")}</li>
              <li>{t("c204.9")}</li>
              <li>{t("c204.10")}</li>
              <li>{t("c204.11")}</li>
              <li>{t("c204.12")}</li>
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
            <p>{t("c204.13")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.14")}</li>
              <li>{t("c204.15")}</li>
              <li>{t("c204.16")}</li>
              <li>{t("c204.17")}</li>
              <li>{t("c204.18")}</li>
              <li>{t("c204.19")}</li>
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
            <h3>{t("c204.20")}</h3>
            <p>{t("c204.21")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.22")}</li>
              <li>{t("c204.23")}</li>
              <li>{t("c204.24")}</li>
            </ul>
            <h3>{t("c204.25")}</h3>
            <p>{t("c204.26")}</p>
            <p>{t("c204.27")}</p>
            <h3>{t("c204.28")}</h3>
            <p>{t("c204.29")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.30")}</li>
              <li>{t("c204.31")}</li>
              <li>{t("c204.32")}</li>
              <li>{t("c204.33")}</li>
              <li>{t("c204.34")}</li>
              <li>{t("c204.35")}</li>
              <li>{t("c204.36")}</li>
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
            <h3>{t("c204.37")}</h3>
            <p>{t("c204.38")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.39")}</li>
              <li>{t("c204.40")}</li>
              <li>{t("c204.41")}</li>
              <li>{t("c204.42")}</li>
              <li>{t("c204.43")}</li>
              <li>{t("c204.44")}</li>
              <li>{t("c204.45")}</li>
              <li>{t("c204.46")}</li>
              <li>{t("c204.47")}</li>
            </ul>
            <p>{t("c204.48")}</p>
            <h3>{t("c204.49")}</h3>
            <p>{t("c204.50")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.51")}</li>
              <li>{t("c204.52")}</li>
              <li>{t("c204.53")}</li>
              <li>{t("c204.54")}</li>
              <li>{t("c204.55")}</li>
            </ul>
            <p>{t("c204.56")}</p>
            <h3>{t("c204.57")}</h3>
            <p>{t("c204.58")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.59")}</li>
              <li>{t("c204.60")}</li>
              <li>{t("c204.61")}</li>
              <li>{t("c204.62")}</li>
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
        {nb === 4 && (
          <div className="content">
            <h3>{t("c204.63")}</h3>
            <p>{t("c204.64")}</p>
            <h4>{t("c204.65")}</h4>
            <p>{t("c204.66")}</p>
            <p>{t("c204.67")}</p>
            <p>{t("c204.68")}</p>
            <p>{t("c204.69")}</p>
            <h3>{t("c204.70")}</h3>
            <p>{t("c204.71")}</p>
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
            <h3>{t("c204.72")} </h3>
            <p>{t("c204.73")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.74")}</li>
              <li>{t("c204.75")}</li>
              <li>{t("c204.76")}</li>
              <li>{t("c204.77")}</li>
              <li>{t("c204.78")}</li>
              <li>{t("c204.79")}</li>
              <li>{t("c204.80")}</li>
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
        {nb === 6 && (
          <div className="content">
            <h3>{t("c204.81")}</h3>
            <p>{t("c204.82")}</p>
            <h4>{t("c204.83")}</h4>
            <p>{t("c204.84")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.85")}</li>
              <li>{t("c204.86")}</li>
              <li>{t("c204.87")}</li>
            </ul>
            <h4>{t("c204.88")}</h4>
            <p>{t("c204.89")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.90")}</li>
              <li>{t("c204.91")}</li>
              <li>{t("c204.92")}</li>
              <li>{t("c204.93")}</li>
            </ul>
            <p>{t("c204.94")}</p>
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
            <h3>{t("c204.95")}</h3>
            <p>{t("c204.96")}</p>

            <p>{t("c204.97")}</p>
            <p>{t("c204.98")}</p>
            <h4>{t("c204.99")}</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.100")}</li>
              <li>{t("c204.101")}</li>
              <li>{t("c204.102")}</li>
              <li>{t("c204.103")}</li>
              <li>{t("c204.104")}</li>
              <li>{t("c204.105")}</li>
              <li>{t("c204.106")}</li>
            </ul>
            <h4>{t("c204.107")}</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.108")}</li>
              <li>{t("c204.109")}</li>
            </ul>
            <h4>{t("c204.110")}</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.111")}</li>
              <li>{t("c204.112")}</li>
              <li>{t("c204.113")}</li>
              <li>{t("c204.114")}</li>
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
        {nb === 8 && (
          <div className="content">
            <h3>{t("c204.115")}</h3>
            <p>{t("c204.116")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c204.117")}</li>
              <li>{t("c204.118")}</li>
              <li>{t("c204.119")}</li>
              <li>{t("c204.120")}</li>
              <li>{t("c204.121")}</li>
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
        {nb === 9 && (
          <div className="content">
            <h3>{t("c204.122")}</h3>
            <p>{t("c204.123")}</p>
            <p>{t("c204.124")}</p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["204"].rating = n;
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
