import {
  ExpandMore,
  Lock,
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
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../App";

export default function Cours() {
  const { user, setAlert, t } = useContext(ActContext);
  const [ratings, setRatings] = useState([]);
  // eslint-disable-next-line
  const [grille, setGrille] = useState(
    // eslint-disable-next-line
    eval(localStorage.getItem("grille")) ?? true
  );
  const cours = [
    {
      titre: t("cours.0.titre"),
      descri: t("cours.0.descri"),
      liste: [
        {
          id: 101,
          titre: t("cours.0.liste.0.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 102,
          titre: t("cours.0.liste.1.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
      ],
    },
    {
      titre: t("cours.1.titre"),
      descri: t("cours.1.descri"),
      liste: [
        {
          id: 201,
          titre: t("cours.1.liste.0.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 202,
          titre: t("cours.1.liste.1.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 203,
          titre: t("cours.1.liste.2.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 204,
          titre: t("cours.1.liste.3.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 205,
          titre: t("cours.1.liste.4.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 206,
          titre: t("cours.1.liste.5.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
        {
          id: 207,
          titre: t("cours.1.liste.6.titre"),
          img: "Group_of_sakalava_women_001.jpg",
        },
      ],
    },
  ];
  const navigate = useNavigate();
  const roman = {
    1: "I",
    2: "II",
  };
  const server = process.env.REACT_APP_API;
  useEffect(() => {
    if (!user) {
      setAlert({ type: "warning", message: "Vous devez vous connecter" });
      navigate("/");
    }
    axios({
      url: server + "/ratings",
      method: "GET",
    }).then((res) => {
      setRatings(res.data.ratings);
    });
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            {cours.map((i, index) => (
              <div key={index}>
                <h1
                  style={{ cursor: "pointer", color: "var(--active)" }}
                  className="underline"
                  onClick={() => navigate(`/cours/${index + 1}`)}
                >
                  {roman[(index + 1).toString()]}. {i.titre} :
                </h1>
                <div className="grid-container">
                  {i.liste.map((item) => (
                    <div className="cours" key={item.id}>
                      <div className="img-container">
                        <img
                          src={"/images/" + item.id + ".jpg"}
                          alt={item.img}
                        />
                        <div
                          onClick={() => {
                            if (index === 1) {
                              if (
                                user.progressions.find(
                                  (p) => p.chapitre === 101
                                )?.progress !== 100 ||
                                user.progressions.find(
                                  (p) => p.chapitre === 102
                                )?.progress !== 100
                              ) {
                                return;
                              }
                            }
                            navigate(
                              `/cours/${item.id
                                .toString()
                                .substr(0, 1)}/${item.id
                                .toString()
                                .substr(1, 3)}`
                            );
                          }}
                        >
                          <p>
                            {index === 1 ? (
                              user.progressions.find((p) => p.chapitre === 101)
                                ?.progress !== 100 ||
                              user.progressions.find((p) => p.chapitre === 102)
                                ?.progress !== 100 ? (
                                <Lock />
                              ) : (
                                <Visibility />
                              )
                            ) : (
                              <Visibility />
                            )}
                            <span>{t("button.11")}</span>
                          </p>
                        </div>
                      </div>
                      <div className="cours-content">
                        <div>
                          <h5>
                            {roman[item.id.toString().substr(0, 1)]}. {i.titre}
                          </h5>

                          {index === 1 ? (
                            user.progressions.find((p) => p.chapitre === 101)
                              ?.progress !== 100 ||
                            user.progressions.find((p) => p.chapitre === 102)
                              ?.progress !== 100 ? (
                              <Tooltip title={t("tooltip")}>
                                <h4>
                                  {roman[item.id.toString().substr(0, 1)]}-
                                  {item.id.toString().substr(2, 3)}.{" "}
                                  {item.titre}
                                </h4>
                              </Tooltip>
                            ) : (
                              <h4
                                onClick={() =>
                                  navigate(
                                    `/cours/${item.id
                                      .toString()
                                      .substr(0, 1)}/${item.id
                                      .toString()
                                      .substr(1, 3)}`
                                  )
                                }
                              >
                                {roman[item.id.toString().substr(0, 1)]}-
                                {item.id.toString().substr(2, 3)}. {item.titre}
                              </h4>
                            )
                          ) : (
                            <h4
                              onClick={() =>
                                navigate(
                                  `/cours/${item.id
                                    .toString()
                                    .substr(0, 1)}/${item.id
                                    .toString()
                                    .substr(1, 3)}`
                                )
                              }
                            >
                              {roman[item.id.toString().substr(0, 1)]}-
                              {item.id.toString().substr(2, 3)}. {item.titre}
                            </h4>
                          )}

                          {ratings.find((r) => r.chapitre === item.id) ? (
                            <Rating
                              disabled
                              value={parseFloat(
                                ratings.find((r) => r.chapitre === item.id)
                                  .rating
                              )}
                            />
                          ) : (
                            <Rating disabled value={0} />
                          )}
                        </div>
                        <div className="progressbar">
                          <span
                            className="progress"
                            style={{
                              width:
                                user.progressions
                                  .find((p) => p.chapitre === item.id)
                                  ?.progress?.toString() + "%" || 0 + "%",
                            }}
                          ></span>
                          <p>
                            {user.progressions
                              .find((p) => p.chapitre === item.id)
                              ?.progress?.toFixed(1) || "0.0"}
                            % {t("login.label.18")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                      {index === 1 ? (
                        user.progressions.find((p) => p.chapitre === 101)
                          ?.progress !== 100 ||
                        user.progressions.find((p) => p.chapitre === 102)
                          ?.progress !== 100 ? (
                          <Tooltip title={t("tooltip")}>
                            <h4>
                              {item.id.toString().substr(1, 3)}. {item.titre}{" "}
                              <Lock sx={{ height: 17 }} />
                            </h4>
                          </Tooltip>
                        ) : (
                          <h4
                            onClick={() => {
                              navigate(
                                `/cours/${item.id
                                  .toString()
                                  .substr(0, 1)}/${item.id
                                  .toString()
                                  .substr(1, 3)}`
                              );
                            }}
                          >
                            {item.id.toString().substr(1, 3)}. {item.titre}
                          </h4>
                        )
                      ) : (
                        <h4
                          onClick={() => {
                            navigate(
                              `/cours/${item.id
                                .toString()
                                .substr(0, 1)}/${item.id
                                .toString()
                                .substr(1, 3)}`
                            );
                          }}
                        >
                          {item.id.toString().substr(1, 3)}. {item.titre}
                        </h4>
                      )}
                      <div className="progressbar">
                        <span
                          className="progress"
                          style={{
                            width:
                              user.progressions
                                .find((p) => p.chapitre === item.id)
                                ?.progress?.toString() + "%" || 0 + "%",
                          }}
                        ></span>
                        <p>
                          {user.progressions
                            .find((p) => p.chapitre === item.id)
                            ?.progress?.toFixed(1) || "0.0"}
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
