import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { ActContext } from "../App";
import { BookRounded, LogoutRounded } from "@mui/icons-material";
import axios from "axios";

export default function Navbar() {
  const [anchor, setAnchor] = useState(null);
  const { user, setUser, server, setAlert } = useContext(ActContext);
  const logout = () => {
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
        setAlert({type: "error", message: err.response.data.error})
      });
  };
  return (
    <header>
      <div id="logo">
        <img
          src="logo.png"
          alt="Teraka logo"
          style={{ width: 100 }}
          onClick={() => window.open("https://www.teraka.org", "_self")}
        />
      </div>
      <ul>
        <li title="Page d'accueil">
          <a href="https://www.teraka.org">Accueil</a>
        </li>
        <li title="Le programme TERAKA">
          <a href="https://programme.teraka.org">Programme</a>
        </li>
        <li title="Page des formations">
          <a href="https://formation.teraka.org">Formation</a>
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
                <BookRounded /> Formation suivi
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
    </header>
  );
}
