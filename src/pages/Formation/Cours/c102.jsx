import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";

const CHAP = 102;

export default function C102() {
  const { user, server, setAlert, t, setUser } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const updateDatabase = async (data) => {
    try {
      setLoad(true);
      await axios({
        method: "POST",
        url: server + "/updateformation",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          id_user: user.id,
          chapitre: CHAP,
          ...data,
        },
      });
      const response = await axios({
        url: server + "/getuser",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(response.data.user);
      if (data.progress === 100) {
        setAlert({
          type: "success",
          message: t("alert.2"),
        });
        navigate("/cours/2/01");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.error || "Erreur de connexion!",
      });
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    if (
      (user?.progressions.find((p) => p.chapitre === CHAP)?.progress * 2) /
        100 ===
      2
    ) {
      setAlert({
        type: "success",
        message: t("alert.2"),
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
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
            value={
              user?.progressions.find((p) => p.chapitre === CHAP)?.rating ?? 0
            }
            onChange={(e, n) => {
              if (n) {
                updateDatabase({ rating: n });
              }
            }}
          />
          <button
            className="nav-btn"
            onClick={() => updateDatabase({ progress: 100 })}
            disabled={load}
          >
            {t("button.13")}
          </button>
        </div>
      </div>
    </>
  );
}
