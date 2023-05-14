import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActContext } from "../App";
import { FavoriteBorderRounded, LogoutRounded } from "@mui/icons-material";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const { user, setUser, server, setAlert, setLoad } = useContext(ActContext);
  const logout = () => {
    setLoad(true);
    axios({
      url: server + "/logout",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessKey"),
      },
      data: {
        id: user.id,
      },
    })
      .then(() => {
        localStorage.removeItem("accessKey");
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
  return (
    <header className="navbar">
      <img src="/logo.png" id="logo" alt="Logo" />
      <ul>
        <li title="Page d'accueil" onClick={() => navigate("/")}>
          Accueil
        </li>
        <li title="Le programme TERAKA" onClick={() => navigate("/cours")}>
          Cours TERAKA
        </li>
        {user && (
          <li>
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
                <FavoriteBorderRounded />
                Favoris
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
                <LogoutRounded /> Déconnexion
              </MenuItem>
            </Menu>
          </li>
        )}
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0px 20px",
          gap: "20px",
          flexWrap: "nowrap",
          background: "transparent",
          position: "fixed",
          top: "140px",
        }}
      >
        <button
          className="nav-btn"
          style={{ padding: "10px 0", fontSize: "16px", width: "180px" }}
          onClick={() => {
            window.open("https://rejoindre.teraka.org", "_self");
          }}
        >
          Rejoindre TERAKA
        </button>
        <button
          className="nav-btn"
          style={{ padding: "10px 0", fontSize: "16px", width: "180px" }}
          onClick={() => {
            window.open("https://programme.teraka.org", "_self");
          }}
        >
          Programme TERAKA
        </button>
      </div>
    </header>
  );
}
