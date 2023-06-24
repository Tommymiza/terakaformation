import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import Test205 from "./Test205";

export default function C205() {
  const navigate = useNavigate();
  const { user, server, setAlert } = useContext(ActContext);
  const [rating, setRating] = useState(user?.formation["205"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user?.formation["205"]?.progress * 10) / 100) &&
      (user?.formation["205"]?.progress * 10) / 100 !== 10
      ? (user?.formation["205"]?.progress * 10) / 100
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
      !user.formation["205"] ||
      user.formation["205"].progress < (nb + 1) * 10
    ) {
      var temp = Object.create(user.formation["205"] ?? { progress: 0 });
      temp.progress += 10;
      user.formation["205"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user?.formation["205"]?.progress * 10) / 100 === 10) {
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
            <h3>Fampidirana</h3>
            <p>
              Faly izahay noho ny fahavitrianao hanaraka ny fiofanana! Ity
              takelaka ity dia hanazava anao ny fomba fidiran’ny Vondroa
              Madinika vaovao ho mpikambana ao amin’ny TERAKA. Araho tsara ny
              dingana rehetra mba ahafahanao sy ilay Vondrona misy anao
              mahatratra ny tanjona lehibe kanefa tsy dia mila fandaniana
              betsaka. Tadidio ary fa ny Vondrona Madinika mafy orina dia antoka
              manamafy ny TERAKA ihany koa.
            </p>
            <h4>
              Fomba fidirana sy fomba fisoratana anaran’ny Vondrona Madinika
            </h4>
            <p>
              Ny fomba fidirana ho mpikambana vaovao sy ny fomba fisoratana
              anarana dia manaraka izao dingana manaraka izao :
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>1. Fiofanana</li>
              <li>2. Fidirana ho mpikambana</li>
              <li>3. Fanaovana sonian’ny fifanarahana EMH</li>
              <li>4. Bazelinina</li>
              <li>5. Fisoratana anarana</li>
            </ul>
            <h4>Faharetany</h4>
            <p>
              Maharitra 12 ka hatramin’ny 18 volana eo ny fem-potoana
              ahafahan’ny Vondrona Madinika mameno ireo dingana ireo.
              Mandritr’izay fotoana, misy ny kilasiteran’ny TERAKA, ny mpiahy,
              na mpandraharaha tsotra izay manohana ny Vondrona Madinika, manome
              fiofanana azy ireo ary manao izay fomba ahazahoan’izy ireo ny
              fandaharan’asan’ny TERAKA.
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 1 && (
          <div className="content">
            <h3>Inona no atao hoe Vondrona Madinikan’ny TERAKA?</h3>
            <p>
              Araky ny efa nazavaina hatramin’izay, ny Vondrona Madinikan’ny
              TERAKA dia fikambanan’ny tantsaha miisa 6 ka hatramin’ny 12 izay
              mivondrona an-tsitrapo sy ankahalalahana mba hiara hamboly hazo,
              ho fanatsarana ny tany sy ny vondrom-piarahamonina. Tokony misy
              fianakaviana 3 samihafa ny ao anatn’ny Vondrona Madinika.
            </p>
            <h3>Inona ny atao hoe Kilasitera? </h3>
            <p>
              Araky ny efa nazavaina teo aloha, ny kilasiteran’ny TERAKA dia
              miisa 30 katramin’ny 50 Vondrona Madinika izay tsy dia
              mifanalavitra fonenana, manana tany ahafahana mamboly hazo 200.000
              (manodidina ny 80 hekitara eo) ary manana pepiniera mba ahazahoana
              zanakazo.
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 2 && (
          <div className="content">
            <h3>Fiofananan’ny Vondrona Madinika</h3>
            <p>
              Ny dingana voalohan’ny fidirana ho mpikambana ao amin’ny TERAKA
              dia na amin’ny alalan’ny fanatrehana mivantana ny Fampidirana sy
              ny Fampahafatarana momban’ny fiofanana ataon’ny TERAKA na manao
              izany amin’ny alalan’ny Ivon-toeram-piofanana.
            </p>
            <p>
              Ny Vondrona Madinika misy anao izany dia afaka miditra ho
              mpikambana ao amin’ny TERAKA amin’ny alalan’ny famenoana
              antota-taratasy fidirana na amin’ny alalan’ny fomba fidirana ao
              amin’ilay fomba fidirana ao anatin’ny ivon-toeram-piofanana. Ireo
              dingana rehetra ireo dia hazavaina ato amin’ity document manaraka
              ity:
            </p>
            <h3>Dingan’ny fiofanana sy fangatahana ho mpikambana</h3>
            <div className="content-part">
              <h5>
                Dingana 1: Tsidiho ny{" "}
                <a href="https://rejoindre.teraka.org">rejoindre.teraka.org</a>
              </h5>
              <p>
                Ireo tantsaha izay liana amin'ny fidirana ho mpikambana ao
                amin’ny TERAKA dia tokony hitsidika ny tranonkalan’izy ireo:{" "}
                <a href="https://rejoindre.teraka.org">rejoindre.teraka.org</a>{" "}
                ary hampiasa ny ivon-toeram-mpianaran’ny TERAKA. Ity farany dia
                hanazava ny programa TERAKA sy ireo fepetra takiana.
              </p>
            </div>
            <div className="content-part">
              <h5>
                Dingana 2: Raha azo atao dia manatreha ny fivorian’ny Kilasitera
              </h5>
              <p>
                Tokony hanontany ny manodidina ny tantsaha mba hahafantarana fa
                misy ny fihaonana amin'ny Kilasiteran’ny TERAKA. Raha tsy izany,
                dia tokony hifandray amin'ny TERAKA amin'ny alalan’ny WhatsApp
                ny tantsaha ary hijery ny Ivon-toeram-pianarana, ao amin’ny
                takelaka: Fampidirana sy fampahafantarana momban’ny fiofanana
                ataon’ny TERAKA hoan’ireo tantsaha liana amin’izany.
              </p>
            </div>
            <div className="content-part">
              <h5>
                Dingana 3: Mamorona Vondrona Madinika matanjaka ao amin’ny
                TERAKA
              </h5>
              <p>
                Avereno jerena tsara ny fampiofanana momba ny rafitry ny
                Vondrona Madinika ao anatin’ny Fampidirana amin’ny andian’ny
                faha4 amin’ny TERAKA 4 ao amin'ny ivon-toeram-pianarana. Ireo
                tantsaha, noho izany, dia tokony hamorona Vondrona Madinika misy
                olona 6 katramin’ny 12 avy amin'ny fianakaviana 3 samihafa
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 4: Fidirana ho mpikambana ao amin’ny TERA</h5>
              <p>
                Vantany vao nahavita ny fiofanana ny Vondrona Madinika dia hisy
                ny Kilasitera mpanampy na Mpiahin’ny TERAKA hamita ihany koa:{" "}
                <br />
                1) Ny fangatahana alalana hampiasa ny Ivotoeram-pianarana <br />
                NA
                <br />
                2) Antota-taratasy fidirana ho mpikambana ao amin’ny TERAKA
              </p>
            </div>
            <div className="content-part">
              <h5>
                Dingana 5: Manokana fotoana hihaonana eo anivon’ny Vondrona
                Madinika
              </h5>
              <p>
                Ny Vondrona Madinika dia tokony hihaona isan-kerinandro ary
                handrakitra an-tsoratra ny antsipirian'ny fivoriana, ary, raha
                azo atao dia manatrika ny fivorian’ny Kilasitera isam-bolana.
                FANAMARIHANA: Raha misy mpikambana tsy manatrika ny fivoriana
                isan-kerinandro na ny fivorian’ny Kilasitera, dia tokony hijery
                olona hafa mavitrika ny Vondrona Madinika.
              </p>
            </div>
            <div className="content-part">
              <h5>Dingana 6: Manapa-kevitra hoe aiza ny hambolena ny hazo</h5>
              <p>
                Ny Vondrona Madinika dia tokony hanapa-kevitra hoe aiza no
                hambolena ny hazon’ny TERAKA. Izany fanapaha-kevitra izany dia
                tokony hovoarakitra ao anatin’ny fangatahana fahazahoan-dalana
                hampiasa ny ivon-toeram-piofanana na voarakitra ao amin'ny pejy
                4 amin'ny fangatahana hiditra ho mpikambana ao amin’ny TERAKA
              </p>
              <p>
                Ho an'ny tannin-kazo tsirairay dia mila an’ireto manaraka ireto
                ny Vondrona Madinika <br />
                a) Anaran'ny mpikambana tompon'andraikitra amin'ny tanin-kazo{" "}
                <br />
                b) Anaran'ny mpikambana ao amin'ny Vondrona Madinika izay manana
                tany. Raha tsy manana tany ny mpikambana ao amin'ny Vondrona
                Madinika, dia iza no nanome alalana hampiasa ny tany? <br />
                c) Anaran’ny tannin-kazo – safidian’ny mpikambana ao amin'ny
                Vondrona Madinika <br />
                d) haben'ny tannin-kazo- Ny mpikambana ao amin'ny Vondrona
                Madinika dia tokony hanombana ny haben'ny tannin-kazo <br />
                e) Ny fampiasana ny tany ankehitriny ( ohatra, fambolena, ala,
                fiandrasana omby sns. ) <br />
                f) Efa Ala ve io? Raha eny, oviana ny hazo no voatapaka? Raha
                hazo voatapaka latsaky ny 10 taona, dia tsy tafiditra anaty
                fepetra takian’ny TERAKA ilay tannin-kazo.
              </p>
            </div>
            <div className="content-part">
              <h5>
                Dingana 7: Raha voafenonao ny atonta-taratasy rehetra amin’ny
                fidirana ho mpikambana, dia atero any amin’ny Kilasitera
                Mpanampy izany.
              </h5>
              <p>
                Raha misy Vondrona Mandinika resy lahatra fa nahafeno
                soamantsara ny fangatahana hihiditra ho mpikambana ao amin’ny
                TERAKA dia , afaka mangataka kilasitera mpanampy iray izy ireo
                mba ho hampiditra azy ho mpikambana anaty Vondrona Madinika
                an’ny TERAKA.
              </p>
              <p>
                Ny Kilasitera mpanampy dia hamerina hijery ny fangatahana
                amin’ny atsakany sy andavany, hamita ny bazelininan’ny
                tannin-kazon’ny isam-bondrona Madinika, hangataka ny Vondrona
                Madinika hanao Sonia ny fifanarahana EMH, ary hisoratra anarana
                ny Vondrona Madinika
              </p>
            </div>
            <div className="content-part">
              <h5>
                Dingana 8: Raha voafenonao ny fangatahana ao amin’ny
                ivon-toeram-pianarana
              </h5>
              <p>
                Ny Mpiahin’ny TERAKA dia hamerina hijery ny antsipirian’ny
                fangatahana rehetra mba hamaranana ny fangatahana ataon’ny
                Vondrona Madinika tao amin’ny ivon-toeram-pianarana
              </p>
              <p>
                Ny Mpiahin’ny TERAKA dia hanohy ny fampiofanana ny Vondrona
                Madinika amin’ny fampiasana ny ivon-toeram-pianarana ary hanavao
                ny mombamomban’ireo Vondrona Madinika amin'ny alàlan'ny
                fampiasana ny Fanavaozana ao amin'ny ivon-toeram-pianarana
              </p>
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 3 && (
          <div className="content">
            <p>
              Misaotra anao liana amin’ny fidirana ho mpikambana ato am
              fandaharan’asan’n TERAKA. Nanomana dingana maromaro izahay amin'ny
              fandraisana mpikambana vaovao mba hahazoana antoka fa mahazo tsara
              ny tokony atao ianao raha to aka tapakevitra ny hiditra antsitrapo
              ato amin’ny TERAKA, ary vonona hanangana vondrona matanjaka izay
              afaka miara-misehatra tsara amin'ny fambolena hazo hiadiana
              amin'ny fiovan'ny toetr'andro ary hanatsarana ny
              fiarahamonintsika. Ny dingana arahina moa dia miantomboka amin’ny
              fitsidihana ny tranonkalan’ny teraka.org, avy eo ny famolavolana
              ny Vondrona Madinika sy ny fivorian’ny Kilasitera, ary ny miresaka
              amin'ny mpikambana iray ao amin'ny TERAKA. Rehefa avy nanao ireo
              hetsika mba hamolavolana ireo faritra izay kasainao hambolena hazo
              ianao, dia hitsidika ny toeram-pambolenao ny Mpandrefy mba
              hahitany ny zava-bitanao. Ao anatin’izay, dia hihaona
              isan-kerinandro miaraka amin'ireo mpifanila trano aminao ianao,
              izay tianao hamoronana Vondrona Madinika TERAKA ary handraikitra
              hatrany an'ireo fivoriana ireo.
            </p>
            <p>
              Ny tranokala sy ny mpikambana ao amin'ny TERAKA hafa dia hanome
              torolalana anao amin'ny alàlan'ny fizotrany ary hamantatra raha
              mendrika sy vonona ny hiditra ao amin'ny TERAKA ny vondrona misy
              anao. Ny fivorian’ny Vondrona Madinika isan-kerinandro sy ny
              fivorian’ny kilasitera isam-bolana dia zava-dehibe: mampivelatra
              anao ireo satria manainga anao hizara ny traikefanao sy
              hampivelatra ny fampiharana tsara indridnra, ary ihany koa
              mampiroborobo ny vondrona misy anao sy ilay fandaharan’asa.
              Mandray anao ampifaliana izahay ary manantena fa hiaraka hivelatra
              aminay ihany koa ianao ao anatin’izany.
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_1.png"
                alt="205_1"
                style={{ width: "100%" }}
              />
            </div>
            <p>
              Ireo fiofanana takiana amin'ny fisoratana anarana: Ny fanatrehana
              ny fiofanana sy ny fivorian’ny Kilasitera dia anisan’ny
              zava-dehibe amin'ny fandaharan’asan’ny TERAKA. Ny kandidà rehetra
              dia tokony hanatrika ny fivorian’ny Kilasitera ho fanofanana momba
              ireo lohahevi-dehibe valo voatanisa etsy ambany. Ny fanohizana ny
              fanatrehana ny fivoriana dia tena ilaina ihany koa satria ao no
              ahafahana mahafantatra ny fanambarana momba ny fandaharana, ireo
              lohahevitra vaovao ary ahafahan’ny tsirairay mifanampy amin'ny
              fampandrosoana ny tetikasa ho mafy orina. Ny firaketana ny
              fanatrehan’ny olona hiditra ho mpikambana ny fivorianan’ny
              Kilasitera mahakasika an’ireo lohahevitra ireo dia hotazonina
              hatrany.
            </p>
            <p>
              1) Inona tsara ilay TERAKA? Ahoana no fomba fiasa?
              <br />
              2) Ireo fepetra takiana
              <br />
              3) Ireo soatoavin’ny TERAKA ary ny mahazava-dehibe azy
              <br />
              4) Fampiahana tsara indrindra an’ny Vondrona Madinika
              <br />
              5) Karazan-kazo sy ireo tombontsoa azo avy aminy
              <br />
              6) Fananganana sy fikojana pepiniera
              <br />
              7) Teknikan’ny fambolena maharitra
              <br />
              8) Fifanaraha EMH
            </p>
            <p>
              <u>Fandaharam-piofanan’ny TERAKA:</u> ny fiofanana dia miompana
              ihany koa amin’ny karazana lohahevitra maro. Ny vondrona misy anao
              izany dia afaka mamelabelatra momban’ny fahasalamana ihany koa, na
              afaka miresaka momban’ny asa-tanana na lohahevitra mahaliana hafa.{" "}
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_2.png"
                alt="205_2"
                style={{ width: "100%" }}
              />
            </div>
            <h5>*FM : Fambolena Maharitra</h5>
            <p>
              Fivoriana isan-kerinandro ataon’ireo Vondrona Madinika: Ny
              fivoriana ataon’ireo Vondrona Madinika dia tena zava-dehibe
              amin'ny programa TERAKA. Manasa anao hampiasa ny espace eto ambany
              na ny tranokalan'ny TERAKA amin’ny Mobile mba handraiketana ny
              fivoriana isan-kerinandro. Rehefa feno ny tabilao etsy ambany dia
              ahazo pejy fanampiny ianao.
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_3.png"
                alt="205_3"
                style={{ width: "100%" }}
              />
            </div>
            <p>
              <u>Ampahan-kazon’ireo Vondrona Madinika:</u> Ny Vondrona Madinika
              tsirairay izay mikasa ny hamboly hazo dia tokony hanana tany 2
              hekitara farafahakeliny. Ireo mpikambana eto ambany dia milaza fa
              manana sy mikasa ny hamboly hazo eo amin'ny tany voalaza etsy
              ambany. Manaiky izy ireo fa afaka maneho porofo momba ny fananana
              tany, fanaraha-maso, na zo hamboly ireo hazo araka ny takian'ny
              Metodolojia mifandraika amin'ny fanatanterahana ny "PES".
            </p>
            <div className="image-center-column">
              <img
                src="/images/205_4.png"
                alt="205_4"
                style={{ width: "100%" }}
              />
            </div>
            <p>
              <u>Resadresaka sy fitsidihana ny toerana:</u> Ny dinidinika sy
              fitsidihan'ny mpikamban’ny TERAKA voatondro dia anisan’ny zavatra
              takiana amin’ny fidirana ho mpikambana. Rehefa avy nanatrika
              an’ireo fivoriana tsy maintsy atrehana ianareo mpikambana ao
              anatin’ny Vondrona Madinika, sy naheno ireo zavatra tokony ho
              fantarina amin’ny tanin-kazo voatsonganareo, dia hanao toy izao
              manaraka izao ny mpikambana voafantina:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                hametraka fanontaniana mba hianarana bebe kokoa momba anao sy ny
                fomba nifankahalalan’ireo mpikambana ao anatin’ny vondrona
              </li>
              <li>
                hanontany ny antony manosika anao hanatevin-daharana ao amin’ny
                TERAKA
              </li>
              <li>
                hanamarina fa azonao tsara ny fepetra momba ny fifanarahana EMH
                izay antota-taratasy nomena anao nandritran’ny fidirana ho
                mpikambana
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 4 && (
          <div className="content">
            <h3>DINIDINIKA ATAO AMIN’NY VONDRONA MADINIKA</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Manana olona miisa 6 katramin’ny 12 ve ny mpikambana ao amin’ny
                Vondrona Madinika?
              </li>
              <li>
                Moa ve ny mpikambana ao amin'ny Vondrona Madinika dia avy
                amin'ny tokantrano 3 farafahakeliny?
              </li>
              <li>
                Nisy mpikambana (2 farafahakeliny) tao amin’ilay Vondrona
                Madinika ve nahazo fiofanana momban’ireo lohahevitra 8 tsy
                maintsy atao?
              </li>
              <li>
                Moa ve ny mpikambana rehetra ao amin'ny Vondrona Madinika dia
                nanatrika ny antsasaky ny fivorian’ny Vondrona Madinika natao
                tao anatin'ny 12 herinandro lasa farafahakeliny?
              </li>
              <li>
                Nampihatra an’ilay fifandimbiasan’ny fitarihina isaky ny
                fivoriana isan-kerinandro ve ny Vondrona Madinika?
              </li>
              <li>
                Manana velaran-tany farafahakeliny 2 hektara ve ny Vondrona
                Madinika hambolena hazo?
              </li>
              <li>
                Efa nitsidika ireo tannin-kazo natolotra ve ny mpikambana
                tsirairay ao amin’ny Vondrona Madinika?
              </li>
              <li>
                Manana porofo momba ny zon'ny tany isaky ny aloka tiany
                hosoratana ve ny SG?
              </li>
              <li>
                Ireo tanin-kazo natolotra ve tsy misy ala latsaky ny 10 taona?
              </li>
              <li>
                Fantatry ny mpikambana rehetra ao amin'ny Vondrona Madinika ve
                ny soatoavin'ny TERAKA ary manaiky ny hanaraka izany ve izy
                ireo?
              </li>
              <li>
                Fantatry ny mpikambana rehetra ao amin'ny Vondrona Madinika ve
                ny fepetra takian'ny TERAKA?
              </li>
              <li>
                Fantatry ny mpikambana rehetra ve ny fepetra takian'ny TERAKA
                amin'ny elanelan'ny hazo, ny fisafidianana karazan-kazo ary ny
                fiotazana?
              </li>
              <li>
                Manana drafitra hamboly hazo 5000 ao anatin'ny 5 taona ve ny
                mpikambana ao amin’ny Vondrona Madinika rehetra?
              </li>
              <li>
                Manana pepiniera na dia iray farafahakeliny aza ve ny Vondrona
                Madinika?
              </li>
            </ul>
            <h3>Inona no mitranga aorian'ny dinidinika?</h3>
            <p>Raha miditra ho mpikambana ao amin’ny TERAKA manokana:</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Haka ny bazelinina amin'ny tannin-kazo ny Kilasitera Mpanampy
              </li>
              <li>
                Hanome fiofanana an’ireo Vondrona Madinika momban’ny
                fifanarahana EMH ny Kilasitera Mpanampy
                <ul style={{ marginLeft: "20px" }}>
                  <li>
                    Hanisy Sonia ny fifanarahana EMH ny mpikambana ao amin’ny
                    Vondrona Madinika
                  </li>
                  <li>
                    Omena laharana avokoa ireo Vondrona Madinika ao amin’ny
                    TERAKA
                  </li>
                </ul>
              </li>
              <li>
                Hanomboka handray fandoavam-bola mialaoha ny Vondrona Madinika
              </li>
              <li>
                Miseo ao anaty tahirin-kevitry ny mpangataka hiditra ho
                mpikambana ny Vondrona Madinika
              </li>
            </ul>
            <p>Raha miditra amin'ny TERAKA ao amin'ny Ivon-toeram-pianarana:</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Ny Mpiahin’ny TERAKA dia hanohy ny fampiofanana ny Vondrona
                Madinika amin’ny fampiasana ny ivon-toeram-pianarana
              </li>
              <li>
                Ny Mpiahin’ny TERAKA dia hamita ireo endrika fanavaozana ao
                amin'ny Ivotoerana fianarana hoan’ny Vondrona Madinika
              </li>
              <li>
                Rehefa 12 volana ny hazo dia hampiofana ny Vondrona Madinika
                amin'ny fifanarahana EMH ny Mpiahin’ny TERAKA
                <ul style={{ marginLeft: "20px" }}>
                  <li>
                    Noho izany dia hanao Sonia ny fifanarahana EMH ny Vondrona
                    Madinika
                  </li>
                  <li>Hahazo ny laharany ilay Vondrona Madinika</li>
                  <li>
                    Ary hanomboka handray ny fandoavana vola mialoha ny Vondrona
                    Madinika
                  </li>
                </ul>
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 5 && (
          <div className="content">
            <h3>
              Ireo fahafahan’ny Vondrona Madinika ho voasokajy anaty
              masontsivan’ny TERAKA
            </h3>
            <p>
              Jereo ary raha toa ka mahafeno ny mason-tsivana ahafahana miditra
              ho mpikambana ao amin’ny TERAKA ny Vondrona Madinika misy anao.
            </p>
            <p>
              Fanampiana anao ahazo ireo zavatra rehetra takiana mba ahafahana
              miditra ho Vondrona Madinika ao amin’ny TERAKA ity fanontaniana
              ity. Ny agent kilasitera, ny Mpiahy, na ny mpandraharaha tsotra
              dia milaza aminao raha toa ka mahafeno ny fepetra rehetra takiana
              ny VOndorna Madinikao na tsia.
            </p>
            <h3>Fanadinana:</h3>
            <Test205 />
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 6 && (
          <div className="content">
            <h3>Inona ny karazana information ilaina amin’ny bazelinina ?</h3>
            <p>
              Ny kilasiteran’ny TERAKA, ny mpiahy, na ny mpandraharaha tsotra
              dia mifandray amin’ny Vondrona Madinika misy anao mba hanangonana
              angovom-baovao mmban’ny vondrona misy anao sy ny
              tannin-janakazon’ilay vondrona, izay no antsoina hoe bazelinina.
            </p>
            <h3>Inona ny atao hoe bazelinina? </h3>
            <p>
              Ny bazelinina dia ny toetran’ny taninjanakazon’ny Vondrona
              Madinika tamin’ny fahatongavan’ny Vondrona Madinika voaloha tao
              amin’ny TERAKA.
            </p>
            <p>
              Mandritra ny fitsidihin’ny solon-tenan’ny TERAKA dia tsy maintsy
              tong eo avokoa ny Vondrona Madinika rehetra, ary mitondra ilay
              porofo fananan-tany na fahazahoan-dalana hamboly eo amin’ilay
              tany.
            </p>
            <h3>Inona ny karazana information ilaina amin’ny bazelinina?</h3>
            <p>
              Ny solontenan’ny TERAKA dia tena hanaramao sy ijery ifotony ny
              tannin-kazo mihitsy mba hanamarinana fa voahaja tokoa ireo fepetra
              rehetra tanatin’ilay application, eny fa na dia ny hangezan’ny
              tanin-kazo aza dia hoamarinina avokoa.
            </p>
            <p>
              Ireto avy ny angovom-baovao hangonin’ny solon-tenan’ny TERAKA izay
              anatin’ny dingan’ny bazelinina:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Hazo bazelinina: ireo hazo efa teo mialohan’ny nidirana ho
                mpikambana ao amin’ny TERAKA (Tsy tafiditra anatin’ny hazon’ny
                TERAKA ireo)
              </li>
              <li>
                Tanin-kazo bazelinina: ny foto-kazo rehetra ao anaty ala, ny
                fomba nampiasana ny tannin-kazo alohan'ny fambolena hazon’ny
                TERAKA, ary ny zava-misy hafa momba ny tannin-kazo
              </li>
              <li>
                Sarin’ny: a) Vondrona Madinika, b) ny tanin-kazo tsirairay, d)
                Ny tany nampiharana ny fambolena maharitra; e) ny fatana
                voatsara ary f) ny pepiniera
              </li>
            </ul>
            <h4>Fivorian’ny Kilasitera</h4>
            <p>
              Mandefa solon-tena 2 (lahy iray sy vavy iray) any amin’ny
              fivorian’ny kilasitera isam-bolana ny Vondrona Madinikan’ny
              TERAKA. Misy agent kilasitera mandrindra an’ireo fivoriana ireo
              ary kendrena mba atao any amin’ny toerana mora hit any fihaonana.
              Mandritran’ny fivoriana, ny Tantsahan’ny TERAKA dia:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Mahazo taratasim-pilazam-baobao isam-bolana, ary ataony tonga
                any amin’ny Vondrona Madinika misy azy io
              </li>
              <li>Mahazo tapakila fandoavana ny fambolena nokolokoloiny</li>
              <li>
                Mizara fampiharana tsara sy vaovao amin’ny mpikambana ao amin’ny
                Vondrona Madinika misy azy
              </li>
              <li>Mahazo fanampim-piofanana</li>
            </ul>
            <p>
              Mety haka angovom-baovao hafa ihany koa ireo solon-tena toy ny:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Fanamarinana ny hazo mihoatra ny 6 volana</li>
              <li>Fanamarinana ny fambolena maharitra</li>
              <li>Ny momban’ny pepiniera</li>
              <li>
                Faritra amoron-drano (raha to aka manamorina ny loharano na
                farihy ny tanin-kazo)
              </li>
            </ul>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 7 && (
          <div className="content">
            <h3>Fisoratana anarana</h3>
            <p>
              Raha mampiseo ny fananan’ny vondrona misy anao an’ireto ny
              bselinina ny tanin-kazo:
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Farafahakeliny tany 2 hektara hambolena ny hazon’ny TERAKA
              </li>
              <li>Latsaky ny 30% ny ala eo amin’ilay tany</li>
              <li>Tsy ala intsony ilay tannin-kazo nandritra ny 10 taona</li>
              <li>Manana pepiniera iray farafahakeliny ilay vondrona,</li>
            </ul>
            <p>
              Dia afaka manao Sonia ny fifanarahana EMH ny Vondrona ary afaka
              mahazo laharana avy amin’ny TERAKA.
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 8 && (
          <div className="content">
            <h3>Ny fifanarahana amin’ny Entona Mangeja Hafanana</h3>
            <p>
              Raha mahafeno ireo fepetra rehetra takiana ny Vondrona Madinika,
              dia iaraka hijery ny Fifanarahana amin’ny EMH ny Vondrona Madinika
              sy ny kilasitera, ny mpiahy na ny mpandraharaha tsotran’ny TERAKA.
            </p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Tokony miseho ao anatin’ny Fifanarahana EMH ny tannin-kazo
                ra-dalàna
              </li>
              <li>
                Tsy maintsy manao Sonia ny fifanarahana EMH avokoa ny mpikambana
                rehetra ao amin’ny Vondrona Madinika. Noho izany, tsy maintsy
                mitovy amin’ny anarana tao amin’ny application ny anaran’ny
                Vondrona Madinika tsirairay
              </li>
              <li>
                Mijanona any amin’ny Vondrona madinika ilay fifanarahana
                orijinaly, fa ny solontenan’ny TERAKA kosa dia haka sary iay
                fifanarahana ka hampiditra azy ao amin’ny tranonkalan’ny TERAKA
              </li>
              <li>
                Alain’nyy solontena sary ihany koa ny Vondrona madinika rehetra
                miaraka amin’ilay fifanarahana voasonia.
              </li>
            </ul>
            <p>
              Ny Vondrona Madinika misy anao dia afaka miandrandra 60 taona na
              mihoatra amin’ny fambolena hazo sy ny mampiroborobo ny haitarika
              miaraka amin’ny TERAKA!
            </p>
            <div className="action-center">
              <button className="nav-btn" onClick={() => setNb(nb - 1)}>
                Hiverina
              </button>
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tohiny
              </button>
            </div>
          </div>
        )}
        {nb === 9 && (
          <div className="content">
            <h3>Famintinana</h3>
            <p>
              Misaotra anao nandray anjara tamin’ity fiofanana ity. Ny fiofanana
              manaraka dia ho itanao ny fandoavam-bola ataon’ ny TERAKA.
            </p>
            <div className="action-center">
              <Rating
                value={rating}
                onChange={(e, n) => {
                  user.formation["205"].rating = n;
                  updateDatabase();
                  setRating(n);
                }}
              />
            </div>
            <div className="action-center">
              <button className="nav-btn" onClick={() => valider(nb)}>
                Tapitra
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
}
