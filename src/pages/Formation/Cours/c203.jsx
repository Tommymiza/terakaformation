import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";

export default function C203() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["203"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["203"]?.progress * 5) / 100) &&
      (user?.formation["203"]?.progress * 5) / 100 !== 5
      ? (user?.formation["203"]?.progress * 5) / 100
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
      !user.formation["203"] ||
      user.formation["203"].progress < (nb + 1) * 20
    ) {
      var temp = Object.create(user.formation["203"] ?? { progress: 0 });
      temp.progress += 20;
      user.formation["203"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["203"]?.progress * 5) / 100 === 5) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 5) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
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
            <p>{t("c203.0")}</p>
            <p>{t("c203.1")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c203.2")}</li>
              <li>{t("c203.3")}</li>
              <li>{t("c203.4")}</li>
              <li>{t("c203.5")}</li>
            </ul>
            <h3>{t("c203.6")}</h3>
            <p>{t("c203.7")}</p>
            <p>{t("c203.8")}</p>
            <p>{t("c203.9")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c203.10")}</li>
              <li>{t("c203.11")}</li>
              <li>{t("c203.12")}</li>
              <li>{t("c203.13")}</li>
              <li>{t("c203.14")}</li>
            </ul>
            <p>{t("c203.15")}</p>
            <p>{t("c203.16")}</p>
            <p>{t("c203.17")}</p>
            <h3>{t("c203.18")}</h3>
            <p>{t("c203.19")}</p>
            <p>{t("c203.20")}</p>
            <p>{t("c203.21")}</p>
            <p>{t("c203.22")}</p>
            <p>{t("c203.23")}</p>
            <h4>{t("c203.24")}</h4>
            <p>{t("c203.25")}</p>
            <h3>{t("c203.26")}</h3>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>{t("c203.27")}</h3>
            <p>{t("c203.28")}</p>
            <div className="content-part">
              <h5>{t("c203.29")}</h5>
              <p>{t("c203.30")}</p>
            </div>
            <div className="image-center-column">
              <img
                src="/images/203_1.png"
                alt="203_1.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.31")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_2.png"
                alt="203_2.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.32")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_3.png"
                alt="203_3.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.33")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_4.png"
                alt="203_4png"
                style={{ width: "30%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.34")}</p>
            <p>{t("c203.35")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_5.png"
                alt="203_5.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.36")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_6.png"
                alt="203_6.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.37")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_7.png"
                alt="203_7.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.38")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_8.png"
                alt="203_8.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.39")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_9.png"
                alt="203_9.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.40")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_10.png"
                alt="203_10.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.41")}</p>
            <p>{t("c203.42")}</p>
            <p>{t("c203.43")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_11.png"
                alt="203_11.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <p>{t("c203.44")}</p>
            <div className="content-part">
              <h5>{t("c203.45")}</h5>
              <p>{t("c203.46")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c203.47")}</h5>
              <p>{t("c203.48")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c203.49")}</h5>
              <p>{t("c203.50")}</p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 3 && (
          <div className="content">
            <h3>{t("c203.51")}</h3>
            <p>{t("c203.52")}</p>
            <div className="image-center-column">
              <img
                src="/images/203_2.png"
                alt="203_2.png"
                style={{ width: "50%", minWidth: "300px" }}
              />
            </div>
            <p>{t("c203.53")}</p>
            <div className="content-part">
              <h5>{t("c203.54")}</h5>
              <div className="row-content">
                <ul>
                  <li>{t("c203.55")}</li>
                  <li>{t("c203.56")}</li>
                  <li>{t("c203.57")}</li>
                </ul>
                <img src="/images/203_12.jpg" alt="203_12" />
              </div>
            </div>
            <div className="content-part">
              <h5>{t("c203.58")}</h5>
              <div className="row-content">
                <ul>
                  <li>{t("c203.59")}</li>
                  <li>{t("c203.60")}</li>
                  <li>{t("c203.61")}</li>
                </ul>
                <img src="/images/203_13.jpg" alt="203_13" />
              </div>
            </div>
            <div className="content-part">
              <h5>{t("c203.62")}</h5>
              <p>{t("c203.63")}</p>
            </div>
            <div className="image-center-column">
              <img
                src="/images/203_14.jpg"
                alt="203_14"
                style={{ width: "50%", minWidth: "250px" }}
              />
            </div>
            <div className="content-part">
              <h5>{t("c203.64")}</h5>
              <p>{t("c203.65")}</p>
            </div>
            <div className="image-center-column">
              <img
                src="/images/203_15.png"
                alt="203_15"
                style={{ width: "20%", minWidth: "100px" }}
              />
            </div>
            <div className="content-part">
              <h5>{t("c203.66")}</h5>
              <p>{t("c203.67")}</p>
              <p>{t("c203.68")}</p>
            </div>
            <div className="image-center-column">
              <img
                src="/images/203_16.jpg"
                alt="203_16"
                style={{ width: "50%", minWidth: "250px" }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 4 && (
          <div className="content">
            <h3>{t("c203.69")}</h3>
            <p>{t("c203.70")}</p>
            <p>{t("c203.71")}</p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["203"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tapitra
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
