import React, { useState, useEffect, useContext, useRef } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { theme } from "./theme";
import { SearchRounded, CheckRounded } from "@mui/icons-material";
import { ActContext } from "../App";
import { useNavigate } from "react-router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Asterisk = () => <span style={{ color: "red" }}>*</span>;

export default function CompteLost() {
  const { user, setAlert, server, t } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [quest, setQuest] = useState("email");
  const [userFind, setuFind] = useState();
  const navigate = useNavigate();
  const form = useRef(null);
  const Qsts = [
    t("question.0"),
    t("question.1"),
    t("question.2"),
    t("question.3"),
  ];
  const verify = (value) => {
    if (value) {
      setVerified(true);
      return;
    }
    setVerified(false);
    return;
  };
  const find = () => {
    if (form.current.username.value === "") {
      setAlert({ type: "warning", message: t("alert.3") });
      return;
    }
    setLoading(true);
    axios({
      method: "GET",
      url: server + "/resetpassword/finduser",
      params: {
        username: form.current.username.value,
      },
    })
      .then((res) => {
        setuFind(res.data.user);
      })
      .catch((err) => {
        setAlert({
          type: "error",
          message: err.response.data.error ?? "Erreur de connexion",
        });
      })
      .finally(() => setLoading(false));
  };
  const valider = (e) => {
    e.preventDefault();
    if (!verified) {
      setAlert({
        type: "error",
        message: "Erreur du captcha",
      });
      return;
    }
    setLoading(true);
    if (quest === "qst") {
      axios({
        method: "POST",
        url: server + "/resetpassword/checkqst",
        data: {
          id: userFind.id,
          reponse: form.current.qst.value,
        },
      })
        .then((res) => {
          setAlert({ type: "success", message: res.data.message });
          navigate(res.data.url);
        })
        .catch((err) => {
          setAlert({
            type: "error",
            message: err.response.data.error ?? "Erreur de connexion!",
          });
        })
        .finally(() => setLoading(false));
    } else {
      axios({
        method: "POST",
        url: server + "/resetpassword/sendTokenmail",
        data: {
          email: userFind.email,
        },
      })
        .then((res) => {
          setAlert({ type: "success", message: res.data.message });
        })
        .catch((err) => {
          setAlert({
            type: "error",
            message: err.response.data.error ?? "Erreur de connexion!",
          });
        })
        .finally(() => setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const inputStyle = {
    alignItems: "flex-start",
  };
  return (
    <div id="accueil">
      <form ref={form} onSubmit={valider}>
        <div className="col-div" style={{ gap: "10px" }}>
          <h3>{t("login.titre.2")}:</h3>
          <div className="col-div" style={inputStyle}>
            <label htmlFor="username">
              {t("login.label.2")}: <Asterisk />{" "}
            </label>
            <input type="text" id="username" name="username" />
          </div>
          {userFind && (
            <ThemeProvider theme={theme}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  {t("login.label.15")}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={quest}
                  onChange={(e) => setQuest(e.target.value)}
                >
                  {userFind.email && (
                    <FormControlLabel
                      value="email"
                      defaultChecked
                      control={<Radio />}
                      label={t("login.label.16")}
                    />
                  )}
                  <FormControlLabel
                    value="qst"
                    control={<Radio />}
                    label={t("login.label.17")}
                  />
                </RadioGroup>
              </FormControl>
            </ThemeProvider>
          )}
          {quest === "qst" && userFind?.question && (
            <div className="col-div" style={inputStyle}>
              <label htmlFor="qst">{Qsts[userFind.question]}</label>
              <input type="text" name="qst" id="qst" required />
            </div>
          )}
          {userFind && (
            <div className="col-div">
              <ReCAPTCHA
                sitekey="6LdYHkMlAAAAAEU62b7unG0Pno8wvdorIrgqy_Uz"
                onChange={verify}
              />
            </div>
          )}
          <div className="col-div">
            <ThemeProvider theme={theme}>
              {userFind ? (
                <LoadingButton
                  startIcon={<CheckRounded />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bolder",
                    fontFamily: "Open Sans",
                  }}
                  type="submit"
                  loading={loading}
                >
                  {t("button.10")}
                </LoadingButton>
              ) : (
                <LoadingButton
                  startIcon={<SearchRounded />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bolder",
                    fontFamily: "Open Sans",
                  }}
                  loading={loading}
                  onClick={find}
                >
                  {t("button.9")}
                </LoadingButton>
              )}
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
}