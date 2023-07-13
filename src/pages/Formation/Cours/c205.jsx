import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Test205 from "./Test205";

export default function C205() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["205"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["205"]?.progress * 10) / 100) &&
      (user?.formation["205"]?.progress * 10) / 100 !== 10
      ? (user?.formation["205"]?.progress * 10) / 100
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
      !user.formation["205"] ||
      user.formation["205"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["205"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["205"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["205"]?.progress * 10) / 100 === 10) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 10) {
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
            <h3>{t("c205.0")}</h3>
            <p>{t("c205.1")}</p>
            <h4>{t("c205.2")}</h4>
            <p>{t("c205.3")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.4")}</li>
              <li>{t("c205.5")}</li>
              <li>{t("c205.6")}</li>
              <li>{t("c205.7")}</li>
              <li>{t("c205.8")}</li>
            </ul>
            <h4>{t("c205.9")}</h4>
            <p>{t("c205.10")}</p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>{t("c205.11")}</h3>
            <p>{t("c205.12")}</p>
            <h3>{t("c205.13")}</h3>
            <p>{t("c205.14")}</p>
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
            <h3>{t("c205.15")}</h3>
            <p>{t("c205.16")}</p>
            <p>{t("c205.17")}</p>
            <h3>{t("c205.18")}</h3>
            <div className="content-part">
              <h5>
                {t("c205.19")}
                <a href="https://rejoindre.teraka.org">rejoindre.teraka.org</a>
              </h5>
              <p>
                {t("c205.20")}
                <a href="https://rejoindre.teraka.org">
                  rejoindre.teraka.org
                </a>{" "}
                {t("c205.21")}
              </p>
            </div>
            <div className="content-part">
              <h5>{t("c205.22")}</h5>
              <p>{t("c205.23")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c205.24")}</h5>
              <p>{t("c205.25")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c205.26")}</h5>
              <p>
                {t("c205.27")}
                <br />
                {t("c205.28")}
                <br />
                {t("c205.29")}
                <br />
                {t("c205.30")}
              </p>
            </div>
            <div className="content-part">
              <h5>{t("c205.31")}</h5>
              <p>{t("c205.32")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c205.33")}</h5>
              <p>{t("c205.34")}</p>
              <p>
                {t("c205.35")}
                <br />
                {t("c205.36")}
                <br />
                {t("c205.37")}
                <br />
                {t("c205.38")}
                <br />
                {t("c205.39")}
                <br />
                {t("c205.40")}
                <br />
                {t("c205.41")}
              </p>
            </div>
            <div className="content-part">
              <h5>{t("c205.42")}</h5>
              <p>{t("c205.43")}</p>
              <p>{t("c205.44")}</p>
            </div>
            <div className="content-part">
              <h5>{t("c205.45")}</h5>
              <p>{t("c205.46")}</p>
              <p>{t("c205.47")}</p>
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
        {nb === 3 && (
          <div className="content">
            <p>{t("c205.48")}</p>
            <p>{t("c205.49")}</p>
            <div className="image-center-column">
              <img
                src="/images/205_1.png"
                alt="205_1"
                style={{ width: "100%" }}
              />
            </div>
            <p>{t("c205.50")}</p>
            <p>
              {t("c205.51")}
              <br />
              {t("c205.52")}
              <br />
              {t("c205.53")}
              <br />
              {t("c205.54")}
              <br />
              {t("c205.55")}
              <br />
              {t("c205.56")}
              <br />
              {t("c205.57")}
              <br />
              {t("c205.58")}
            </p>
            <p>
              <u>{t("c205.59")}</u>
              {t("c205.60")}
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_2.png"
                alt="205_2"
                style={{ width: "100%" }}
              />
            </div>
            <h5>{t("c205.61")}</h5>
            <p>{t("c205.62")}</p>
            <div className="image-center-column">
              <img
                src="/images/205_3.png"
                alt="205_3"
                style={{ width: "100%" }}
              />
            </div>
            <p>
              <u>{t("c205.63")}</u>
              {t("c205.64")}
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_4.png"
                alt="205_4"
                style={{ width: "100%" }}
              />
            </div>
            <p>
              <u>{t("c205.65")}</u>
              {t("c205.66")}
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.67")}</li>
              <li>{t("c205.68")}</li>
              <li>{t("c205.69")}</li>
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
            <h3>{t("c205.70")}</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.71")}</li>
              <li>{t("c205.72")}</li>
              <li>{t("c205.73")}</li>
              <li>{t("c205.74")}</li>
              <li>{t("c205.75")}</li>
              <li>{t("c205.76")}</li>
              <li>{t("c205.77")}</li>
              <li>{t("c205.78")}</li>
              <li>{t("c205.79")}</li>
              <li>{t("c205.80")}</li>
              <li>{t("c205.81")}</li>
              <li>{t("c205.82")}</li>
              <li>{t("c205.83")}</li>
              <li>{t("c205.84")}</li>
            </ul>
            <h3>{t("c205.85")}</h3>
            <p>{t("c205.86")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.87")}</li>
              <li>
                {t("c205.88")}
                <ul style={{ marginLeft: "20px" }}>
                  <li>{t("c205.89")}</li>
                  <li>{t("c205.90")}</li>
                </ul>
              </li>
              <li>{t("c205.91")}</li>
              <li>{t("c205.92")}</li>
            </ul>
            <p>{t("c205.93")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.94")}</li>
              <li>{t("c205.95")}</li>
              <li>
                {t("c205.96")}
                <ul style={{ marginLeft: "20px" }}>
                  <li>{t("c205.97")}</li>
                  <li>{t("c205.98")}</li>
                  <li>{t("c205.99")}</li>
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
        {nb === 5 && (
          <div className="content">
            <h3>{t("c205.100")}</h3>
            <p>{t("c205.101")}</p>
            <p>{t("c205.102")}</p>
            <h3>{t("c205.103")}</h3>
            <Test205 />
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
            <h3>{t("c205.104")}</h3>
            <p>{t("c205.105")}</p>
            <h3>{t("c205.106")}</h3>
            <p>{t("c205.107")}</p>
            <p>{t("c205.108")}</p>
            <h3>{t("c205.109")}</h3>
            <p>{t("c205.110")}</p>
            <p>{t("c205.111")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.112")}</li>
              <li>{t("c205.113")}</li>
              <li>{t("c205.114")}</li>
            </ul>
            <h4>{t("c205.115")}</h4>
            <p>{t("c205.116")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.117")}</li>
              <li>{t("c205.118")}</li>
              <li>{t("c205.119")}</li>
              <li>{t("c205.120")}</li>
            </ul>
            <p>{t("c205.121")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.122")}</li>
              <li>{t("c205.123")}</li>
              <li>{t("c205.124")}</li>
              <li>{t("c205.125")}</li>
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
            <h3>{t("c205.126")}</h3>
            <p>{t("c205.127")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.128")}</li>
              <li>{t("c205.129")}</li>
              <li>{t("c205.130")}</li>
              <li>{t("c205.131")}</li>
            </ul>
            <p>{t("c205.132")}</p>
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
            <h3>{t("c205.133")}</h3>
            <p>{t("c205.134")}</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>{t("c205.135")}</li>
              <li>{t("c205.136")}</li>
              <li>{t("c205.137")}</li>
              <li>{t("c205.138")}</li>
            </ul>
            <p>{t("c205.139")}</p>
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
            <h3>{t("c205.140")}</h3>
            <p>{t("c205.141")}</p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["205"].rating = n;
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
