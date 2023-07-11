import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActContext } from "../App";
import { AbcOutlined, AccountCircleOutlined, HelpOutline, LogoutRounded } from "@mui/icons-material";
import axios from "axios";
import "../styles/navbar.scss";
import Lang from "./Lang";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const [width, setWidth] = useState(document.body.offsetWidth);
  const { user, setUser, server, setAlert, setLoad, t } = useContext(ActContext);
  const logout = () => {
    navigate("/");
    setLoad(true);
    axios({
      url: server + "/logout",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        id: user.id,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        setUser();
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: err.response.data.error || "Erreur de connexion!",
        });
      })
      .finally(() => setLoad(false));
  };
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWidth(document.body.offsetWidth);
    })
    // eslint-disable-next-line
  }, []);
  return (
    <header id="navbar">
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <img
          src="/logo.png"
          id="logo"
          alt="Logo"
          onClick={() => window.open("https://teraka.org", "_blank")}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            className="nav-btn"
            style={{ padding: width > 500 ? "10px 0": "5px 0",  fontSize: "12px", width: width > 500 ? "150px":"100px" }}
            onClick={() => window.open("https://programme.teraka.org", "_self")}
          >
            {t("button.0")} TERAKA
          </button>
          <button
            className="nav-btn"
            style={{ padding: width > 500 ? "10px 0": "5px 0", fontSize: "12px", width: width > 500 ? "150px":"100px" }}
            onClick={() => window.open("https://rejoindre.teraka.org", "_self")}
          >
            {t("button.1")} TERAKA
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap", justifyContent: "center"}}>
        <Lang />
        {user && (
          <>
            <Avatar
              onClick={(e) => {
                if (anchor) {
                  setAnchor(null);
                  return;
                }
                setAnchor(e.currentTarget);
              }}
              sx={{ cursor: "pointer" }}
            >
              {user.nom.substr(0, 1) + user.prenom.substr(0, 1)}
            </Avatar>
            <Menu
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              onClick={() => setAnchor(null)}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                <AccountCircleOutlined />
                {t("button.2")}
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                onClick={() => navigate("/")}
              >
                <AbcOutlined /> {t("button.3")}
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                onClick={() => navigate("/")}
              >
                <HelpOutline /> {t("button.4")}
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                onClick={logout}
              >
                <LogoutRounded /> {t("button.5")}
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
}
