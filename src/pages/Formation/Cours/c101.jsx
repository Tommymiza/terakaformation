import { Rating } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";

const CHAP = 101;

export default function C101() {
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
        navigate("/cours/1/02");
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
          <p>{t("c101.5")}</p>
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
          <p>{t("c101.8")}</p>
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
          <p>{t("c101.11")}</p>
          <div className="image-center-column" style={{ marginTop: "0" }}>
            <img src="/images/101_15.png" width={"100%"} alt="nav" />
            <p>
              <i>{t("c101.12")}</i>
            </p>
          </div>
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
            onClick={() => {
              updateDatabase({ progress: 100 });
            }}
            disabled={load}
          >
            {t("button.12")}
          </button>
        </div>
      </div>
    </>
  );
}
