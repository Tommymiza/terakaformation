import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ActContext } from "../../../App";
import axios from "axios";
import "../../../styles/cours-content.scss";
import { Rating } from "@mui/material";
import { cours } from "../cours1";

export default function C203() {
  const { id, sid } = useParams();
  const navigate = useNavigate();
  const { user, server, setAlert, setPath } = useContext(ActContext);
  const [rating, setRating] = useState(user.formation["203"]?.rating || 0);
  const [nb, setNb] = useState(
    !isNaN((user.formation["203"]?.progress * 5) / 100) &&
      (user.formation["203"]?.progress * 5) / 100 !== 5
      ? (user.formation["203"]?.progress * 5) / 100
      : 0
  );
  function updateDatabase() {
    axios({
      method: "POST",
      url: server + "/updateformation",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessKey"),
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
      !user.formation["203"] ||
      user.formation["203"].progress < (nb + 1) * 20
    ) {
      var temp = Object.create(user.formation["203"] ?? { progress: 0 });
      temp.progress += 20;
      user.formation["203"] = temp;
      updateDatabase();
    }
    setNb(nb + 1);
  }
  useEffect(() => {
    if ((user.formation["203"]?.progress * 5) / 100 === 5) {
      setAlert({
        type: "success",
        message: "Efa vitanao ito lesona ito!",
      });
    }
    setPath(
      <>
        <Link to={"/cours"}>Mes cours</Link>
        <span>/</span>
        <Link to={`/cours/${id}`}>
          {id}. {cours[parseInt(id) - 1].titre}
        </Link>
        <span>/</span>
        <Link to={`/cours/${id}/${sid}`} className="active">
          {sid}. {cours[parseInt(id) - 1].liste[parseInt(sid) - 1].titre}
        </Link>
      </>
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (nb === 5) {
      setAlert({
        type: "success",
        message: "Arabaina, nahavita ny lesona!",
      });
      navigate("/cours");
    }
    // eslint-disable-next-line
  }, [nb]);

  return (
    <>
      {nb === 0 && (
        <div className="content">
          <p>
            Mankasitraka tamin’ny ezaka nataonao. Nianaranao teo ny
            mombamomban’ny zavatra ataon’ny TERAKA sy ny soatoaviny izay
            arahin’ny mpikambana ao aminy.
          </p>
          <p>
            Aorian’ity fiofanana ity ianao dia afaka hamaly ireto fanontaniana
            manaraka ireto:
          </p>
          <ul style={{ marginLeft: "20px" }}>
            <li>
              Inona no atao hoe karbona ary ahoana no ifandraisany amin'ny
              fiovan'ny toetr'andro?
            </li>
            <li>
              Inona no atao hoe tsingerin'ny karbônina ary ahoana no maha
              anisan'ny tsingerin'ny karbônina ny fambolen-kazo?
            </li>
            <li>
              Ahoana no ahafahan'ny hazo manampy amin'ny ady amin'ny fiovan'ny
              toetr'andro?
            </li>
            <li>
              Inona ny tsenan'ny karbaona ary ahoana no ifandraisany amin'ny
              fambolen-kazo?
            </li>
          </ul>
          <h3>Inona ny atao hoe karbaona ?</h3>
          <p>
            Eo amin'ny manodidina antsika ny karbôna, nefa tsy afaka mahita azy,
            na mikasika azy, na manandrana azy isika - inona moa izany?
          </p>
          <p>
            Ity takelaka manaraka ity dia manazava ny atao hoe karbaona sy ny
            maha-zava-dehibe izany amin'ny zava-manan’aina rehetra eto an-tany.
            Ho fantatrao koa hoe maninona no manimba tontolo iainanan ny
            fandoroana angovo natoraly ary manome vahana ny fiovaovan'ny
            toetr'andro. Ny fahatakarana io fifandraisana io dia zava-dehibe
            amin'ny fahatakarana ny Programa TERAKA sy ny antony
            maha-zava-dehibe ny fambolen-kazo amin'ny zavatra rehetra ataon'ny
            TERAKA.
          </p>
          <p>
            Ny karbaona no fototry ny zavamananaina rehetra. Manodidina antsika
            izy io ary ampahany amintsika:
          </p>
          <ul style={{ marginLeft: "20px" }}>
            <li>Ny hazo manaloka antsika dia vita amin'ny karbaona</li>
            <li>Ny biby ompiantsika dia vita amin'ny karbaona</li>
            <li>Ny legioma ambolentsika dia vita amin'ny karbaona</li>
            <li>Na izaho sy ianao aza dia vita amin'ny karbaona</li>
            <li>
              Ny solika ampiasaintsika isan'andro dia vita amin'ny karbaona koa:
              solika toy ny lasantsy, petrola, ary kitay fandrahoana sakafo
            </li>
          </ul>
          <p>
            Rehefa mandoro solika mifototra amin'ny karbaona isika, dia mamorona
            setroka mandoto ny rivotra iainana izany ary mamadika ny tafo
            fanitso ho mainty.
          </p>
          <p>
            Mamoaka gazy karbonika (CO2) eny amin'ny rivotra ihany koa ny
            fandoroana solika mifototra amin'ny karbaona. Rehefa miditra ao
            amin'ny atmosfera ny CO2, dia mangeja hafanana izany, ka mahatonga
            ny planeta ho mafana kokoa. Izany no mahatonga ny CO2 antsoina hoe
            entona mangeja hafanana ary manome vahana ny fiovaovan'ny
            toetr'andro ireo.
          </p>
          <p>
            Ny tsantsahan’ny TERAKA dia manala ireo CO2 ireo eny amin'ny
            atmosfera amin'ny alalan’ny fambolen-kazo, ka miady amin'ny
            fiovaovan'ny toetr'andro
          </p>
          <h3>Inona ny tsingerin’ny karbaona?</h3>
          <p>
            Ankehitriny rehefa azonao ny atao hoe karbaona sy ny maha
            zava-dehibe izany amin'ny zava-manan’aina rehetra eto an-tany, dia
            zava-dehibe ny mahatakatra ny tsingerin'ny karbaona.
          </p>
          <p>
            Hazavainay ny tsingerin'ny karbaona ary asehonay ny fomba
            anampian'ny Mpamboly TERAKA amin'ny fanatanterahana ny tsingerin'ny
            karbaona amin'ny alalan'ny fambolen-kazo.
          </p>
          <p>
            Ny karbaona dia hita eny rehetra eny amin'ny tany. Ny karbaona no
            mandrindra ny mari-pana ny tany, no fototry ny tondra-drano rehetra,
            ary loharanon-tsolika lehibe. Ny karbaona no fototry ny
            zava-manan’aina rehetra eto an-tany. Ny karbaona dia hita ao amin'ny
            atmosfera amin'ny endrika gazy karbonika na CO2. Tsy hitan’ny maso
            ny karbaona, na fatatra tsiro, na rem-pofona, fa manodidina antsika.
          </p>
          <p>
            Ny olombelona dia manampy CO2 fanampiny amin'ny atmosfera amin'ny
            alàlan'ny fitaterana, ny orinasa ary ny fanapahana ala. Miteraka
            fiovaovan'ny toetr'andro izany, ary hita eny amin'ny manodidina
            antsika ny vokatra.
          </p>
          <p>
            Ny hain-tany lavareny sy ny fiakaran’ny hafanana dia samy vokatry ny
            fiovaovan'ny toetr'andro. Saingy misy zavatra tsotra azontsika
            rehetra atao mba hiadiana amin'ny antony mahatonga ny fiovaovan'ny
            toetr'andro: Mamboly hazo: ny hazo dia mitroka ny CO2 avy amin'ny
            atmosfera rehefa mitombo izy ireo.
          </p>
          <h4>Izay no antsoina hoe tsingerin’ny karbaona</h4>
          <p>
            Ny tantsaha TERAKA dia manampy amin'ny famitana ny tsingerin'ny
            karbaona amin'ny allan’ny fambolen-kazo, izay miady amin'ny
            fiovaovan'ny toetr'andro.
          </p>
          <h3>Karbaona ary fiavaovan’ny toetr’andro</h3>
          <div className="action-center">
            <button className="nav-btn" onClick={() => valider(nb)}>
              Tohiny
            </button>
          </div>
        </div>
      )}
      {nb === 1 && (
        <div className="content">
          <h3>
            Ahoana ny fomba ahazahoan’ny TERAKA vola amin’ny kredit karbaona?{" "}
          </h3>
          <p>
            Mandray anjara amin'ny tsenan'ny karbaona maneran-tany ny tantsaha
            ao amin'ny Vondrona Madinika an’i TERAKA.. Ity fizarana ity dia
            manazava ny fomba nahazahoan’ny Mpamboly TERAKA vola avy amin'ny
            fandraharahana ao anatin’ny sehatry ny kredi karbaona.
          </p>
          <div className="content-part">
            <h5>
              TERAKA sy ny fandraharahana amin’ny sehatry ny kredi karbaona
            </h5>
            <p>
              Ny orinasam-bola karbônina dia ny fomba handraisan'ny iTERAKA vola
              amin'ny fampandehanana ny programa TERAKA
            </p>
          </div>
          <div className="image-center-column">
            <img
              src="/images/203_1.png"
              alt="203_1.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ny TERAKA Farmers dia manatevin-daharana vondrona kely miaraka
            amin'ny tanjona hanampiana ny tontolo iainana
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_2.png"
              alt="203_2.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ny Vondrona Madiniky ny TERAKA dia manao sonia fifanarahana amin'ny
            iTERAKA, ilay orinasa mitantana ny Programa TERAKA
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_3.png"
              alt="203_3.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Io fifanarahana io dia antsoina hoe Fifanarahana amin’ny Entona
            Mangeja Hafanana na Fifanarahana EMH
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_4.png"
              alt="203_4png"
              style={{ width: "30%", minWidth: "300px" }}
            />
          </div>
          <p>
            Eo ambanin'ny fifanarahana EMH, ny Vondrona Madinika dia manaiky
            hamboly hazo ary ny iTERAKA dia manaiky ny hizara 70% amin'ny
            tombom-barotry ny kredi karbaona
          </p>
          <p>
            Kojakojain’ny Vondrona Madinika ao amin’ny TERAKA ho velona tsara
            ireo hazo.
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_5.png"
              alt="203_5.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ho avy hanisa ny hazo sy handrefy ny fitomboan'ny hazo ny
            kilasiteran’ny TERAKA
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_6.png"
              alt="203_6.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Izany dia ahafahan'ny iTERAKA mikajy ny habetsahan'ny karbaona
            voaangon’ny hazo tamin'ny rivotra
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_7.png"
              alt="203_7.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ny iTERAKA dia manakarama mpanamarina mba hahazoana antoka fa marina
            io fandrefesana io
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_8.png"
              alt="203_8.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ny iTERAKA dia mamorona kredi karbaona avy amin'ny habetsahan'ny
            karbaona izay voaangon’ ireo hazon’ny TERAKA teny amin'ny rivotra
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_9.png"
              alt="203_9.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>Ny orinasa dia mividy ity kredi karbaona ity amin'ny iTERAKA</p>
          <div className="image-center-column">
            <img
              src="/images/203_10.png"
              alt="203_10.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>
            Ny iTERAKA dia mizara ny tombom-barotra amin'ny fivarotana ny kredi
            karbaona amin'ny tantsahan’ny TERAKA
          </p>
          <p>Izany dia antsoina hoe Fizarana tombony</p>
          <p>
            Dia izay sy izay no tombontsoa azon’ny Vondrona Madinika ao amin’ny
            TERAKA amin’ny alalan’ny fandraharahana ao amin’ny karbaona
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_11.png"
              alt="203_11.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
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
      {nb === 2 && (
        <div className="content">
          <p>
            Ny Mpambolin’ny TERAKA tsirairay dia afaka misehatra amin’nytsena
            karbaona raha mahafeno ny fepetra takiana.
          </p>
          <div className="content-part">
            <h5>Fandoavana mialoha ny karbônina</h5>
            <p>
              Tany am-piandohana dia ho kely loatra ny hazo TERAKA mba
              hamoronana crédit karbonika. Mandra-pahalehiben'ny hazo TERAKA dia
              hahazo fandoavana 0,02 dolara isaky ny hazo isan-taona ny Vondrona
              Madinika TERAKA mba hitazonana ilay hazo hitombo.
            </p>
          </div>
          <div className="content-part">
            <h5>FIzarana ny tombon’ny karbaona</h5>
            <p>
              Rehefa lehibe ny hazo ary mahafeno ny fepetra rehetra azo atao ny
              Vondrona Madinika, dia hahazo anjara tombony ny Vondrona Madinika
              an’i TERAKA. Ny fizaran’ny tombony dia noforonina rehefa mivarotra
              ny kredi karbaona amin'ny olona na orinasa hafa ny iTERAKA, ary ny
              iTERAKA dia mizara ny iTERAKA 70% amin’ny tombom-barotra azony
              amin’ny tantsahan’ny TERAKA.
            </p>
          </div>
          <div className="content-part">
            <h5>Famoronana kredi karbaona</h5>
            <p>
              Mba hamoronana ny kredi karbaona, ny Kilasiteran’ny TERAKA dia
              hanisa ny hazo isaky ny tanin-kazo, handrefy ny manodidina ny
              vatan-kazo, ary hanoratra ny karazan- kazo, ary ny hijery ny
              elanelan’ny hazo novolena. Ireo rehetra ireo dia ampidirina
              amin'ny tahirin-kevitr’I TERAKA avokoa. Ary ampiasain’ny iTERAKA
              ireo information rehetra ireo mba hamoronana ny kredi karbaona.
              Ity kredi karbaona ity dia amidy amin'ny olona na orinasa hafa te
              hanampy ny tontolo iainana.
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
          <h3>Ireo tombon-tsoan’ny TERAKA hafa</h3>
          <p>
            Ankoatra ny vola karbaona dia manana tombon-tsoa maro hafa ihany koa
            ireo tantsahan’ny TERAKA
          </p>
          <div className="image-center-column">
            <img
              src="/images/203_2.png"
              alt="203_2.png"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <p>Indreto ary ny sasany amin’ireo tombon-tsoa ireo:</p>
          <div className="content-part">
            <h5>Fatana fandrahoana tsara kalitao</h5>
            <div className="row-content">
              <ul>
                <li>
                  Mahazo fiofananan ireo tantsahan’ny TERAKA ary misitraka ny
                  fatana fandrahoana tsara kalitao{" "}
                </li>
                <li>
                  Ireo karazana fatana ireo dia tsy mila mampiasa kitay maro be
                  ary tena mandaitra.
                </li>
                <li>
                  Mety amin’ny fahasalamana ireo fatana ireo satria tsy
                  manetroka be
                </li>
              </ul>
              <img
                src="/images/203_12.jpg"
                alt="203_12"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="content-part">
            <h5>Fambolena maharitra</h5>
            <div className="row-content">
              <ul>
                <li>
                  Manampy ny mpamboly hahazo vokatra maro be ny fambolena
                  maharitra
                </li>
                <li>
                  Manampy amin’ny fahazahoana vokatra maro be izy io na dia
                  vitsy aza ny rotsak’orana
                </li>
                <li>
                  Mampiahatra ny fambolena maharitra ny mpamboly ny TERAKA:
                  mandavaka tany ary aveo fenoina kaompaosita misy zezi-pahitra
                  ilay lavaka mialohan’ny hambolena hazo
                </li>
              </ul>
              <img
                src="/images/203_13.jpg"
                alt="203_13"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="content-part">
            <h5>Fiofanana amin’ny fanaovana kompaosita zezi-pahitra</h5>
            <p>
              Mahazo fiofanana momban’ny fanaovana zezika kompaosita tokoa ireo
              mpambolin’ny TERAKA. Manampy ireo tantsaha amin’ny fahazahoana
              vokatra miavosa izany, ary manampy ny tontolo iainana, ary
              amin’izay ihany koa mba tsy mila mividy zezika.
            </p>
          </div>
          <div className="image-center-column">
            <img
              src="/images/203_14.jpg"
              alt="203_14"
              style={{ width: "50%", minWidth: "300px" }}
            />
          </div>
          <div className="content-part">
            <h5>Fahasalamana</h5>
            <p>
              Ny fahasalaman’ny tantsaha no voalohan-karena. Mahazo fiofanana
              amin’ny fikajiana ny fahasalamana ireo mpambolin’ny TERAKA,
              miofana ihany koa momban’ireo karazana olana ara-pahasalamana
              matetika sedrain’ny olona
            </p>
          </div>
          <div className="image-center-column">
            <img
              src="/images/203_15.png"
              alt="203_15"
              style={{ width: "20%", minWidth: "100px" }}
            />
          </div>
          <div className="content-part">
            <h5>Fampiroboroboana ny haitarika</h5>
            <p>
              Ireo tantsahan’ny teraka rehetra dia manana anjara ho mpitarika sy
              hisitraka fiofanana ho mpitarika avokoa.
            </p>
            <p>
              Mampihatra ny fifandimbiasan’ny fitarihina ireo tantsahan’ny
              TERAKA mba ahafahan’ny rehetra mampihatra ny haitarika.
            </p>
          </div>
          <div className="image-center-column">
            <img
              src="/images/203_16.jpg"
              alt="203_16"
              style={{ width: "50%", minWidth: "300px" }}
            />
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
      {nb === 4 && (
        <div className="content">
          <h3>Famintinanana</h3>
          <p>
            Miarahaba anao nahavita ity fiofanana ity! Aza misalasala mamerina
            manao ilay fiofananan rehefa misy tsy mazava aminao. Ny
            fandraharahana amin’ny sehatry ny karbaona dia zava-dehibe amin’ny
            fandaharan’asan’ny TERAKA ary tena satrinay sy tianay tokoa ny
            ahazahoanao azy tsara.
          </p>
          <p>
            Amin'ny fiofanana manaraka dia hianatra bebe kokoa momba ny rafitry
            ny TERAKA sy ny maha-zava-dehibe ny Vondrona Madinik’i TERAKA ianao.
          </p>
          <div className="action-center">
            <Rating
              value={rating}
              onChange={(e, n) => {
                user.formation["203"].rating = n;
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
  );
}
