import {
  Avatar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ActContext } from "../App";
import {
  CloseRounded,
  FavoriteBorderRounded,
  LogoutRounded,
  MenuOpenRounded,
} from "@mui/icons-material";
import axios from "axios";
import "../styles/navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(document.body.offsetWidth);
  const { user, setUser, server, setAlert, setLoad } = useContext(ActContext);
  const logout = () => {
    navigate("/")
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
    function changeWidth() {
      setWidth(document.body.offsetWidth);
      setOpen(false);
    }
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <header id="navbar">
      <img src="/logo.png" id="logo" alt="Logo" onClick={() => navigate("/")} />
      {width > 900 ? (
        <ul>
          <li>
            <Tooltip title="https://teraka.org" arrow>
              <a href="https://teraka.org" target="_blank" rel="noreferrer">
                TERAKA
              </a>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="https://programme.teraka.org" arrow>
              <a
                href="https://programme.teraka.org"
                target="_blank"
                rel="noreferrer"
              >
                Programme TERAKA
              </a>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="https://rejoindre.teraka.org" arrow>
              <a
                href="https://rejoindre.teraka.org"
                target="_blank"
                rel="noreferrer"
              >
                Rejoindre TERAKA
              </a>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Liste des cours TERAKA" arrow>
              <NavLink to={"/cours"}>Cours</NavLink>
            </Tooltip>
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
      ) : (
        <>
          <Tooltip title={"Ouvrir menu"} arrow>
            <IconButton
              sx={{ alignSelf: "center" }}
              onClick={() => setOpen(!open)}
            >
              <MenuOpenRounded />
            </IconButton>
          </Tooltip>
          <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
            <div id="menu-col">
              <Tooltip title={"Fermer menu"} arrow>
                <IconButton
                  sx={{
                    alignSelf: "flex-end",
                    marginBottom: "50px",
                    marginTop: "25px",
                  }}
                  onClick={() => setOpen(false)}
                >
                  <CloseRounded />
                </IconButton>
              </Tooltip>
              <ul onClick={() => setOpen(false)}>
                <li>
                  <Tooltip title="Site de redirection de TERAKA" arrow>
                    <a
                      href="https://teraka.org"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Site web TERAKA
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Page de description du programme" arrow>
                    <a
                      href="https://programme.teraka.org"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Programme TERAKA
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Page de formulaire" arrow>
                    <a
                      href="https://rejoindre.teraka.org"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Rejoindre TERAKA
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Liste des cours TERAKA" arrow>
                    <NavLink to={"/cours"}>Cours</NavLink>
                  </Tooltip>
                </li>
                {user && (
                  <>
                    <li>
                      <Tooltip title={"Vos cours préférés"} arrow>
                        <NavLink to={"/cours/favorite"}>Favoris</NavLink>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip title={"Se déconnecter"} arrow >
                        <NavLink onClick={logout}>Déconnexion</NavLink>
                      </Tooltip>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </Drawer>
        </>
      )}
    </header>
  );
}
