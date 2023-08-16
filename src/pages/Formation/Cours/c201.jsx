import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Files from "../Files";
import { DownloadRounded } from "@mui/icons-material";

export default function C201() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const page = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(user?.formation["201"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["201"]?.progress * page.length) / 100) &&
      (user?.formation["201"]?.progress * page.length) / 100 !== 5
      ? (user?.formation["201"]?.progress * page.length) / 100
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
      !user.formation["201"] ||
      user.formation["201"].progress < (nb + 1) * 20
    ) {
      var temp = Object.create(user.formation["201"] ?? { progress: 0 });
      temp.progress += 20;
      user.formation["201"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["201"]?.progress * page.length) / 100 === 5) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 5) {
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
              {Files[201].map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noreferrer">
                  Fichier {index} <DownloadRounded />
                </a>
              ))}
            </div>
            <h3>{t("c201.0")}</h3>
            <p>{t("c201.1")}</p>
            <p>{t("c201.2")}</p>
            <p>{t("c201.3")}</p>
            <p>{t("c201.4")}</p>
            <h3>{t("c201.5")}</h3>
            <p>{t("c201.6")}</p>
            <p>{t("c201.7")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c201.8")}</li>
              <li>{t("c201.9")}</li>
              <li>{t("c201.10")}</li>
              <li>{t("c201.11")}</li>
              <li>{t("c201.12")}</li>
              <li>{t("c201.13")}</li>
              <li>{t("c201.14")}</li>
              <li>{t("c201.61")}</li>
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
            <h3>{t("c201.15")}</h3>
            <p>{t("c201.16")}</p>
            <p>{t("c201.17")}</p>
            <p>{t("c201.18")}</p>
            <p>{t("c201.19")}</p>
            <p>{t("c201.20")}</p>
            <p>{t("c201.21")}</p>
            <p>{t("c201.22")}</p>
            <p>{t("c201.23")}</p>
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
            <h3>{t("c201.24")}</h3>
            <div className="content-part">
              <h5>{t("c201.25")}</h5>
              <p>{t("c201.26")}</p>
              <p>{t("c201.27")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.28")}</h5>
              <p>{t("c201.29")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.30")}</h5>
              <p>{t("c201.31")}</p>
            </div>
            <h3>{t("c201.32")}</h3>
            <p>{t("c201.33")}</p>
            <p>{t("c201.34")}</p>
            <p>{t("c201.35")}</p>
            <p>{t("c201.36")}</p>
            <p>{t("c201.37")}</p>
            <p>{t("c201.38")}</p>
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
            <h3>{t("c201.39")} </h3>
            <div className="content-part">
              <h5>{t("c201.40")}</h5>
              <p>{t("c201.41")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.42")}</h5>
              <p>{t("c201.43")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.44")}</h5>
              <p>{t("c201.45")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.46")}</h5>
              <p>{t("c201.47")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.48")}</h5>
              <p>{t("c201.49")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.50")}</h5>
              <p>{t("c201.51")}</p>
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
        {nb === 4 && (
          <div className="content">
            <h3>{t("c201.52")}</h3>
            <div className="content-part">
              <h5>{t("c201.53")}</h5>
              <p>{t("c201.54")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.55")}</h5>
              <p>{t("c201.56")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.57")}</h5>
              <p>{t("c201.58")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c201.59")}</h5>
              <p>{t("c201.60")}</p>
            </div>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["201"].rating = n;
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
