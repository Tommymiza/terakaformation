import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../../App";
import axios from "axios";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";

export default function C101() {
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["101"]?.rating || 0);
  const [nb, setNb] = useState(
    isNaN(parseInt((user?.formation["101"]?.progress * 2) / 100))
      ? 0
      : parseInt((user?.formation["101"]?.progress * 2) / 100) >= 2
      ? 0
      : parseInt((user?.formation["101"]?.progress * 2) / 100)
  );
  const navigate = useNavigate();
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
  function valider() {
    if (
      !user.formation["101"] ||
      user.formation["101"].progress < (nb + 1) * 50
    ) {
      var temp = Object.create(user.formation["101"] ?? { progress: 0 });
      temp.progress = (nb + 1) * 50;
      user.formation["101"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["101"]?.progress * 2) / 100 === 2) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
      setNb(0);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 2) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);
  return (
    <>
      {nb === 0 && (
        <div className="content">
          <h1>{t("c101.0")}</h1>
          <div className="content-part" style={{ width: "100%" }}>
            <h5>{t("c101.1")}</h5>
            <p>{t("c101.2")}</p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_1.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.3")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.4")}</h5>
            <p>
            {t("c101.5")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_3.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.6")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.7")}</h5>
            <p>
            {t("c101.8")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_2.png" width={"300px"} alt="nav" />
              <p>
                <i>{t("c101.9")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.10")}</h5>
            <p>
            {t("c101.11")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_15.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.12")}</i>
              </p>
            </div>
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider()}>
            {t("button.12")}
            </button>
          </div>
        </div>
      )}
      {nb === 1 && (
        <div className="content">
          <h3>{t("c101.13")}</h3>
          <div className="content-part" style={{ width: "100%" }}>
            <h5>{t("c101.14")}</h5>
            <p>
            {t("c101.15")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_7.png" width={"200px"} alt="nav" />
              <p>
                <i>{t("c101.16")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.17")}</h5>
            <p>{t("c101.18")}</p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_10.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.19")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.20")}</h5>
            <p>
            {t("c101.21")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_11.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.22")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.23")}</h5>
            <p>
            {t("c101.24")}
            </p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_13.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.25")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.26")}</h5>
            <p>{t("c101.27")}</p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_14.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.28")}</i>
              </p>
            </div>
          </div>
          <div
            className="content-part"
            style={{ marginTop: "50px", width: "100%" }}
          >
            <h5>{t("c101.29")}</h5>
            <p>{t("c101.30")}</p>
            <div className="image-center-column" style={{ marginTop: "0" }}>
              <img src="/images/101_16.png" width={"100%"} alt="nav" />
              <p>
                <i>{t("c101.31")}</i>
              </p>
            </div>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["101"].rating = n;
                updateDatabase();
                setRating(n);
              }}
            />
          </div>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider()}>
              {t("button.13")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
