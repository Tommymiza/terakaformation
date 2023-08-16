import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../../App";
import axios from "axios";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";

export default function C102() {
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["102"]?.rating || 0);
  const [nb, setNb] = useState(
    parseInt(user?.formation["101"]?.progress)
      ? 0
      : parseInt(user?.formation["101"]?.progress) === 100
      ? 0
      : 1
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
      !user.formation["102"] ||
      user.formation["102"].progress !== 100 
    ) {
      var temp = Object.create(user.formation["102"] ?? { progress: 0 });
      temp.progress = (nb + 1) * 100;
      user.formation["102"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["102"]?.progress * 1) / 100 === 1) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
      setNb(0);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 1) {
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);
  return (
    <>
      {nb === 0 && (
        <div className="content">
          <h3>{t("c102.0")}</h3>
          <p>{t("c102.1")}</p>
          <p>{t("c102.2")}</p>
          <div className="image-center-column" style={{ marginTop: "0" }}>
            <img
              src="/images/102_1.png"
              style={{ width: "50%", minWidth: "300px" }}
              alt="nav"
            />
            <p>
              <i>{t("c102.3")}</i>
            </p>
          </div>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                if(!user.formation["102"]){
                  user.formation["102"] = {}
                }
                user.formation["102"].rating = n;
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
