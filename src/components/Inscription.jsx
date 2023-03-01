import React, { useState, useEffect, useRef, useContext } from "react";
import Input from "./Input";
import { PersonAddRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import timezones from "./timezone";
import ln from "./languages";
import { TextField } from "@mui/material";
import { lieu } from "./lieu";
import { ActContext } from "../App";

export default function Inscription({ setType }) {
  const { server, setAlert } = useContext(ActContext);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState();
  const [time, setTime] = useState();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState(null);
  const [communes, setCommunes] = useState(null);
  const [reg, setReg] = useState(null);
  const [dis, setDis] = useState(null);
  const [com, setCom] = useState(null);
  useEffect(() => {
    var region = [];
    lieu.forEach((item) => {
      if (!region.includes(item.REGION)) {
        region.push(item.REGION);
      }
    });
    setRegions(region);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = form.current;
    if (f.password.value.length < 8) {
      setAlert({
        type: "error",
        message: "Mot de passe est de 8 caractères minimum!",
      });
      return;
    }
    if (f.password.value !== f.repassword.value) {
      setAlert({
        type: "error",
        message: "Le mot de passe n'est pas identique!",
      });
      return;
    }
    if (!lang || !reg || !dis || !com) {
      setAlert({ type: "error", message: "Les champs (*) sont obligatoires!" });
      return;
    }
    setLoading(true);
    const data = {
      nom: f.nom.value,
      prenom: f.prenom.value,
      pseudo: f.pseudo.value,
      password: f.password.value,
      email: f.email.value,
      ln: lang,
      time: time,
      adresse: {
        region: reg,
        district: dis,
        commune: com,
      },
      role: f.role.value,
      is_pg: f.is_pg.value,
      pg_number: f.pg_number.value,
    };
    axios({
      url: server + "/ajoutmembre",
      method: "POST",
      data,
    })
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          setAlert({ type: "error", message: err.response.data.error });
        } else {
          setAlert({
            type: "error",
            message: "Erreur de connexion au serveur",
          });
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} ref={form}>
      <Input label={"Nom*"} type={"text"} id={"nom"} name={"nom"} />
      <Input label={"Prénoms*"} type={"text"} id={"prenom"} name={"prenom"} />
      <Input label={"Pseudo*"} type={"text"} id={"pseudo"} name={"pseudo"} />
      <Input
        label={"Mot de passe*"}
        type={"password"}
        id={"password"}
        name={"password"}
      />
      <Input
        label={"Réécrire Mot de passe*"}
        type={"password"}
        id={"repassword"}
        name={"repassword"}
      />
      <Input
        label={"adresse email"}
        type={"email"}
        id={"email"}
        name={"email"}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "120px", textAlign: "end", lineHeight: "15px" }}>
          <label htmlFor="langage">Langage*</label>
        </div>
        <Autocomplete
          options={ln.map((item) => item.name)}
          onInputChange={(e) =>
            setLang(
              ln.filter((item) => item.name === e.currentTarget.innerHTML)[0]
                ?.code || null
            )
          }
          sx={{
            width: 180,
            "& input": {
              height: 3,
            },
          }}
          renderInput={(props) => <TextField {...props} name="language" />}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "120px", textAlign: "end", lineHeight: "15px" }}>
          <label htmlFor="langage">Timezone</label>
        </div>
        <Autocomplete
          options={timezones.map((item) => item.text)}
          onInputChange={(e) =>
            setTime(
              timezones.filter(
                (item) => item.text === e.currentTarget.innerHTML
              )[0]?.value || null
            )
          }
          sx={{
            width: 180,
            "& input": {
              height: 3,
            },
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "120px", textAlign: "end", lineHeight: "15px" }}>
          <label htmlFor="langage">Régions*</label>
        </div>
        <Autocomplete
          options={regions}
          value={reg}
          onInputChange={(e) => {
            var district = [];
            setDis(null);
            lieu.forEach((item) => {
              if (
                item.REGION === e.currentTarget.textContent &&
                item.REGION !== "" &&
                !district.includes(item.DISTRICT)
              ) {
                district.push(item.DISTRICT);
              }
            });
            if (district.length !== 0) {
              setDistricts(district);
              setReg(e.currentTarget.textContent);
            } else {
              setReg(null);
            }
          }}
          sx={{
            width: 180,
            "& input": {
              height: 3,
            },
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "120px", textAlign: "end", lineHeight: "15px" }}>
          <label htmlFor="langage">District*</label>
        </div>
        <Autocomplete
          options={districts ? districts : []}
          disabled={!reg}
          value={dis}
          onInputChange={(e) => {
            var commune = [];
            setCom(null);
            if (e !== null) {
              lieu.forEach((item) => {
                if (
                  item.DISTRICT === e.currentTarget?.textContent &&
                  e.currentTarget?.textContent !== "" &&
                  !commune.includes(item.COMMUNE)
                ) {
                  commune.push(item.COMMUNE);
                }
              });
            }
            setCommunes(commune.length !== 0 ? commune : null);
            setDis(commune.length !== 0 ? e.currentTarget.textContent : null);
          }}
          sx={{
            width: 180,
            "& input": {
              height: 3,
            },
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "120px", textAlign: "end", lineHeight: "15px" }}>
          <label htmlFor="langage">Commune*</label>
        </div>
        <Autocomplete
          options={communes ? communes : []}
          disabled={!dis}
          value={com}
          onInputChange={(e) => {
            setCom(e ? e.currentTarget.textContent : null);
          }}
          sx={{
            width: 180,
            "& input": {
              height: 3,
            },
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </div>
      <Input label={"Votre rôle*"} type={"text"} id={"role"} name={"role"} />
      <Input
        label={"Êtes-vous membre d'un petit groupe*"}
        type={"text"}
        id={"is_pg"}
        name={"is_pg"}
      />
      <Input
        label={"Le numéro de votre petit groupe?"}
        type={"text"}
        id={"pg_number"}
        name={"pg_number"}
      />
      <p style={{ color: "#ccc", fontSize: "12px" }}>Champ obligatoire (*)</p>
      <p onClick={() => setType("connexion")} className="p-underline">
        J'ai déjà un compte !
      </p>
      <LoadingButton
        type="submit"
        variant="contained"
        startIcon={<PersonAddRounded />}
        loading={loading}
        sx={{
          textTransform: "none",
          fontFamily: "var(--fontText)",
          fontWeight: "bolder",
          fontSize: "12px",
          width: 100,
        }}
      >
        S'inscrire
      </LoadingButton>
    </form>
  );
}
