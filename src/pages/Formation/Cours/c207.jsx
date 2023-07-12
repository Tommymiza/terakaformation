import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";

export default function C207() {
  const navigate = useNavigate();
  const { user, server, setAlert } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["207"]?.rating || 0);
  const [nb, setNb] = useState(
    user?.formation["207"]?.progress !== 45 &&
      user?.formation["207"]?.progress !== 85
      ? 0
      : user?.formation["207"]?.progress === 45
      ? 1
      : 2 ?? 0
  );
  function updateDatabase() {
    axios({
      method: "POST",
      url: server + "/updateformation",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        id: user.id,
        formation: user.formation,
      },
    }).catch((err) => {
      setAlert({
        type: "error",
        message: err.response.data.error ?? "Erreur de connexion!",
      });
    });
  }
  function valider(n) {
    if (!user.formation["207"] || user.formation["207"].progress < n) {
      var temp = Object.create(user.formation["207"] ?? { progress: 0 });
      temp.progress = n;
      user.formation["207"] = temp;
      updateDatabase();
    }
    if (n === 100) {
      sendFinish();
    }
    setNb(nb + 1);
  }
  function sendFinish() {
    setAlert({
      type: "success",
      message: "Arabaina nahavita ny lesona!",
    });
    navigate("/cours");
  }
  useEffect(() => {
    if (user?.formation["207"]?.progress === 100) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 3) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <p>
              Tongasoa indray! Ity no fiofanana farany momban’ny Fampidirana sy
              Fampahalalana ny mombamomban’ny TERAKA izay manazava ny fomba
              fitomboan'ny TERAKA.
            </p>
            <p>
              TERAKA dia mitombo amin'ny alalan'ny tantsaha izay mizara ny
              traikefany miaraka amin’ny TERAKA. Maro be ny dingana arahina mba
              ho lasa mpikambana ao: manomboka amin’ny fahalalana momban’ny
              TERAKA aloha aveo rehefa tafiditra ao amin’ny VOndrona Madinika ka
              afaka mandray anjara amin’ny vola karbaona. Ity fiofanana ity dia
              mampiofana an’ireo dingana ireo.
            </p>
            <h3>Dingana fanitarana an’I TERAKA</h3>
            <p>
              Ireto ary ireo dingana fototra amin’ny fampiroboroboana an’I
              TERAKA
            </p>
            <h3>
              Fampitomboana ny TERAKA: Ahoana no fomba fihitatry ny TERAKA?
            </h3>
            <div className="content-part">
              <h5>Dingana 1: Fifandraisana voalohany</h5>
              <p>
                Ny tantsaha dia maheno ny fandaharana momba ny TERAKA amin’ny
                alalan’ny Seminera TERAKA, ny fiofanana ao amin’ny TERAKA,
                fitsidihana miaraka amin'ny mpikambana iray ao amin'ny TERAKA,
                fandaharana amin'ny radio, amin’ny alalan’ny gazety na taratasy
                filazam-baovao, na fomba maro hafa.
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 2: Fampahafatarana sy fandraisana</h5>
              <p>
                Raha te hianatra bebe kokoa momba ny TERAKA ny mpamboly iray dia
                tokony hitsidika ny rohy teraka.org izy ireo ary hanontany ny
                manodidina mba hahafantarana raha misy ny fihaonan’ny kilasitera
                an’ny TERAKA ao amin'ny faritra misy azy ireo. Mila miresaka
                amin'ny tantsaha TERAKA ary mila manatrika ny fivorian’ny
                kilasitera ( raha azo atao ).
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 3: Fiofanana sy fampiharana</h5>
              <p>
                Avereno jerena ny fomba fidirana ao amin’ny TERAKA andian’ny
                faha 5 “ Ahoana no fomba hidirana ho Vondorona Madinika TERAKA ”
                mba hahafahana manampy ny tantsaha hanangana Vondrona Madinika
                matanjaka sy mahazo tsara ny fandaharan’asa ny TERAKA.
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 4: Famoronana Kilasitera</h5>
              <p>
                Ny Kilasitera dia fitambaran'ireo Vondrona Madinika 30-50 izay
                mipetraka eny amin’ny manodidina amin’ny halaviran-toerana vita
                dia-tongotra. Raha misy Vondrona Madinika latsaky ny 30 ao
                amin'ny faritra misy anao dia mbola afaka manomboka Kilasitera
                ianao. Tohizo hatrany ny fampidirana Vondrona Madinika
                mandra-pahatratrarana ny isa 30!
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 5: MIETSIKA ary MANANTANTERAKA</h5>
              <p>
                Eto dia efa azo lazaina fa mahafatatra ny tokony ho fantatra ny
                tantsaha ary tokony hamporisihina HIETSIKA sy HANANTANTERAKA!
                Tohizo hatrany ny fampiofanana ireo tantsaha TERAKA amin’ny
                fampiasana ireo fitaovana ao amin'ny Ivon-toeram-pianarana sy
                amin’ny fizarana ny fomba fiasa tsaran’ny Vondrona Madinika sy
                ny Kilasitera Avereno jerena ny fiofanana ao amin'ny
                ivon-toeram-pianarana momba ny fomba fisoratana anarana ho
                Vondrona Madinika vantany vao azony ny fandaharana
              </p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(45)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>
              Fomba fandraisana olona vaovao ho fampiroboroboana an’I TERAKA
            </h3>
            <p>
              Ireto misy hevitra vitsivitsy momba ny fanitarana ny TERAKA any
              amin'ny faritra misy anao:
            </p>
            <p>Ireo fomba handraisana mpikambana ho Fanitarana ny TERAKA</p>
            <div className="content-part">
              <p>
                Fifanentanana amin’ny alalan’ny fivoriana eo anivon’ny
                fiaraha-monina
              </p>
            </div>
            <div className="content-part">
              <p>
                Manangana pepiniera maromaro mba ahazahoana zana-kazo maromaro.
              </p>
            </div>
            <div className="content-part">
              <p>
                Angataho ireo mpikambana ao amin'ny TERAKA hafa manodidina anao
                mba handray ny mpiray vodirindrina aminy ho mpikambana
              </p>
            </div>
            <div className="content-part">
              <p>
                Mifanentana amin'ny alàlan'ny fiaraha-miasa amin'ireo mpitarika
                eo an-toerana
              </p>
            </div>
            <div className="content-part">
              <p>
                Hazavao amin'ny mpikambana ao amin'ny vondrom-piarahamonina ny
                maha-zava-dehibe ny fambolena hazo sy ny tombontsoa azo amin'ny
                fandraisana anjara amin'ny TERAKA
              </p>
            </div>
            <div className="content-part">
              <p>
                Zarao amin'ny olona tsy mpikambana ny taratasy filazam-baovao
                momban’ny TERAKA
              </p>
            </div>
            <div className="content-part">
              <p>
                Asehoy ny olona ny tombontsoa toy ny fatana voatsara, ny
                fandoavam-bola amin’ny hazo, ny hazo fihinam-boa, na ny
                fambolena maharaitra
              </p>
            </div>
            <div className="content-part">
              <p>Mifanentana amin'ny alalan’ny fiangonana</p>
            </div>
            <div className="content-part">
              <p>Fifanentanana amin'ny alalan’ny radio eo an-toerana</p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(85)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>Famintinana</h3>
            <p>
              Arahabaina ianao fa nahavita an’ity fiofanana ity! Raha misy
              fanontaniana manitikitika anai dia manasa anao izahay hiverina
              anao ny fiofananan. Na ihany koa, raha to aka ao anaty Vondrona
              Madinika ianao no manao ity fiofananan ity, dia tadidio hatrany
              ireo fampiharana tsara tokony ataon’ny Vodrona Madinika amin’ny
              fananana Mpitarika, Mpitarika Mpanampy, ary Olona
              tompon’andraikitra. Ary farany fa tsy kely indrindrindra, aza
              adino ny mampihatra ny fifanorenana.
            </p>
            <p>
              Tsy andrinay ny hahafantatra anao sy ny Vondrona Madinika misy
              anao!
            </p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["207"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(100)}>
                Alefa
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
