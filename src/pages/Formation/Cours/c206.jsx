import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";

export default function C206() {
  const navigate = useNavigate();
  const { user, server, setAlert, t } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["206"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["206"]?.progress * 10) / 100) &&
      (user?.formation["206"]?.progress * 10) / 100 !== 10
      ? (user?.formation["206"]?.progress * 10) / 100
      : 0
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
        message: err.response.data.error || "Erreur de connexion!",
      });
    });
  }
  function valider(nb) {
    if (
      !user.formation["206"] ||
      user.formation["206"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["206"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["206"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["206"]?.progress * 10) / 100 === 10) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 10) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    user && (
      <>
        {nb === 0 && (
          <div className="content">
            <h3>Ny fahazahoana ny fifanarahana EMH</h3>
            <p>
              Tonga soa eto amin’ity fizarana manaraka ity indray ianao, izay
              hianarana ny momban’ny fandoavam-bola ataon’ny TERAKA.
            </p>
            <p>Ity fiofanana ity dia hamaritra zavatra roa lehibe :</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Inona avy ireo zavatra ifanaiken’ny Vondrona Madinika anatin’ny
                fifanarahana EMH?
              </li>
              <li>
                Inona avy ireo ifanaiken’ny iTERAKA anatin’ny fifanarahana EMH?
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>Ireo andraikitry ny Vondrona Madinika</h3>
            <p>
              Alohan’ny hidirana ao amin’ny TERAKA, dia manaiky ny hanao hetsika
              miavaka ny Vondrona Madinika mba hahafeno ny fepetra hidirana ao
              amin’ny fandaharan’asan’ny TERAKA.
            </p>
            <p>IREO ZAVATRA IFANAIKEN’NY VONDRONA MADINIKA FA HO ATAO</p>
            <p>
              Eo ambanin'ny fifanarahana Entona Mangeja Hafanana ( EMH ),
              manaiky ny hanao izao manaraka izao ny vondrona Madinika misy anao
              ataonao:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Ny Vondrona Madinika dia manaiky ny hamboly hazo 1 000
                farafahakeliny isan-taona mandritra ny 5 taona
              </li>
              <li>
                Ny Vondrona Madinika dia manaiky ny hikolokolo ny hazo ho velona
                soamantsara mandritra ny 60 taona ary hamerina hamboly ireo izay
                maty{" "}
              </li>
              <li>
                Ny Vondrona Madinika dia manaiky handray anjara amin'ny
                fiofanana omen’nyTERAKA ary hanampy amin'ny famolavolana ny
                fampiharana tsara
              </li>
              <li>
                Ny Vondrona Madinika dia manaiky ny hamela ny kilasitera sy
                Mpanamarina an’ny TERAKA ho tonga eo amin'ny tanin-janakazo
                handrefesana ny fitomboan'ny hazo
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>Fahazahoana ny andraikitry ny iTERAKA</h3>
            <p>
              Ny iTERAKA dia manaiky ny hanantanteraka ny asa rehetra araky ny
              voasoratra tao amin’ny fifanarahana EMH.
            </p>
            <p>Ireto avy ary ny andraikitr’izy ireo:</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Manaiky ny iTERAKA hanome vaovao amin'ny fiofanana, ny
                fampitam-baovao ary amin'ny Internet
              </li>
              <li>
                Manaiky ny iTERAKA fa marina sy mangarahara amin’ny fandrefesana
              </li>
              <li>
                Manaiky ny handoa ny 70% an’ny Vondrona Madinika izay tombony
                tamin’ny fivarotana ny karbaona ny iTERAKA ary hanao ny
                fandoavana mialohan’ny hazo velona izay 6 volana farafahakeliny
                isan-taona izay mitentina 0,03 euro ny $ 0.03 ( euro )
              </li>
              <li>
                Manaiky ny iTERAKA hampiasa ezaka tsara indrindra amin’ny
                fivarotana ny kredi karbaona mba ahazahoana tombony hoan'ny
                vondrona madinika
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 3 && (
          <div className="content">
            <h3>Fahazahoana ny fandoavana mialoha</h3>
            <p>
              Eo ambanin’ny fifanarahana EMH, ny iTERAKA dia manaiky ny handoa
              mialoha ny hazo velona voavolin’ny Vondrona Madinika, izay
              mitentina 0.03 euro. Aloha isantaona io, ary hazo efa voarefy tao
              anatin’ny 18 volana no mahazo io fandoavana io
            </p>
            <p>Ity ary ny fanampi-panazavana momban’izany:</p>
            <h4>
              Amin'ny alàlan'ny fanaovan-tsonia ny fifanarahana Entona Mangeka
              Hafanana, ny iTERAKA dia manaiky ny handoa vola mialoha an’ny
              Vondrona Madinika.
            </h4>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>Mba hahafahana mahazo ny fandoavana mialoha</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_1.png"
                  alt="206_1"
                  style={{ width: "100px" }}
                />
                <p>Hazo roa (2) volana</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>Mba hahafahana mahazo ny fandoavana mialoha...</h5>
              <div className="image-center-row">
                <img
                  src="/images/206_2.png"
                  alt="206_2"
                  style={{ width: "150px" }}
                />
                <p>Hazo efatra (4) volana</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>
                Mba hahafahana mahazo ny fandoavam-bola mialoha, dia tsy maintsy
                ho voaisa ho hazo tao anatin'ny 18 volana ireo hazo
              </h5>
              <h5>
                Ny fandoavam-bola mialoha dia 0.03 euro isan-taona ho an'ny hazo
                velona tsirairay
              </h5>
              <div className="image-center-row">
                <img
                  src="/images/206_3.png"
                  alt="206_3"
                  style={{ width: "200px" }}
                />
                <p>Hazo valo ambin’ny folo (18) volana</p>
              </div>
            </div>
            <div className="content-part" style={{ width: "100%" }}>
              <h5>
                Ny fandoavam-bola mialoha ihany koa no ny fandoavam-bola farany
                ambany izay omen'ny iTERAKA isan-taona ho an'ny hazo velona
                tsirairay.
              </h5>
              <div className="image-center-row">
                <img
                  src="/images/206_4.png"
                  alt="206_4"
                  style={{ width: "250px" }}
                />
                <p>Hazo matotra</p>
              </div>
            </div>
            <p>
              Izay no fandoavam-bola mialoha ifaneken'ny iTERAKA haloa eo
              ambanin'ny fifanarahana EMH.
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 4 && (
          <div className="content">
            <h3>Fahazahoana ny Fizarana Tombony</h3>
            <p>
              Eo ambanin’ny fifanarahana EMH, ny iTERAKA dia manaiky ny hizara
              amin’ny Vondroan Madinika ny 70% avy amin’ny vidin’ny kredi
              karbaona.
            </p>
            <p>Fahazahoana ny fizarana tombony 70 isan-jato</p>
            <div className="image-center-column">
              <p>Rehefa mihalehibe ny hazo ao anaty Vondrona Madinika…</p>
              <img
                src="/images/206_5.png"
                alt="206_5"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Ny iTERAKA dia afaka mamorona kredi karbaona amin'ny karbonina
                nogiazin'ireo hazo ireo…
              </p>
              <img
                src="/images/206_6.png"
                alt="206_6"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Ny iTERAKA dia afaka mamorona kredi karbaona avy amin'ny
                karbonina nogiazin'ireo hazo ireo. . . Ary ny iTERAKA dia afaka
                mivarotra ny kredi karbaona amin'ny vola, na ny vola miditra
                amin'ny karbaona
              </p>
              <img
                src="/images/206_7.png"
                alt="206_7"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <p>Ny vola miditra amin'ny karbaona dia misy ampahany roa:</p>
            <div className="image-center-column">
              <p>
                Voalohany dia ny VIDY, izay ahitana ny vidin'ny Program TERAKA
                ho an'ny hetsika toy ny fametahana sy ny fifandraisana amin'ny
                vondrona madinika
              </p>
              <img
                src="/images/206_8.png"
                alt="206_8"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Faharoa dia ny TOMBONY, izay sisa tavela aorian'ny fanesorana ny
                vidiny amin'ny fidiram-bolan'ny karbona
              </p>
              <img
                src="/images/206_9.png"
                alt="206_9"
                style={{ width: "40%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>Eo ambanin'ny fifanarahana Entona Mangeja Hafanana…</p>
              <p>
                Ny iTERAKA dia manaiky hanome ny 70% ny tombony ho an'ny
                vondrona madinika. Toy izao ny fomba fiasan'ny fizarana tombony
                70% ao amin'ny fifanarahana Entona Mangeja Hafanana. Raha manana
                fanontaniana ianao dia mifandraisa amin'ny solontenan'ny TERAKA
                anao.
              </p>
              <p>
                Ary ny 30% sisa dia averina ao amin'ny Programa TERAKA
                hanohanana ny fitomboan'ny TERAKA
              </p>
              <img
                src="/images/206_10.png"
                alt="206_10"
                style={{ width: "300px" }}
              />
            </div>

            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 5 && (
          <div className="content">
            <h3>Ohatra iray mba ahazahoana ny fizarana ny tombony</h3>
            <p>
              Ity misy ohatra ahafahana mahazo bebe kokoa ny fandehan’ny
              fizarana ny tombony. Ireo isa nampiasaina dia noforonina, ny
              mari-bola ihany koa dia toy izay
            </p>
            <div className="image-center-column">
              <p>
                Manasa anao hampiasa ity ohatra ity mba ahazahoana ny fizarana
                tombony ao amin’ny fifanarahana EMH
              </p>
              <img
                src="/images/206_7.png"
                alt="206_7"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Ohatra, raha ahazahoana vola 1 000 unit ( unit ) ny fivarotana
                ny kredi karbaona
              </p>
              <img
                src="/images/206_11.png"
                alt="206_11"
                style={{ width: "60%", minWidth: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>Ary heverinay fa 200 Units ny vidiny,</p>
              <p>Ny tombony tavela izany dia 800 Units</p>
              <img
                src="/images/206_10.png"
                alt="206_10"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Ny iTERAKA dia manaiky ny hizara 70%, na 560 Units, miaraka
                amin'ny vondrona Madinika
              </p>
              <img
                src="/images/206_12.png"
                alt="206_12"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Ary 30%, na 240 Units, dia ampidirina ao amin'ny Program TERAKA
              </p>
              <img
                src="/images/206_13.png"
                alt="206_13"
                style={{ width: "300px" }}
              />
            </div>
            <div className="image-center-column">
              <p>
                Noho izany, amin'ity ohatra ity Ny trosa karbonina amidy amin'ny
                1 000 Units dia ahazahoana 560 Units izay miverina amin'ny
                vondrona madinika
              </p>
              <img
                src="/images/206_14.png"
                alt="206_14"
                style={{ width: "80%", minWidth: "300px" }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 6 && (
          <div className="content">
            <h3>Fepetra takian’ny fizarana tombony</h3>
            <p>
              Mba ahafahan’ny Vondrona Madinika an’ny TERAKA mandray anjara
              amin’ny fizarana ny tombony, mila mahafeno ireto manaraka ireto ny
              Vondrona Madinika:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Fanaovan’ireo mpikambana rehetra ao amin’ny Vondrona Madinika
                sonia ny fifanarahana EMH
              </li>
              <li>
                Efa voangona avokoa ireto angovom-baovao manaraka momban’ny
                tanin-janakazon’ny Vondrona Madinika ireto:
                <ul style={{ marginLeft: "20px" }}>
                  <li>Hazo voarefy tanatin’ny 12 volana</li>
                  <li>Momban’ny Fananan-tany</li>
                  <li>Momban’ny fifindrana</li>
                  <li>Momban’ny fandripahana ny ala</li>
                  <li>Fametrahana tsar any fetran’ny tanin-kazo</li>
                </ul>
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 7 && (
          <div className="content">
            <h3>Fandraisana ny fandoavam-bola</h3>
            <p>
              Mahazo vola karbaona amin’ny alalan’ny fandoavana ny 70% ny
              fizarana tombony ny Vondrona Madinika ùandritra ny fivorin’ny
              kilasitera.
            </p>
            <p>Mba ahazahoana ny vola dia:</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mila solon-tena 2 avy amin’ny vondrona madinika haka ny tapakila
                any amin’ny fivorian’ny kilasitera
              </li>
              <li>
                Amin’ny volana manaraka, dia manao Sonia an’ilay tapakila avokoa
                ireo mpikambana rehetra
              </li>
              <li>
                Amin’ny fivoriana arian’io indray, dia mpikamban 3
                farafahakeliny no tonga amin’ny fivoriana sy mitondra ilay
                tapakia voasonia
              </li>
              <li>
                Amin’izay fotoana izay, dia mahazo vola ilay vondrona madinika
              </li>
            </ul>
            <p>
              Amin’ny alalan’ny Vondrona Madinika no hidiranao ao amin’ny
              TERAKA. Ianao sy ny mpikambana ao dia hamboly hazo. Ary ilay
              Vondrona Madinika no omen’ny TERAKA vola fa tsy ny olon-tsotra
              anaty vondrona.
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 8 && (
          <div className="content">
            <h3>Fehiny: fifanarahana EMH nohavaozina</h3>
            <p>
              Ny programa iraisam-pirenena momba ny fambolena sy ny hazo ( TIST
              ) fifanarahana varotra karbona
            </p>
            <p>
              Ity fifanarahana varotra Carbon ity, mahomby 20, dia eo
              anelanelan'ny vondrona TIST Small voatanisa etsy ambony sy ny
              mpandray anjara tsirairay avy amin'ny vondrona TIST Small izay
              manao sonia ny anarany eto ambany ( miaraka, ny “ Vondrona kely ”
              ) ary ny fanadiovana ny fiaramanidina fiaramanidina, boaty
              paositra 1508 – 10400 Nanyuki, Kenya.
            </p>
            <p>
              TIST dia ny International Small Group and Tree Planting Program
              izay mpikambana ao amin'ny vondrona kely ary iTERAKA no
              mpiara-miasa izay mitantana ny fivarotana Carbon Credits. Ny TIST
              dia tetikasa fampandrosoana maharitra izay miankina amin'ny
              fambolena hazo. TIST Kenya no programa TIST any Kenya.
            </p>
            <p>
              Ny entona maitso, toy ny dioksida karbonika ( CO2 ), dia mila
              esorina amin'ny rivotra mba hiarovana ny toetran'ny Tany. Noho
              izany, ilaina ny mampihena ny famoahana ireo entona maoderina toy
              izany ary ny fanesorana ireo entona maintso toy izany amin'ny
              habakabaka. Ho fanatanterahana izany, amin'izao fotoana izao, misy
              programa isan-karazany sy iraisam-pirenena isan-karazany sy
              an-tsitrapo amin'ny fametrahana ny famoahana entona maoderina. Eo
              ambanin'ireo programa, hetsika na tetikasa toy ny hetsika natao
              teo ambanin'ny programa TIST, ao anatin'izany ny fampiroboroboana
              sy ny fambolena maharitra, mety hiteraka sanda ho an'ireo mpandray
              anjara amin'ny endrika isan-karazany amin'ny fahazoan-dàlana
              famoahana entona maoderina izay mety amidy amin'ny tsenan'ny
              karbonina nasionaly sy iraisam-pirenena. Izay karazana
              fahazoan-dàlana famoahana entona maoderina izay mety hiteraka eo
              ambanin'ny programa rehetra amin'ny fametrahana ny entona maintso
              dia antsoina hoe Carbon Credits.
            </p>
            <p>
              Ny TIST Small Group sy ny TIST Program Staff dia maniry ny hanampy
              amin'ny tanjona nasionaly Kenya ho an'ny tontolo iainana, ala,
              fampiasana tany, fambolena maharitra, fivelomana tsara,
              fampihenana ny aretina ( anisan'izany ny VIH/SIDA ), ary
              fampandrosoana maharitra.
            </p>
            <p>
              Ny vondrona vondrona kely sy ny mpiasan'ny programa momba ny TIST
              dia hanaraka ny lalàna tsirairay sy ny lalàna mifehy ny asany, ary
              hiara-miasa amin'ny eo an-toerana, distrika sy manampahefana
              nasionaly isaky ny mangataka na takiana. Amin'ny fotoana rehetra
              dia haneho ny soatoavin'ny TIST ny hetsika an-tsitrapo, ny
              fahitsiana, ny fahitsiana, ny fandraisana andraikitra, ny
              fanaovana ny asa ary ny fanatanterahana teti-bola ambany.
            </p>
            <p>Ny fepetra voalazan'ity fifanarahana ity dia :</p>
            <ol style={{ marginLeft: "20px" }}>
              <li>
                Term. Ity fifanarahana ity dia haharitra 60 taona manomboka
                amin'ny daty mahomby aseho etsy ambony.
              </li>
              <li>
                Fananan'ny hazo, fatana ary crops. Ny mpikambana ao amin'ny
                vondrona kely dia hanana ny hazo sy ny voankazo, voanjo,
                fanafody ary vokatra hafa rehetra avy amin'ny hazo; ny fatana;
                ary ny voly avy amin'ny fambolena maharitra.
              </li>
              <li>
                Famantarana ny Grove. Ny ala tsirairay na ny toeram-piompiana
                izay nambolen'ny vondrona kely teo ambanin'ity fifanarahana ity
                dia voatanisa ao amin'ny Exhibit A amin'ity fifanarahana ity. Ny
                ala vaovao na ny toeram-pambolena misy hazo nambolena tamin'ity
                fifanarahana ity naorina taorian'ny fanatanterahana ity
                fifanarahana ity dia hampiana ihany koa amin'ny Exhibit A avy
                amin'ny TIST Program Staff sy ny vondrona kely ampidirina ao
                anatin'ity fifanarahana ity.
              </li>
              <li>
                Fananan'ny tany. Ny mpikambana ao amin'ny vondrona kely dia
                manao sonia ity fifanarahana ity izay tompon'andraikitra amin'ny
                velaran-tany na hazo hazo voatanisa ao amin'ny Exhibit A dia
                maneho fa izy/tompony ny tany eo ambanin'ny endrika ekena
                ara-dalàna na manana zo, izay mety ahitana ny zo amin'ny
                toetran'ny fahazoan-dàlana, na ny zon'ny fanao mahazatra, na
                ekena amin'ny lalàna na ekena eo ambanin'ny fomba fanao
                mahazatra na napetraky ny fifanarahana na raha tsy izany, mba
                hametrahana ny tany amin'ireo fampiasana voalaza ao amin'ity
                fifanarahana ity, ao anatin'izany ny fambolena hazo sy ny
                famindrana ny zo amin'ny Carbon Credits izay mety hiteraka
                amin'ny alàlan'ny Program TIST.
              </li>
              <li>
                Manaiky ny mpikambana ao amin'ny vondrona kely fa izy, raha
                angatahan'ny iTERAKA na mpanamarina manao iTERAKA, dia manome
                antontan-taratasy tany am-boalohany, na kopia tena izy,
                manaporofo ny fananan'ny mpikambana kely ao amin'ny vondrona
                kely ao amin'ny tany. Fantatry ny iTERAKA fa ny mpikambana ao
                amin'ny vondrona kely dia mety manana na manana zo tsy voatanisa
                na tsy voamarina ao amin'ilay tany ary manaiky mazava fa misy ny
                ( i ) kopia fanamarinana ny taratasy fanamarinana lohateny, na (
                ii ) kopia voamarina amin'ny antontan-taratasy hafa navoakan'ny
                manam-pahefana azo ampiharina manamafy ny fangatahan'ny
                mpikambana ao amin'ny vondrona kely amin'ny tany, dia raisina ho
                porofon'ny zon'ny mpikambana ao amin'ny vondrona kely ao amin'ny
                tany. Raha misy olona hafa, amin'ny alàlan'ny akanjo na hafa,
                fitakiana ny zon'ny zo amin'ny zo notakin'ny mpikambana ao
                amin'ny vondrona kely dia takiana ny mpikambana ao amin'ny
                vondrona madinika mba hametraka ny anaram-boninahitra na ny zony
                ao amin'ny tany amin'ny fomba voatondro ho an'ny ampiharina
                lalàna.
              </li>
              <li>
                Fananana sy famindrana ny mari-pahaizana karbônina. iTERAKA, ny
                vondrona madinika sy ny mpikambana tsirairay avy amin'ny
                vondrona madinika dia manaiky fa ny zon'ny Carbon Credits dia
                azo omena ny iTERAKA amin'ny alàlan'ny manampahefana nasionaly
                na iraisam-pirenena mifandraika amin'ny fisoratana anarana na
                fankatoavana dingana. Raha ny habetsaky ny Credits Carbon izay
                mety hiteraka vokatry ny hetsika TIST Program an'ny vondrona
                madinika dia raisina ho fananan'ny vondrona madinika na
                mpikambana ao amin'ny vondrona kely, mitovy amin'izany dia
                nafindra tany iTERAKA.
              </li>
              <li>
                Payment. Raha mbola mijanona ho fanarahana ny fepetra
                voalazan'ny fifanarahana ny vondrona kely dia tokony handoa ny
                vondrona kely ny iTERAKA toy izao manaraka izao:
                <ol type="a" style={{ marginLeft: "40px" }}>
                  <li>
                    Ny iTERAKA dia handoa ny vondrona kely farafahakeliny 0.02
                    USD1 / isan-taona ho an'ny hazo velona tsirairay,
                  </li>
                  <li>
                    Ny iTERAKA dia handoa ny vondrona madinika ny fizarana
                    pro-data 70% amin'ny “ Tetikasa Net. ” Ny Project Net
                    Revenue dia voafaritra ho vola mitambatra avy amin'ny
                    fivarotana Carbon Credits avy amin'ny TIST Kenya latsaky ny
                    vidin'ny TIST Kenya, ao anatin'izany ny vidin'ny
                    fampandrosoana iraisam-pirenena sy ny fandoavana ny hazo
                    amin'ny vondrona madinika. Ny fizarana pro-rata an'ny
                    vondrona kely dia hofaritana ho tahiry karbonina mitambatra
                    izay zaraina amin'ny tahiry karbonina voaangona ao amin'ny
                    TIST Kenya. Io dia fandoavam-bola mandritra ny 3 volana
                    aorian'ny fiafaran'ny taom-piandohan'ny taona izay
                    nahavitan'i TIST Kenya voalohany ny fidiram-bolan'ny
                    tetikasa Net.
                  </li>
                  <li>
                    Isan-taona aorian'ny fandoavana ny fidiram-bolan'ny tetikasa
                    Net, ny iTERAKA dia handoa ny vondrona kely ny fizarana
                    pro-data 70% amin'ny “ Net Revenues ” mandritra ny taona toy
                    izany. Ny Net Revenues dia voafaritra ho toy ny vola
                    isan-taona isan-taona amin'ny fivarotana Carbon Credits avy
                    amin'ny TIST Kenya latsaky ny sandan'ny TIST Kenya
                    isan-taona, ao anatin'izany ny vidin'ny fampandrosoana
                    iraisam-pirenena sy ny fandoavana ny hazo amin'ny vondrona
                    madinika. Raha tsy misy na vola ratsy ny fidiram-bolan'ny
                    Net mandritra ny herintaona, tsy misy fandoavam-bola
                    mandritra ny herintaona toy izany, ary tsy misy
                    fandoavam-bola atao amin'ny taona na taona manaraka ny taona
                    toy izany mandra-pahatongan'ny Net Revenues tsara
                    hatramin'ny taona manaraka dia manafoana ny vola ratsy toy
                    izany ary ny Net Revenue dia tsara indray. Ny fizarana
                    pro-rata an'ny vondrona kely dia hofaritana ho tahiry
                    karbonina isan-taona izay zaraina amin'ny tahiry karbonina
                    isan-taona izay voafetra ao amin'ny TIST Kenya.
                  </li>
                  <li>
                    Aloavy ny vondrona kely isaky ny fizarana 6 amin'ity
                    fifanarahana ity.
                  </li>
                  <li>
                    Manamora ny ezaka ataon'ny vondrona madinika amin'ny
                    fametrahana kaonty banky na fomba mety sy azo antoka hafa
                    hahazoana ny fandoavana ny TIST
                  </li>
                  <li>
                    Tazano ny fampahalalana nangonina ho an'ny fametahana ary
                    avelao ho an'ny fisafoana ny vondrona madinika.
                  </li>
                  <li>
                    Omeo ny fampahalalana momba ny habetsahana sy ny
                    fampahalalana mifandraika amin'ny besinimaro eran'izao
                    tontolo izao mba hahafahan'ny mpividy, ny mpanara-maso, na
                    ny antoko liana miditra amin'ny fampahalalana nomena avy
                    amin'ny vondrona madinika sy ny Quantifiers.
                  </li>
                  <li>
                    Manamora ny hetsika fanazaran-tena sy ny fandaminana
                    fanampiny hamolavola fomba fanao tsara indrindra, ary hizara
                    fampahalalana marina eo amin'ireo vondrona madinika momba ny
                    orinasa Carbon, lalàna sy fitsipika azo ampiharina, Politika
                    momba ny governemanta, fotoana fampandrosoana maharitra, sy
                    ny raharaha hafa
                  </li>
                  <li>
                    Manamora ny vaovao sy ny fomba fifandraisana hafa mba
                    hanomezana fampahalalana tsy tapaka amin'ny vondrona ma
                  </li>
                  <li>
                    Manamora ny ezaka fampahalalana ho an'ny daholobe mba
                    hampahafantarana ny besinimaro ny fanamby sy ny
                    zava-bitan'ny vondrona madinika.
                  </li>
                  <li>
                    Mihazona firaketana kaonty marina, ary manome fidirana
                    amin'ny vondrona madinika amin'ny fampahalalana azy ireo
                    amin'ny fotoana mety sy toerana mety.
                  </li>
                  <li>
                    Manisa tsara ny tarika TIST kely mba hahafahana mivarotra ny
                    Carbon Credits.
                  </li>
                  <li>
                    Manavakavaka ny lalàna tsirairay sy ny lalàna rehetra izay
                    mihatra amin'ny asan'ny iTERAKA, ary miara-miasa amin'ny
                    manam-pahefana eo an-toerana, distrika ary nasionaly isaky
                    ny angatahina na takiana.
                  </li>
                  <li>
                    Ampiasao ny ezaka tsara indrindra amidy ny Carbon Credits ho
                    an'ny tombontsoa farany an'ny vondrona madinika mandritra ny
                    vanim-potoana fifanarahana.
                  </li>
                  <li>
                    Mampiasà ezaka tsara indrindra hamolavola tsena fanampiny na
                    fanonerana ho an'ny rafitra eco-dia mahasoa ny ezaka
                    nataon'ny vondrona madinika nomen'ny tontolo eo an-toerana,
                    nasionaly ary manerantany.
                  </li>
                </ol>
              </li>
              <li>
                Tanjona vondrona kely. Manaiky ny vondrona kely fa:
                <ol type="a" style={{ marginLeft: "40px" }}>
                  <li>
                    Mamboly hazo 1 000 farafahakeliny isan-taona, mandritra ny 5
                    taona farafahakeliny; atsangano ny hazo ho amin'ny
                    fahamatorana ary, na eo aza ny paragrafy 8 ( c ) etsy
                    ambany, mitazona ireo hazo mandritra ny 30 taona
                    farafahakeliny
                  </li>
                  <li>
                    Hazo mibebaka izay maty noho ny antony rehetra isan-taona
                    mandritra ny 5 taona ho avy.
                  </li>
                  <li>
                    Tsy manapaka ny hazo, afa-tsy rehefa mampihatra fanao tsara
                    indrindra ho an'ny ala agro novolavolain'i TIST. Amin'izao
                    fotoana izao, TIST Best Practices ( napetraka tao amin'ny
                    antontan-taratasy TIST Best Practices farany indrindra )
                    mamela ny fijinjana hatramin'ny 5% ny hazo nambolena isaky
                    ny ala na ny toeram-pambolena taorian'ny faha-10 taonan'ny
                    fambolena hazo toy izany.
                  </li>
                  <li>
                    Ampiharo ny fambolena maharitra ( araka ny voafaritry ny
                    antontan-taratasy momba ny TIST Best Practices farany
                    indrindra ), isaky ny mpikambana, raha tsy hoe esorina
                    amin'ny fanoratana ny iTERAKA ity fepetra ity.
                  </li>
                  <li>
                    Mandray anjara amin'ny fampiofanana TIST hanampiana amin'ny
                    famolavolana TIST Best Practices, ao anatin'izany ny fomba
                    fanao tsara indrindra amin'ny fametahana; hamolavola ny
                    fepetra takiana amin'ny fijoroana tsara; ary hanampy ny
                    iTERAKA hampianatra fanao tsara indrindra amin'ny vondrona
                    kely hafa.
                  </li>
                  <li>
                    Ampiharo ny fomba fanao tsara indrindra amin'ny TIST, ao
                    anatin'izany ny fanao tsara indrindra amin'ny fametahana, ny
                    fambolena hazo, ny fijinjana ny hazo, ny fahombiazan'ny
                    angovo ary ny fambolena fiar
                  </li>
                  <li>
                    Ampiharo ireo antontan-taratasy fanampiny takian'ny
                    Governemanta Kenya, iTERAKA na ny mpanjifany mba hampihatra
                    ny famindrana ny Carbon Credits.
                  </li>
                  <li>
                    Fanararaotana ny lalàna sy fitsipika rehetra eo an-toerana,
                    Distrika, nasionaly ary iraisam-pirenena izay mihatra
                    amin'ny asany ary manome tatitra toy izany araka ny
                    takian'ny lalàna sy ny lalàna.
                  </li>
                  <li>
                    Avelao ny mpanamarina sy ny quantifiers miditra amin'ny
                    toerana misy ny hetsika vondrona madinika, ao anatin'izany
                    ny toerana nambolena ny hazo TIST ary, rehefa nanontaniana,
                    dia ampio izy ireo amin'ny fitadiavana ireo hazo,
                    toeram-pambolena, na toerana hafa tetik
                  </li>
                  <li>
                    Ampahafantaro ny iTERAKA rehefa mifindra na miala amin'ny
                    tany izay nambolena hazo TIST ny mpikambana ao amin'ny
                    vondrona kely.
                  </li>
                </ol>
              </li>
              <li>
                Famaranana ny fifanarahana tany am-boalohany nataon'ny iTERAKA.
                Ny iTERAKA dia mety hanafoana io fifanarahana io amin'ny fotoana
                rehetra noho ny hetsika majeure na antony hafa ankoatry ny
                fifehezan'ny iTERAKA, ao anatin'izany ny tsy fisian'ny tsenan'ny
                Carbon Credit, ary ajanony ny fandoavam-bola amin'ny vondrona
                kely rehefa misy fanamarihana 90 andro. Amin'izany toe-javatra
                izany, ny zo amin'ny Carbon Credits izay tsy mbola naloan'ny
                iTERAKA dia {t("button.14")} any amin'ny vondrona kely.
              </li>
              <li>
                Famaranana voalohany ny fifanarahana nataon'ny vondrona
                madinika. Ny vondrona kely dia mety hanome fanamarihana
                an-tsoratra ho an'ny iTERAKA, amin'ny adiresy eto, fa ny
                fandoavam-bola avy amin'ny iTERAKA dia mihoatra ny 60 andro lasa
                izay. Raha, ao anatin'ny 60 andro, ny iTERAKA dia tsy mampiseho
                fa ny fandoavam-bola rehetra alohan'ny fifanarahana dia natao,
                ny vondrona madinika dia mety hanafoana ny fifanarahana amin'ny
                alàlan'ny fampandrenesana ny iTERAKA ny fanafoanana an-tsoratra.
              </li>
              <li>
                Fanomezana zo. Ny iTERAKA dia afaka manendry sy mamindra ny
                rehetra na ny ampahany amin'ny zony sy ny adidiny eo ambanin'ity
                fifanarahana ity ary hivarotra na hamindra ny zo amin'ny Carbon
                Credits
              </li>
              <li>
                Fahatokisana. Raha misy ampahany amin'ity fifanarahana ity dia
                tsy azo tanterahina, ny sisa amin'ity fifanarahana ity dia
                hijanona amin'ny hery sy ny vokatr'izany.
              </li>
              <li>
                Fanamarihana. Ny fanamarihana an-tsoratra dia homena amin'ireo
                adiresy nomena an'io fifanarahana io. Ny antoko dia tokony
                hampandre ny antoko hafa momba ny fanovana adiresy ho an'ny
                tanjon'ny fanamarihana an-tsoratra.
              </li>
              <li>
                Hetsika fampiroboroboana. Mba hampidinana ny Carbon Credits ary
                hanitatra ny programa TIST, ny iTERAKA dia mety mampiasa sary sy
                fitaovana fampahalalam-baovao izay mampiseho na mamaritra ny
                programa TIST sy / na ireo mpandray anjara amin'ny vondrona
                kely. Ny iTERAKA dia mety tsy hampiasa sary an-tsary toy izany
                raha tsy efa nahazo fankatoavana mialoha ny mpandray anjara
                amin'ny vondrona madinika.
              </li>
              <li>
                Lalàna mifehy. Ity fifanarahana ity dia ho fehezin'ny, ary
                hatsangana mifanaraka amin'ny lalàn'i Kenya.
              </li>
              <li>
                Manolotra fanomezana. Raha misy ampahany amin'ity fifanarahana
                ity dia tokony hisy antony rehetra ambara na tsy azo ekena, ny
                fepetra sy ny fepetra ao amin'ny fifanarahana dia tokony
                hijanona amin'ny hery feno sy ny fiantraikany toy ny hoe
                novonoina io fifanarahana io raha tsy nisy ny fepetra
                manafintohina niseho tao.
              </li>
              <li>
                Ny Recital dia ampidirina ao anatin'ny fepetra amin'ity
                fifanarahana ity.
              </li>
            </ol>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                {t("button.14")}
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.12")}
              </button>
            </div>
          </div>
        )}
        {nb === 9 && (
          <div className="content">
            <h3>Fanampim-panazavana momban’ny fifanarahana EMH</h3>
            <p>
              Ireto ambany ireto ny fanampim-panazavana momban’ny fifanarahana
              EMH:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Maharitra 60 taona ny fifanarahana manomboka amin’ny datin’ny
                Sonia
              </li>
              <li>
                Misy lisitry ny tanin-janakazo izay ambolena ny hazo io. Ary
                mila havaozina isaky ny misy tany vaovao
              </li>
              <li>Fananan’ny vondrona madinika ny hazo sy izay vokriny</li>
              <li>
                Omen’ny vondrona madinika ny iTERAKA ny zon’ny karbaona amin’ny
                hazon’ny TERAKA
              </li>
              <li>
                Ny solontenan’ny TERAKA eny an-toerana dia afaka manampy ny
                vondrona madinika anokatra kaonty eny amin’ny banky hoan’ny
                fandoavam-bola
              </li>
            </ul>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["206"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                {t("button.13")}
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
