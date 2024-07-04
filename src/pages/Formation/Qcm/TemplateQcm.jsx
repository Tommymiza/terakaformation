import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { ActContext } from "../../../App";

export default function TemplateQcm({ qcm }) {
  const [checked, setChecked] = React.useState([]);
  const { server, setAlert, t } = useContext(ActContext);
  const handleChange = (c, index) => {
    if (c) {
      setChecked([...checked, index]);
    } else {
      setChecked(checked.filter((i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let points = 0;
    checked.forEach((index) => {
      if (qcm.correct.includes(index)) {
        points++;
      } else {
        points--;
      }
    });
    points *= 10;
    if (points < 0) {
      points = 0;
    }
    try {
      await axios({
        method: "POST",
        url: server + "/updatepoints",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          points,
        },
      });
      setAlert({
        type: "success",
        message: t("alert.1"),
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: error.response.data.error || "Erreur de connexion!",
      });
    }
  };
  return (
    <div>
      <h4>{qcm.question}</h4>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {qcm.reponses.map((reponse, index) => (
            <FormControlLabel
              label={reponse}
              control={
                <Checkbox
                  value={index}
                  name="qcm"
                  checked={checked.includes(index)}
                  onChange={(e, c) => handleChange(c, index)}
                />
              }
              key={index}
            />
          ))}
        </FormGroup>
        <button className="nav-btn" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
