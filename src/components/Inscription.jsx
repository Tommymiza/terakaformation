import React, { useRef, useContext, useState, useEffect } from "react";
import { ActContext } from "../App";
import {
  ThemeProvider,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PersonAdd, PersonAddRounded } from "@mui/icons-material";
import { theme } from "./theme";
import { lieu } from "./lieu";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router";

const Asterisk = () => <span style={{ color: "red" }}>*</span>;

export default function Inscription() {
  const { server, setAlert, setUser } = useContext(ActContext);
  const form = useRef();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("Malgache");
  const [nationalite, setNationalite] = useState("Madagascar");
  const [region, setRegion] = useState("ANALAMANGA");
  const [role, setRole] = useState("Membre potentiel de TERAKA");
  const [is_pg, setIspg] = useState("Oui");
  const [commune, setCommune] = useState("");
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);
  const [com, setCom] = useState([
    "Ambohidratrimo",
    "Ivato",
    "Talatamaty",
    "Ampangabe",
    "Anjanadoria",
    "Antsahafilo",
    "Fiadanana",
    "Iarinarivo",
    "Mahabo",
    "Mahereza",
    "Anosiala",
    "Mahitsy",
    "Antanetibe",
    "Ambato",
    "Manjakavaradrano",
    "Ambohimanjaka",
    "Mananjara",
    "Ampanotokana",
    "Avaratsena",
    "Antehiroka",
    "Ambatolampy Tsimahafotsy",
    "Merimandroso",
    "Ambohimiadana",
    "Andramasina",
    "Alarobia Vatosola",
    "Andohariana",
    "Anjoma Faliarivo",
    "Anosibe Trimoloharano",
    "Fitsinjovana Bakaro",
    "Morarano Soafiraisana",
    "Sabotsy Ambohitromby",
    "Tankafatra",
    "Antotohazo",
    "Alatsinainy Bakaro",
    "Mandrosoa",
    "Sabotsy Manjakavahoaka",
    "Anjozorobe",
    "Alakamisy",
    "Ambatomanoina",
    "Amboasary",
    "Ambohibary Vohilena",
    "Ambohimarina Marovazaha",
    "Ambohimirary",
    "Ambongamarina",
    "Amparatanjona Ambony",
    "Analaroa",
    "Andranomisa",
    "Androvakely",
    "Beronono",
    "Betatao",
    "Mangamila",
    "Marotsipoy",
    "Tsarasaotra",
    "Belanitra",
    "Ambohitromby",
    "Ambolotarakely",
    "Andranomiely",
    "Antakavana",
    "Kiangara",
    "Mahavelona",
    "Mangasoavina",
    "Marondry",
    "Tsaramandroso",
    "Miantso",
    "Fihaonana",
    "Ampitatafika",
    "Andranonahoatra",
    "Bemasoandro",
    "Itaosy",
    "Alatsinainy Ambazaha",
    "Ambohidrapeto",
    "Ampanefy",
    "Androhibe",
    "Ankadimanga",
    "Fiombonana",
    "Soavina",
    "Anosizato Andrefana",
    "Soalandy",
    "Antanetikely",
    "Ambalavao",
    "Ampahitrosy",
    "Bongatsara",
    "Ambohijanaka",
    "Tsiafahy",
    "Ambatofahavalo",
    "Ambohidrabiby",
    "Vilihazo",
    "Anosy Avaratra",
    "Manandriana",
    "Sabotsy Namehana",
    "Ankadikely Ilafy",
    "Fieferana",
    "Ambohimalaza Miray",
    "Ambohimangakely",
    "Ambohimanambola",
    "Alasora",
    "Anjeva Gara",
    "Masindray",
    "Mantasoa",
    "Ambatolaona",
    "Ambatomanga",
    "Ambatomena",
    "Anjepy",
    "Ankazondandy",
    "Merikanjaka",
    "Ranovao",
    "Sadabe",
    "Soavinandriana",
    "Ambohitrandriamanitra",
    "Miadanandriana",
    "Alarobia Ambatomanga",
    "Ambanitsena",
    "Ampaneva",
    "Ambohibary",
    "Manjakandriana",
    "Antsahalalina",
    "Ambohitrony",
    "Ambohitseheno",
    "Ambohitrolomahitsy",
    "Ambohibao Atsimo",
    "Ambohitrimanjaka",
    "Ankazobe",
    "Talatan'Angavo",
    "Alakamisy Fenoarivo",
    "Fenoarivo",
    "Sambaina",
    "Nandihizana Carion",
    "Talata Volonondry",
    "Ambohipihaonana",
    "Ambavahaditokana",
    "Tanjombato",
    "Andoharanofotsy",
    "Antananarivo",
    "Ambohimanga Rova",
    "Anjoma Betoho",
    "Ankaraobato",
    "Ankadinandriana",
  ]);
  const inputStyle = {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    width: "100%",
  };
  const ln = [
    "Malgache",
    "Français",
    "Anglais",
    "Espagnol",
    "Portugais",
    "Néerlandais",
    "Allemand",
    "Autre...",
  ];
  const pays = [
    "Madagascar",
    "Bénin",
    "Burkina Faso",
    "Burundi",
    "Cameroun",
    "République centrafricaine",
    "Comores",
    "Congo (RC)",
    "Congo (RDC)",
    "Côte d'Ivoire",
    "Djibouti",
    "France",
    "Gabon",
    "Guinée",
    "Guinée équatoriale",
    "La Réunion",
    "Mali",
    "Mayotte",
    "Niger",
    "Rwanda",
    "Sénégal",
    "Seychelles",
    "Tchad",
    "Togo",
    "Autre",
  ];
  const regions = [
    "ALAOTRA MANGORO",
    "AMORON'I MANIA",
    "ANALAMANGA",
    "ANALANJIROFO",
    "ANDROY",
    "ANOSY",
    "ATSIMO ANDREFANA",
    "ATSIMO ATSINANANA",
    "ATSINANANA",
    "BETSIBOKA",
    "BOENY",
    "BONGOLAVA",
    "DIANA",
    "IHOROMBE",
    "ITASY",
    "MATSIATRA AMBONY",
    "MELAKY",
    "MENABE",
    "SAVA",
    "SOFIA",
    "VAKINANKARATRA",
    "VATOVAVY FITOVINANY",
  ];
  const roles = [
    "Membre potentiel de TERAKA",
    "Membre actif de TERAKA",
    "Agent de Cluster",
    "Leader",
    "Autre...",
  ];
  const verify = (value) => {
    if (value) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const f = form.current;
    if (
      f.nom.value === "" ||
      f.prenom.value === "" ||
      f.pseudo.value === "" ||
      f.password.value === "" ||
      lang === "" ||
      nationalite === "" ||
      role === "" ||
      is_pg === ""
    ) {
      setAlert({
        type: "warning",
        message: "Les champs avec (*) sont obligatoires",
      });
      return;
    }
    if (nationalite === "Madagascar") {
      if (region === "" || commune === "") {
        setAlert({
          type: "warning",
          message: "Les champs avec (*) sont obligatoires",
        });
        return;
      }
    }
    if (f.password.value.length < 8) {
      setAlert({
        type: "warning",
        message: "Minimum 8 caractères pour le mot de passe",
      });
      return;
    }
    if (f.password.value !== f.repassword.value) {
      setAlert({
        type: "warning",
        message: "Les mots de passe ne sont pas identiques",
      });
      return;
    }
    if (is_pg === "Oui" && f.id_pg.value === "") {
      setAlert({
        type: "warning",
        message: "Les champs avec (*) sont obligatoires",
      });
      return;
    }
    if (!accept) {
      setAlert({
        type: "warning",
        message: "Veuillez accepter les conditions d'utilisation",
      });
      return;
    }
    if (!verified) {
      setAlert({
        type: "error",
        message: "Erreur du captcha",
      });
      return;
    }
    const data = {
      nom: f.nom.value,
      prenom: f.prenom.value,
      pseudo: f.pseudo.value,
      password: f.password.value,
      email: f.email.value !== "" ? f.email.value : null,
      phone: f.phone.value !== "" ? f.phone.value : null,
      ln: lang,
      adresse: {
        pays: nationalite,
        region: nationalite === "Madagascar" ? region : null,
        commune: nationalite === "Madagascar" ? commune : null,
      },
      role,
      is_pg,
      id_pg: is_pg === "Oui" ? f.id_pg.value : null,
    };
    setLoading(true);
    axios({
      url: server + "/ajoutmembre",
      method: "POST",
      data,
    })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          type: "error",
          message: err.response.data.error || "Erreur de connexion!",
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setCommune("");
    if (region !== null) {
      var comtemp = [];
      lieu.forEach((item) => {
        if (item.REGION === region) {
          comtemp.push(item.COMMUNE);
        }
      });
      comtemp = comtemp.filter(
        (item, index) => comtemp.indexOf(item) === index
      );
      setCom(comtemp);
    } else {
      setCom();
    }
  }, [region]);
  return (
    <div id="accueil">
      <form
        onSubmit={submit}
        ref={form}
        style={{ width: "100%" }}
      >
        <div className="col-div" style={{ gap: "10px", width: "100%" }}>
          <h2>Inscription:</h2>
          <div
            className="row-div"
            style={{
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              width: "100%",
              gap: "20px",
            }}
          >
            <div className="col-div" style={{width: "250px"}}>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="nom">
                  Nom: <Asterisk />
                </label>
                <input type="text" name="nom" id="nom" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="prenom">
                  Prénom: <Asterisk />
                </label>
                <input type="text" name="prenom" id="prenom" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="pseudo">
                  Pseudo: <Asterisk />
                </label>
                <input type="text" name="pseudo" id="pseudo" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="password">
                  Mot de passe: <Asterisk />
                </label>
                <input type="password" name="password" id="password" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="repassword">
                  Réecrire mot de passe: <Asterisk />
                </label>
                <input type="password" name="repassword" id="repassword" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="email">Adresse email: </label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="phone">N° téléphone: </label>
                <ThemeProvider theme={theme}>
                  <TextField
                    id="phone"
                    name="phone"
                    type="tel"
                    InputProps={{
                      style: {
                        height: "40px",
                        width: "250px",
                        borderRadius: "7px",
                      },
                    }}
                    placeholder="+261 XX XX XXX XX"
                  />
                </ThemeProvider>
              </div>
            </div>
            <div className="col-div" style={{width: "250px"}}>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="langage">
                  Langage: <Asterisk />
                </label>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    options={ln}
                    defaultValue={"Malgache"}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        InputProps={{
                          ...props.InputProps,
                          style: {
                            padding: "0px 65px 0px 7px",
                            height: "40px",
                            width: "250px",
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                    value={lang}
                    onChange={(e) => {
                      setLang(e.currentTarget?.innerText);
                    }}
                  />
                </ThemeProvider>
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="pays">
                  Pays: <Asterisk />
                </label>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    options={pays}
                    defaultValue={"Madagascar"}
                    name="pays"
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        InputProps={{
                          ...props.InputProps,
                          style: {
                            padding: "0px 65px 0px 7px",
                            height: "40px",
                            width: "250px",
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                    value={nationalite}
                    onChange={(e) => {
                      setNationalite(e.currentTarget?.innerText);
                    }}
                  />
                </ThemeProvider>
              </div>
              {nationalite === "Madagascar" && (
                <>
                  <div className="col-div" style={inputStyle}>
                    <label htmlFor="langage">
                      Région: <Asterisk />
                    </label>
                    <ThemeProvider theme={theme}>
                      <Autocomplete
                        options={regions}
                        defaultValue={"ANALAMANGA"}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            InputProps={{
                              ...props.InputProps,
                              style: {
                                padding: "0px 65px 0px 7px",
                                height: "40px",
                                width: "250px",
                                borderRadius: "7px",
                              },
                            }}
                          />
                        )}
                        value={region}
                        onChange={(e) => {
                          setRegion(e.currentTarget?.innerText);
                        }}
                      />
                    </ThemeProvider>
                  </div>
                  <div className="col-div" style={inputStyle}>
                    <label htmlFor="langage">
                      Commune: <Asterisk />
                    </label>
                    <ThemeProvider theme={theme}>
                      <Autocomplete
                        options={com}
                        disabled={!Boolean(region !== "")}
                        defaultValue={com[0]}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            InputProps={{
                              ...props.InputProps,
                              style: {
                                padding: "0px 65px 0px 7px",
                                height: "40px",
                                width: "250px",
                                borderRadius: "7px",
                              },
                            }}
                          />
                        )}
                        value={commune}
                        onChange={(e) => {
                          setCommune(e.currentTarget?.innerText);
                        }}
                      />
                    </ThemeProvider>
                  </div>
                </>
              )}
              <div
                className="col-div"
                style={{ ...inputStyle, marginTop: "5px" }}
              >
                <label htmlFor="langage">
                  Quel est votre rôle dans TERAKA?: <Asterisk />
                </label>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    options={roles}
                    defaultValue={"Membre potentiel de TERAKA"}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        InputProps={{
                          ...props.InputProps,
                          style: {
                            padding: "0px 65px 0px 7px",
                            height: "40px",
                            width: "250px",
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                    value={role}
                    onChange={(e) => {
                      setRole(e.currentTarget?.innerText);
                    }}
                  />
                </ThemeProvider>
              </div>
              <div className="col-div" style={inputStyle}>
                <label htmlFor="langage">
                  Êtes-vous membre d'un petit groupe: <Asterisk />
                </label>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    options={["Oui", "Non"]}
                    defaultValue={"Oui"}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        InputProps={{
                          ...props.InputProps,
                          style: {
                            padding: "0px 65px 0px 7px",
                            height: "40px",
                            width: "250px",
                            borderRadius: "7px",
                          },
                        }}
                      />
                    )}
                    value={is_pg}
                    onChange={(e) => {
                      setIspg(e.currentTarget?.innerText);
                    }}
                  />
                </ThemeProvider>
              </div>
              {is_pg === "Oui" && (
                <div
                  className="col-div"
                  style={{ ...inputStyle, marginBottom: "15px" }}
                >
                  <label htmlFor="id_pg">
                    Quel est le numéro de votre petit groupe?: <Asterisk />
                  </label>
                  <input type="text" name="id_pg" id="id_pg" />
                </div>
              )}
            </div>
          </div>
          <div className="col-div">
            <ThemeProvider theme={theme}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={accept}
                      onChange={() => setAccept(!accept)}
                    />
                  }
                  label="J'accepte les conditions d'utilisation de ce site"
                />
              </FormGroup>
            </ThemeProvider>
          </div>
          <div className="col-div">
            <ReCAPTCHA
              sitekey="6LdYHkMlAAAAAEU62b7unG0Pno8wvdorIrgqy_Uz"
              onChange={verify}
            />
          </div>
          <div className="col-div">
            <ThemeProvider theme={theme}>
              <LoadingButton
                startIcon={<PersonAdd />}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                type="submit"
                loading={loading}
              >
                Inscription
              </LoadingButton>
            </ThemeProvider>
          </div>
          <div className="col-div">
            <ThemeProvider theme={theme}>
              <Button
                startIcon={<PersonAddRounded />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
                onClick={()=>navigate("/")}
              >
                Se connecter
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
}