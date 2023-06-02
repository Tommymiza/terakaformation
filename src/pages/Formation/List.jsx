import React, { useContext } from "react";
import { ActContext } from "../../App";
import { useNavigate } from "react-router";
import { cours } from "./cours1";
import { Visibility } from "@mui/icons-material";
import { Rating } from "@mui/material";

export default function List() {
  const { user } = useContext(ActContext);
  const navigate = useNavigate();
  return (
    <div className="cours-container">
      {cours.map((i) => {
        return i.liste.map((item) => (
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
                  {item.id.toString().substr(0, 1)}. {i.titre}
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
                <Rating disabled value={user.formation[item.id.toString()]?.rating || 0} />
              </div>
              <div className="progressbar">
                <span
                  className="progress"
                  style={{
                    width:
                      user.formation[item.id.toString()]?.progress.toString() +
                        "%" || 0 + "%",
                  }}
                ></span>
                <p>
                  {user.formation[item.id.toString()]?.progress.toFixed(1) ||
                    "0.0"}
                  % Terminé(s)
                </p>
              </div>
            </div>
          </div>
        ));
      })}
    </div>
  );
}
