import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../../App";
import { useNavigate } from "react-router";
import { cours } from "./cours1";
import {
  ExpandMore,
  ViewListRounded,
  ViewModuleRounded,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Rating,
  Tooltip,
} from "@mui/material";

export default function Cours() {
  const { user, setAlert } = useContext(ActContext);
  const [grille, setGrille] = useState(eval(localStorage.getItem("grille")) ?? true);
  const navigate = useNavigate();
  const roman = {
    1: "I",
    2: "II",
  };
  useEffect(() => {
    if (!user) {
      setAlert({ type: "warning", message: "Vous devez vous connecter" });
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div id="accueil">
      <div style={{ alignSelf: "flex-end" }}>
        <Tooltip title={"Vue en grille"} arrow>
          <IconButton
            onClick={() => {
              localStorage.setItem("grille", true);
              setGrille(true);
            }}
          >
            <ViewModuleRounded
              htmlColor={!grille ? "rgba(0,0,0,0.54)" : "var(--active)"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Vue en ligne"} arrow>
          <IconButton
            onClick={() => {
              localStorage.setItem("grille", false);
              setGrille(false);
            }}
          >
            <ViewListRounded
              htmlColor={grille ? "rgba(0,0,0,0.54)" : "var(--active)"}
            />
          </IconButton>
        </Tooltip>
      </div>
      {user &&
        (grille ? (
          <div className="grid-container">
            {cours.map((i) =>
              i.liste.map((item) => (
                <div className="cours" key={item.id}>
                  <div className="img-container">
                    <img src={"/images/" + item.id + ".jpg"} alt={item.img} />
                    <div
                      onClick={() =>
                        navigate(
                          `/cours/${item.id.toString().substr(0, 1)}/${item.id
                            .toString()
                            .substr(1, 3)}`
                        )
                      }
                    >
                      <p>
                        <Visibility />
                        <span>VOIR</span>
                      </p>
                    </div>
                  </div>
                  <div className="cours-content">
                    <div>
                      <h5>
                        {roman[item.id.toString().substr(0, 1)]}. {i.titre}
                      </h5>
                      <h4
                        onClick={() =>
                          navigate(
                            `/cours/${item.id.toString().substr(0, 1)}/${item.id
                              .toString()
                              .substr(1, 3)}`
                          )
                        }
                      >
                        {item.id.toString().substr(1, 3)}. {item.titre}
                      </h4>
                      <Rating
                        disabled
                        value={user.formation[item.id.toString()]?.rating || 0}
                      />
                    </div>
                    <div className="progressbar">
                      <span
                        className="progress"
                        style={{
                          width:
                            user.formation[
                              item.id.toString()
                            ]?.progress.toString() + "%" || 0 + "%",
                        }}
                      ></span>
                      <p>
                        {user.formation[item.id.toString()]?.progress.toFixed(
                          1
                        ) || "0.0"}
                        % Terminé(s)
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="list-container">
            {cours.map((i, index) => (
              <Accordion key={i.titre} sx={{ width: "100%" }}>
                <AccordionSummary
                  sx={{ background: "var(--active)" }}
                  expandIcon={<ExpandMore htmlColor="white" />}
                >
                  <h3>
                    {roman[(index + 1).toString()]}. {i.titre}
                  </h3>
                </AccordionSummary>
                <AccordionDetails>
                  {i.liste.map((item) => (
                    <div className="list-item" key={item.titre}>
                      <h4
                        onClick={() =>
                          navigate(
                            `/cours/${item.id.toString().substr(0, 1)}/${item.id
                              .toString()
                              .substr(1, 3)}`
                          )
                        }
                      >
                        {item.id.toString().substr(1, 3)}. {item.titre}
                      </h4>
                      <div className="progressbar">
                        <span
                          className="progress"
                          style={{
                            width:
                              user.formation[
                                item.id.toString()
                              ]?.progress.toString() + "%" || 0 + "%",
                          }}
                        ></span>
                        <p>
                          {user.formation[item.id.toString()]?.progress.toFixed(
                            1
                          ) || "0.0"}
                          % Terminé(s)
                        </p>
                      </div>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ))}
    </div>
  );
}
